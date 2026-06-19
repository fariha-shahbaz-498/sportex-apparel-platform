export const SPORTEX_PRODUCTS = [
  {
    id: "prod-1",
    name: "Custom Football Kits",
    category: "Teamwear",
    description: "High-performance, breathable matching jerseys and shorts tailored for professional clubs and academies.",
    basePricePerUnit: 18.50,
    minOrderQuantity: 15,
    features: ["Moisture-wicking fabric", "Sublimation printing included", "Interlock mesh panels"]
  },
  {
    id: "prod-2",
    name: "Premium Elite Hoodies",
    category: "Private-Label",
    description: "Luxury heavyweight fleece hoodies designed for brand merchandise and elite athletic lifestyle wear.",
    basePricePerUnit: 32.00,
    minOrderQuantity: 20,
    features: ["400 GSM Organic Cotton", "Custom inner neck tape", "Dropped shoulder athletic fit"]
  },
  {
    id: "prod-3",
    name: "Performance Training Tops",
    category: "Premium Sportswear",
    description: "Slim-fit technical panels engineered for intensive field drills and gym sessions.",
    basePricePerUnit: 14.20,
    minOrderQuantity: 30,
    features: ["4-way stretch material", "Flatlock anti-chafing seams", "Reflective safety branding"]
  },
  {
    id: "prod-4",
    name: "Event / Supporter Merchandise",
    category: "Event Apparel",
    description: "Cost-effective promotional tees, caps, and outerwear perfect for tournaments and fan bases.",
    basePricePerUnit: 8.50,
    minOrderQuantity: 100,
    features: ["100% Combed Cotton", "High-density screen printing", "Preshrunk durable build"]
  }
];

export const PRODUCTION_STAGES = [
  { step: 1, name: "Design & Tech Pack Approval", duration: "2-3 Days" },
  { step: 2, name: "Premium Material Sourcing", duration: "3-5 Days" },
  { step: 3, name: "Precision Printing & Sublimation", duration: "2-4 Days" },
  { step: 4, name: "Industrial Stitching & Assembly", duration: "5-7 Days" },
  { step: 5, name: "Rigorous Quality Control", duration: "1-2 Days" },
  { step: 6, name: "Global Logistics & Dispatch", duration: "Transit varies" }
];
export const FABRIC_OPTIONS = [
  { id: "fab-1", name: "Standard Interlock Mesh", priceModifier: 0.00, desc: "Lightweight, moisture-wicking engineered polyester." },
  { id: "fab-2", name: "Premium Double-Knit Poly", priceModifier: 2.50, desc: "Heavyweight, durable structured athletic knit." },
  { id: "fab-3", name: "Organic Combed Cotton (400 GSM)", priceModifier: 4.80, desc: "Luxury heavyweight fleece designed for premium streetwear." }
];

export const CUSTOMIZATION_TYPES = [
  { id: "cust-sub", name: "Full Dye Sublimation", priceModifier: 1.20 },
  { id: "cust-emb", name: "High-Density Embroidery", priceModifier: 2.00 },
  { id: "cust-scr", name: "Industrial Screen Printing", priceModifier: 0.80 }
];