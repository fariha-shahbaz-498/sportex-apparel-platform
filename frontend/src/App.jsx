import React, { useState, useEffect } from 'react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  
  // Configurator Core State
  const [itemType, setItemType] = useState('hoodie');
  const [fabric, setFabric] = useState('supima'); 
  const [quantity, setQuantity] = useState(250);
  const [embroidery, setEmbroidery] = useState(true);
  const [invoice, setInvoice] = useState({ costPerItem: 0, totalProduction: 0, totalShipping: 0, grandTotal: 0 });
  
  // Loading state for server transmission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live Pricing Matrix
  useEffect(() => {
    let baseUnitCost = itemType === 'hoodie' ? 32.00 : itemType === 'tshirt' ? 18.50 : 14.20;
    if (fabric === 'supima') baseUnitCost += 4.80;
    if (embroidery) baseUnitCost += 2.00;
    
    let discount = quantity >= 500 ? 0.85 : quantity >= 100 ? 0.90 : 1.0;
    
    const costPerItem = Math.round((baseUnitCost * discount) * 100) / 100;
    const totalProduction = Math.round((costPerItem * quantity) * 100) / 100;
    const totalShipping = Math.round((150.00 + (quantity * 0.75)) * 100) / 100;
    const grandTotal = Math.round((totalProduction + totalShipping) * 100) / 100;

    setInvoice({ costPerItem, totalProduction, totalShipping, grandTotal });
  }, [itemType, fabric, quantity, embroidery]);

  // Handle sending the proposal data to PythonAnywhere
  const handleSecureProposal = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("https://sportex123.pythonanywhere.com/api/calculate-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemType: itemType,
          fabric: fabric,
          quantity: quantity,
          embroidery: embroidery
        }),
      });

      if (response.ok) {
        alert("✨ Success! Specification proposal logged in the Sialkot ops system and email dispatched.");
      } else {
        alert("Server responded with an issue. Please check configuration parameters.");
      }
    } catch (error) {
      console.error("API Transmission failed:", error);
      alert("Could not establish connection to the operations server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-amber-500 selection:text-white">
      
      {/* FLOATING STICKY BLUR NAVBAR WITH GOLD INSIGNIA */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FDFBF7]/80 border-b border-amber-900/10 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          {/* Logo Identity */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActivePage('home')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F1E36] to-[#1D3557] flex items-center justify-center font-serif text-xl font-bold text-[#D4AF37] shadow-md tracking-wider group-hover:rotate-3 transition-transform duration-300 border border-[#D4AF37]/30">
              S
            </div>
            <div>
              <span className="text-xl font-black tracking-widest text-[#0F1E36] block">SPORTEX</span>
              <div className="flex items-center space-x-1.5 -mt-0.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="text-[9px] text-[#D4AF37] uppercase tracking-widest font-black block">Sialkot Premium</span>
              </div>
            </div>
          </div>

          {/* Luxury Top Navigation */}
          <nav className="hidden md:flex items-center space-x-2 bg-[#0F1E36]/5 p-1.5 rounded-xl border border-amber-900/5">
            {[
              { id: 'home', label: 'Overview' },
              { id: 'configurator', label: 'B2B Studio' },
              { id: 'materials', label: 'The Fabric Matrix' },
              { id: 'portfolio', label: 'Live Shipments' },
              { id: 'contact', label: 'Secure Desk' }
            ].map((page) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
                  activePage === page.id 
                    ? 'bg-[#0F1E36] text-[#D4AF37] shadow-md' 
                    : 'text-slate-600 hover:text-[#0F1E36] hover:bg-amber-900/5'
                }`}
              >
                {page.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* CORE FRAME FOR VIEWS */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-6">
        
        {/* VIEW 1: PREMIUM HERO ENTRY */}
        {activePage === 'home' && (
          <div className="space-y-16 py-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0F1E36] border border-amber-900/10">
              <img 
                src="https://stitchcares.com/wp-content/uploads/2024/10/pic2.jpg" 
                alt="Sportex Production Infrastructure" 
                className="w-full h-[500px] object-cover opacity-45 grayscale contrast-125 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-[#0F1E36]/40 to-transparent flex flex-col justify-end p-8 md:p-14 space-y-6">
                <div className="flex items-center space-x-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 rounded-full w-max">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FDFBF7]">Custom Milling Active</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-[#FDFBF7] max-w-3xl leading-none">
                  Where high-end fashion lines find premium execution.
                </h2>
                <p className="text-slate-300 text-sm max-w-xl font-medium leading-relaxed">
                  Headquartered in Sialkot, Pakistan. We assemble bespoke, heavyweight custom cut apparel lines for elite European and North American fashion houses.
                </p>
                <div className="flex items-center space-x-4 pt-2">
                  <button 
                    onClick={() => setActivePage('configurator')}
                    className="bg-[#D4AF37] text-[#0F1E36] px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FDFBF7] hover:text-[#0F1E36] transition-all duration-300 shadow-xl shadow-amber-500/10"
                  >
                    Enter B2B Studio
                  </button>
                  <div className="text-xs text-slate-400 font-bold tracking-wider hidden sm:block">
                    Current Plant Efficiency: <span className="text-emerald-400">98.4%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Sculpted 3D Tooling', desc: 'High-density structured graphics using custom polymer overlays to deliver heavy, physical branding details.' },
                { title: 'Authentic Supima Staple', desc: 'Sourced long-staple organic cotton threads offering extreme wear resilience and silk-like internal luxury.' },
                { title: 'Streamlined Freight Gates', desc: 'Secure custom shipping pipelines configured straight to Western warehouses with duty structures pre-cleared.' }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-amber-900/5 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 space-y-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#0F1E36]/5 text-[#0F1E36] font-serif font-bold flex items-center justify-center border border-[#0F1E36]/10 group-hover:bg-[#0F1E36] group-hover:text-[#D4AF37] transition-all">
                    I{i+1}
                  </div>
                  <h3 className="text-lg font-bold text-[#0F1E36]">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: DYNAMIC B2B CONFIGURATOR */}
        {activePage === 'configurator' && (
          <div className="py-4 animate-fadeIn">
            <div className="w-full bg-white border border-amber-900/10 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
              
              {/* Controls Form */}
              <div className="p-8 md:col-span-7 space-y-8">
                <div>
                  <h1 className="text-2xl font-serif font-bold text-[#0F1E36]">B2B Configuration Desk</h1>
                  <p className="text-xs text-slate-500 mt-1 font-medium">Fine-tune mechanical garment properties to run accurate bulk valuations.</p>
                </div>
                
                <hr className="border-slate-100" />
                
                {/* Silhouette Spec */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] block">01. Silhouette Profile</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['hoodie', 'tshirt', 'garment'].map((type) => (
                      <button 
                        key={type} 
                        type="button" 
                        onClick={() => setItemType(type)} 
                        className={`p-5 rounded-xl border text-left transition-all ${
                          itemType === type 
                            ? 'border-[#0F1E36] bg-[#0F1E36] text-[#D4AF37] shadow-lg scale-[1.02]' 
                            : 'border-slate-200 bg-[#FDFBF7] text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs uppercase tracking-wider font-bold block">{type === 'garment' ? 'Custom Cut' : `Premium ${type}`}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric Spec */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] block">02. Textile Thread Core</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['standard', 'supima'].map((fib) => (
                      <button 
                        key={fib} 
                        type="button" 
                        onClick={() => setFabric(fib)} 
                        className={`p-5 rounded-xl border text-left transition-all ${
                          fabric === fib 
                            ? 'border-[#0F1E36] bg-[#0F1E36] text-[#D4AF37] shadow-lg scale-[1.01]' 
                            : 'border-slate-200 bg-[#FDFBF7] text-slate-600 hover:border-slate-300'
                        }`}
                      >
                        <span className="text-xs uppercase tracking-wider font-bold block">{fib} Raw Cotton Knit</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Allocation */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
                    <label>03. Batch Volume Multiplier</label>
                    <span className="text-[#0F1E36] font-mono font-bold text-sm bg-[#0F1E36]/5 px-2.5 py-0.5 rounded-md">{quantity} Pieces</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="1000" 
                    step="25" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))} 
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0F1E36]" 
                  />
                </div>

                {/* Embroidery Check */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] block">04. Finish Detailing</label>
                  <label className="flex items-center space-x-4 p-5 bg-[#FDFBF7] rounded-xl border border-slate-200 cursor-pointer select-none hover:bg-slate-100/50 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={embroidery} 
                      onChange={(e) => setEmbroidery(e.target.checked)} 
                      className="w-5 h-5 text-[#0F1E36] bg-white border-slate-300 rounded focus:ring-0 accent-[#0F1E36]" 
                    />
                    <div>
                      <span className="text-xs text-[#0F1E36] font-black block">Apply Sculpted 3D Tooling Insignia (+ $2.00/unit)</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">Adds heavy embossed brand graphics.</span>
                    </div>
                  </label>
                </div>

                {/* CONNECTED INTERACTIVE ACTION BUTTON */}
                <button 
                  type="button" 
                  onClick={handleSecureProposal}
                  disabled={isSubmitting}
                  className="w-full bg-[#0F1E36] text-[#D4AF37] font-black text-xs uppercase tracking-widest py-4 px-4 rounded-xl transition-all shadow-xl shadow-amber-950/20 hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Transmitting to Sialkot Hub..." : "Secure Spec Proposal"}
                </button>
              </div>

              {/* Financial Ledger Block */}
              <div className="p-8 md:col-span-5 bg-[#0F1E36] text-white flex flex-col justify-between space-y-8 relative">
                <div className="space-y-6">
                  <h2 className="text-xs font-black uppercase tracking-widest text-[#D4AF37]">Live Financial Log</h2>
                  <div className="space-y-4 text-xs font-medium text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-3"><span>Unit Net Cost</span><span className="font-mono text-[#D4AF37] font-bold">${invoice.costPerItem.toFixed(2)}</span></div>
                    <div className="flex justify-between border-b border-slate-800 pb-3"><span>Base Batch Total</span><span className="font-mono text-white">${invoice.totalProduction.toFixed(2)}</span></div>
                    <div className="flex justify-between border-b border-slate-800 pb-3"><span>Logistics & Carriage</span><span className="font-mono text-white">${invoice.totalShipping.toFixed(2)}</span></div>
                  </div>
                </div>

                {/* Technical Blueprint Component */}
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/20 p-2">
                  <img 
                    src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRlkvZOyr8q9UkD_5LIPk1lBjbzwgkSNX8WlMIpxnRjBywrM3yNXngVNkX1GXLIzLMnqaPLWfmZVpHZIwA" 
                    alt="Streetwear Blueprint Specifications" 
                    className="w-full h-32 object-contain filter invert opacity-80"
                  />
                  <span className="text-[9px] uppercase tracking-widest text-center block text-slate-400 font-mono mt-1">B2B Studio Active Template Pattern</span>
                </div>
                
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                  <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest block">Gross Valuation Target</span>
                  <div className="text-4xl font-black text-white font-mono mt-1 tracking-tight">
                    ${invoice.grandTotal.toLocaleString()} 
                    <span className="text-sm font-normal text-[#D4AF37] ml-2">USD</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 3: FABRIC MATRIX */}
        {activePage === 'materials' && (
          <div className="py-4 space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0F1E36]">Bespoke Fabric Library & Services</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">Certified raw textile options milled on site under rigorous quality parameters.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* French Terry */}
              <div className="bg-white border border-amber-900/5 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
                <div className="h-56 w-full bg-slate-100 overflow-hidden relative">
                  <img 
                    src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcS-XrW5QHqhcu_11dp-AxVQhwfYHOvB3nUZYgBqIYQJYj3chRWdirlqKQ217b15UqMuGzW4CFsWL2J3VRQ" 
                    alt="360GSM Loopback French Terry Texture View" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#0F1E36] text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Heavyweight Structure
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-lg font-bold text-[#0F1E36]">360GSM Premium Loopback French Terry</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Optimized specifically for structured heavy hoodies and luxury sweats. Thick knit layout lines that exhibit immense architectural stability during high-temperature garment-dyeing operations.
                  </p>
                  <div className="text-[11px] font-mono text-slate-600 bg-[#FDFBF7] p-3 rounded-xl border border-amber-900/5">
                    Structure Matrix: 100% Combed Clean Cotton Thread / Heavy Loop Cross We Weave
                  </div>
                </div>
              </div>

              {/* Supima Jersey */}
              <div className="bg-white border border-amber-900/5 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
                <div className="h-56 w-full bg-slate-100 overflow-hidden relative">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS0b_NALyQkR-1CCYFjytmU6VIKBcXrm0wLY-rA0psTF0nfdrdhzI9CydJhZO76NvznM5ZtFGFq7ER18Lw" 
                    alt="Premium Drape Organic Supima Cotton Knit Texture View" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#D4AF37] text-[#0F1E36] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                    Luxury Silk Touch
                  </div>
                </div>
                <div className="p-8 space-y-4">
                  <h3 className="text-lg font-bold text-[#0F1E36]">240GSM Extra-Long Staple Supima Jersey</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    Chosen strictly for luxury capsule drops and high-end graphic tees. Offers incredible clean drape character, rich natural color luster retention, and an ultra-smooth skin profile.
                  </p>
                  <div className="text-[11px] font-mono text-slate-600 bg-[#FDFBF7] p-3 rounded-xl border border-amber-900/5">
                    Structure Matrix: 95% Certified Organic Supima Cotton / 5% Lycra Component
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 4: LIVE FREIGHT BATCHES */}
        {activePage === 'portfolio' && (
          <div className="py-4 space-y-6 animate-fadeIn">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#0F1E36]">Global Freight Lines</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">B2B production arrays currently cleared and dispatched through our Sialkot port systems.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Paris Luxury Drop Build', volume: '500 Pcs', weave: '360GSM Structural Hoodies' },
                { label: 'Antwerp Heavy Capsule Set', volume: '1,200 Pcs', weave: 'Supima Dropped-Shoulder Tees' },
                { label: 'Nordic Technical Range Run', volume: '850 Pcs', weave: 'Interlock Tracksuit Elements' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-amber-900/5 p-6 rounded-2xl shadow-sm flex flex-col justify-between h-44 hover:border-amber-400/50 transition-colors">
                  <div>
                    <span className="text-[10px] font-black font-mono text-[#D4AF37] bg-[#0F1E36] px-2.5 py-1 rounded-md">{item.volume}</span>
                    <h3 className="text-base font-bold text-[#0F1E36] mt-4">{item.label}</h3>
                  </div>
                  <div className="text-xs text-slate-400 font-bold tracking-wide border-t border-slate-100 pt-3">{item.weave}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 5: INQUIRIES DESK */}
        {activePage === 'contact' && (
          <div className="py-8 max-w-4xl mx-auto text-center space-y-8 animate-fadeIn">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-[#0F1E36]">Establish a Contract Account</h2>
              <p className="text-xs text-slate-500 font-medium max-w-md mx-auto">Connect securely with our logistics team to register design guidelines or process rapid physical samples.</p>
            </div>
            
            <div className="bg-white border border-amber-900/10 p-8 md:p-12 rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-[#0F1E36] border border-[#D4AF37]/20 rounded-2xl p-6 flex flex-col justify-between items-center space-y-4 shadow-md">
                <span className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest block">Direct Secure Mail</span>
                <a href="mailto:sportexsialkot@gmail.com" className="font-mono text-lg font-bold text-white hover:text-[#D4AF37] transition-colors break-all">
                  sportexsialkot@gmail.com
                </a>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Response target: 12-24 Hours</span>
              </div>

              <div className="bg-[#0F1E36] border border-[#D4AF37]/20 rounded-2xl p-6 flex flex-col justify-between items-center space-y-4 shadow-md">
                <span className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest block">Direct Commercial Desk</span>
                <a href="tel:+923314234849" className="font-mono text-xl font-bold text-white hover:text-[#D4AF37] transition-colors">
                  +92 331 4234849
                </a>
                <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  <span>WhatsApp Secure Encrypted</span>
                </span>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* LUXURY EMBOSSED FOOTER */}
      <footer className="bg-white border-t border-amber-900/10 py-10 px-6 mt-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-bold">
          <div className="text-slate-400 font-medium font-serif order-2 md:order-1">
            © 2026 Sportex Sialkot Premium Inc. All Rights Reserved.
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 order-1 md:order-2 w-full md:w-auto">
            <div className="flex items-center space-x-2.5 bg-[#0F1E36]/5 border border-amber-900/5 px-4 py-2.5 rounded-xl shadow-inner w-full sm:w-auto justify-center">
              <span className="text-slate-400 uppercase tracking-widest text-[9px]">Mail:</span>
              <a href="mailto:sportexsialkot@gmail.com" className="font-mono font-bold text-[#0F1E36] hover:text-amber-600 transition-colors text-xs">
                sportexsialkot@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-2.5 bg-[#0F1E36]/5 border border-amber-900/5 px-4 py-2.5 rounded-xl shadow-inner w-full sm:w-auto justify-center">
              <span className="text-slate-400 uppercase tracking-widest text-[9px]">Hotline:</span>
              <a href="tel:+923314234849" className="font-mono font-bold text-[#0F1E36] hover:text-amber-600 transition-colors text-xs">
                +92 331 4234849
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}