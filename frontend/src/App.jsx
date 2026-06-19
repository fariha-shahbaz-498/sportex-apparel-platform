import React, { useState } from 'react';
import { SPORTEX_PRODUCTS, PRODUCTION_STAGES, FABRIC_OPTIONS, CUSTOMIZATION_TYPES } from './data/mockData';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Customizer State Engine
  const [configProduct, setConfigProduct] = useState(SPORTEX_PRODUCTS[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRIC_OPTIONS[0]);
  const [selectedCustomization, setSelectedCustomization] = useState(CUSTOMIZATION_TYPES[0]);
  const [orderQuantity, setOrderQuantity] = useState(50);

  const categories = ["All", "Teamwear", "Private-Label", "Premium Sportswear", "Event Apparel"];

  const filteredProducts = selectedCategory === "All" 
    ? SPORTEX_PRODUCTS 
    : SPORTEX_PRODUCTS.filter(p => p.category === selectedCategory);

  // Dynamic Price Engine Calculation
  const calculateUnitCost = () => {
    let base = configProduct.basePricePerUnit;
    base += selectedFabric.priceModifier;
    base += selectedCustomization.priceModifier;
    
    // B2B Bulk discount scaling factors
    if (orderQuantity >= 200) base *= 0.85; // 15% off bulk tiers
    else if (orderQuantity >= 100) base *= 0.92; // 8% off bulk tiers
    
    return base;
  };

  const unitCost = calculateUnitCost();
  const totalCost = unitCost * orderQuantity;

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans antialiased pb-24">
      
      {/* 1. GLOBAL NAVIGATION HEADER */}
      <nav className="border-b border-gray-800 bg-brand-dark/90 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl font-black tracking-tighter text-white">
              S<span className="text-brand-red">X</span>
            </span>
            <span className="text-sm font-bold tracking-widest uppercase text-gray-400 pl-2 border-l border-gray-800">
              Sportex
            </span>
          </div>
          <div className="hidden md:flex space-x-8 text-xs font-semibold uppercase tracking-wider text-gray-400">
            <a href="#catalog" className="hover:text-brand-red transition-colors">B2B Catalog</a>
            <a href="#customizer" className="hover:text-brand-red transition-colors">Quote Builder</a>
            <a href="#process" className="hover:text-brand-red transition-colors">Our Process</a>
          </div>
          <a href="#customizer" className="bg-brand-red hover:bg-red-700 text-white font-bold py-2 px-5 rounded text-xs uppercase tracking-wider transition-all">
            Build Active Quote
          </a>
        </div>
      </nav>

      {/* 2. HERO STATEMENT BANNER */}
      <header className="relative max-w-7xl mx-auto px-6 pt-20 pb-12 text-left">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-bold tracking-widest uppercase text-brand-red bg-brand-red/10 px-3 py-1.5 rounded-full">
            Industrial Apparel Manufacturing
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none text-white uppercase">
            Sportswear & Private Label <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">
              Production Systems.
            </span>
          </h1>
        </div>
      </header>

      {/* 3. INTERACTIVE B2B PRODUCT CATALOG SECTION */}
      <section id="catalog" className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">Commercial Catalog</h2>
            <p className="text-xs text-gray-500">Select business segment to filter specialized execution models.</p>
          </div>
          
          <div className="flex flex-wrap gap-2 bg-black/40 p-1.5 rounded-lg border border-gray-900">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === cat ? 'bg-brand-red text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-[#161616] border border-gray-900 rounded-xl p-6 flex flex-col justify-between hover:border-gray-700 transition-all group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black tracking-widest uppercase bg-gray-800 text-gray-300 px-2 py-1 rounded">
                    {product.category}
                  </span>
                  <p className="text-xs font-bold text-gray-500">MOQ: <span className="text-white">{product.minOrderQuantity}pcs</span></p>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-brand-red transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-gray-900/60 flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Est. Base Cost</p>
                  <p className="text-lg font-black text-white">${product.basePricePerUnit.toFixed(2)}</p>
                </div>
                <a 
                  href="#customizer"
                  onClick={() => {
                    setConfigProduct(product);
                    setOrderQuantity(product.minOrderQuantity);
                  }}
                  className="bg-white hover:bg-brand-red text-black hover:text-white font-bold py-2 px-4 rounded text-[11px] uppercase tracking-wider transition-all"
                >
                  Configure
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. HIGH-LEVEL CUSTOM CONFIGURATOR ENGINE WORKSPACE */}
      <section id="customizer" className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-900">
        <div className="mb-10">
          <h2 className="text-2xl font-black uppercase tracking-tight text-white">Interactive Production Configurator</h2>
          <p className="text-xs text-gray-500">Simulate industrial tech parameters to calculate bulk fabrication costs instantly.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* STEP CONTROLS PANEL */}
          <div className="lg:col-span-2 space-y-8 bg-[#161616] p-8 border border-gray-900 rounded-2xl">
            
            {/* Control Step 1: Base Target Selection */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-3">1. Select Target Template Base</label>
              <div className="grid sm:grid-cols-2 gap-3">
                {SPORTEX_PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setConfigProduct(p);
                      if (orderQuantity < p.minOrderQuantity) setOrderQuantity(p.minOrderQuantity);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      configProduct.id === p.id ? 'border-brand-red bg-brand-red/5' : 'border-gray-800 bg-black/20 hover:border-gray-700'
                    }`}
                  >
                    <p className="font-bold text-sm text-white">{p.name}</p>
                    <p className="text-[11px] text-gray-500 mt-1">Base Price: ${p.basePricePerUnit.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Control Step 2: Material Selection */}
            <div>
              <label className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-3">2. Choose Raw Textile Specification</label>
              <div className="space-y-2.5">
                {FABRIC_OPTIONS.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFabric(f)}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedFabric.id === f.id ? 'border-brand-red bg-brand-red/5' : 'border-gray-800 bg-black/20 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{f.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                    </div>
                    <span className="text-xs font-bold text-gray-400">
                      {f.priceModifier === 0 ? 'Standard' : `+$${f.priceModifier.toFixed(2)}/pc`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Control Step 3: Customization & Volume Sliders */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-400 block mb-3">3. Branding Style</label>
                <select
                  value={selectedCustomization.id}
                  onChange={(e) => setSelectedCustomization(CUSTOMIZATION_TYPES.find(c => c.id === e.target.value))}
                  className="w-full bg-black border border-gray-800 rounded-xl p-3.5 text-xs font-bold text-white tracking-wide uppercase focus:outline-none focus:border-brand-red"
                >
                  {CUSTOMIZATION_TYPES.map(c => (
                    <option key={c.id} value={c.id}>{c.name} (+${c.priceModifier.toFixed(2)})</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-black uppercase tracking-wider text-gray-400">4. Batch Order Volume</label>
                  <span className="text-xs font-black text-brand-red bg-brand-red/10 px-2.5 py-0.5 rounded">{orderQuantity} units</span>
                </div>
                <input
                  type="range"
                  min={configProduct.minOrderQuantity}
                  max="500"
                  step="5"
                  value={orderQuantity}
                  onChange={(e) => setOrderQuantity(Number(e.target.value))}
                  className="w-full accent-brand-red cursor-pointer bg-gray-800 h-1.5 rounded"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-bold mt-1.5 uppercase tracking-wider">
                  <span>Min ({configProduct.minOrderQuantity})</span>
                  <span>Scale Multipliers Apply at 100+ units</span>
                </div>
              </div>
            </div>

          </div>

          {/* DYNAMIC SUMMARIZED PRICING SIDEBAR CARD */}
          <div className="bg-black border border-gray-800 p-8 rounded-2xl flex flex-col justify-between space-y-6 sticky top-28 h-fit shadow-xl">
            <div className="space-y-6">
              <h3 className="text-lg font-black uppercase tracking-wider text-white border-b border-gray-900 pb-3">Quotation Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">Selected Model</span>
                  <span className="text-white font-bold">{configProduct.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">Textile Material</span>
                  <span className="text-white font-bold truncate max-w-[180px]">{selectedFabric.name}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400 font-medium">Application Method</span>
                  <span className="text-white font-bold">{selectedCustomization.name}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-gray-900 pb-4">
                  <span className="text-gray-400 font-medium">Total Quantity</span>
                  <span className="text-white font-bold">{orderQuantity} pcs</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Calculated Cost Per Unit</p>
                  {orderQuantity >= 100 && <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-black uppercase">Bulk Applied</span>}
                </div>
                <p className="text-3xl font-black text-white">${unitCost.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-900">
              <div className="flex justify-between items-baseline">
                <p className="text-xs font-black uppercase tracking-wider text-gray-400">Estimated Total Invoice</p>
                <p className="text-3xl font-black text-brand-red">${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
              <button 
                onClick={() => alert(`B2B Quote Request Recorded!\nItems: ${orderQuantity}x ${configProduct.name}\nEstimated Value: $${totalCost.toFixed(2)}\n\n(Next Step: Phase 2 Backend integration will save this configuration to your PostgreSQL database!)`)}
                className="w-full bg-brand-red hover:bg-red-700 text-white font-black py-4 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-brand-red/20 transition-all text-center"
              >
                Submit Design Proposal to Factory
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default App;