from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import threading
import os
from dotenv import load_dotenv

# Load secure environment variables from the .env file
load_dotenv()

app = Flask(__name__)

# Allow your frontend workspace to connect securely
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Read secure credentials from your .env file automatically
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD")
RECEIVER_EMAIL = "farihashahbaz498@gmail.com"  # The inbox where you read incoming client messages

def send_email_alert(item_type, fabric, quantity, embroidery, grand_total):
    if not SENDER_EMAIL or not SENDER_PASSWORD:
        print("❌ SYSTEM ALERT: Email credentials missing from environment variables (.env).")
        return

    try:
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f"🚨 NEW B2B PROPOSAL RECEIVED: {item_type.upper()}"

        body = f"""
        Hello Sportex Production Team,

        A customer has just submitted a live fabrication design proposal from the B2B Catalog Configurator workspace.

        📦 CONFIGURATION PACKET DETAILS:
        ──────────────────────────────────────────────────
        👕 Apparel Model Base : {item_type.upper()}
        🧵 Raw Textile Fabric : {fabric.upper()}
        🎚️ Bulk Order Volume  : {quantity} Units
        🪡 Embroidery Option  : {'Yes' if embroidery else 'No'}
        ──────────────────────────────────────────────────
        💰 Estimated Invoice  : ${grand_total:,.2f} USD

        Verification Action Required: Please review this configuration against raw material stock layers in your Sialkot logistics hub warehouse.

        Best Regards,
        Sportex Automated Operations Terminal Node
        """
        
        msg.attach(MIMEText(body, 'plain'))

        # Open connection to Gmail secure SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        server.sendmail(SENDER_EMAIL, RECEIVER_EMAIL, msg.as_string())
        server.quit()
        print("📨 SUCCESS: Production proposal notification dispatched to verification inbox.")
    except Exception as e:
        print(f"❌ SYSTEM ALERT: SMTP Email dispatch failed: {e}")

# Database Initialization
def init_db():
    conn = sqlite3.connect('proposals.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS proposals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_type TEXT,
            fabric TEXT,
            quantity INTEGER,
            embroidery BOOLEAN,
            grand_total REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/api/calculate-quote', methods=['POST'])
def calculate_quote():
    data = request.get_json()
    
    item_type = data.get('itemType', 'garment')
    fabric = data.get('fabric', 'standard')
    quantity = int(data.get('quantity', 50))
    embroidery = data.get('embroidery', False)
    
    # ─── PRICING MATRIX LOGIC ───
    if item_type == 'hoodie':
        base_unit_cost = 32.00
    elif item_type == 'tshirt':
        base_unit_cost = 18.50
    else:
        base_unit_cost = 14.20
        
    if fabric == 'supima':
        base_unit_cost += 4.80
    if embroidery:
        base_unit_cost += 2.00
        
    # Volume Tier Discounts
    discount = 1.0
    if quantity >= 500:
        discount = 0.85
    elif quantity >= 100:
        discount = 0.90
        
    cost_per_item = round(base_unit_cost * discount, 2)
    total_production = round(cost_per_item * quantity, 2)
    total_shipping = round(150.00 + (quantity * 0.75), 2)
    grand_total = round(total_production + total_shipping, 2)
    
    # Save a permanent record to the local SQLite database
    try:
        conn = sqlite3.connect('proposals.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO proposals (item_type, fabric, quantity, embroidery, grand_total)
            VALUES (?, ?, ?, ?, ?)
        ''', (item_type, fabric, quantity, embroidery, grand_total))
        conn.commit()
        conn.close()
        
        # Fire background thread for email processing
        email_worker = threading.Thread(
            target=send_email_alert, 
            args=(item_type, fabric, quantity, embroidery, grand_total)
        )
        email_worker.start()
        
    except Exception as e:
        print(f"❌ Database transaction error: {e}")

    # Return calculation payload directly to React frontend
    return jsonify({
        "costPerItem": cost_per_item,
        "totalProduction": total_production,
        "totalShipping": total_shipping,
        "grandTotal": grand_total
    })

if __name__ == '__main__':
    # Dynamically bind ports for smooth cloud infrastructure transitions later
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)