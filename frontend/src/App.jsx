import React, { useState, useEffect } from 'react';

// Platform Core Data Models
const CATEGORIES = ['All', 'Teamwear', 'Private-Label', 'Premium Sportswear', 'Event Apparel'];

const TEMPLATE_BASES = [
  { id: 'football-kits', name: 'Custom Football Kits', category: 'Teamwear', basePrice: 18.50, moq: 15, desc: 'High-performance, breathable matching jerseys and shorts tailored for professional clubs and academies.' },
  { id: 'elite-hoodies', name: 'Premium Elite Hoodies', category: 'Private-Label', basePrice: 32.00, moq: 20, desc: 'Luxury heavyweight fleece hoodies designed for brand merchandise and elite athletic lifestyle wear.' },
  { id: 'training-tops', name: 'Performance Training Tops', category: 'Premium Sportswear', basePrice: 14.20, moq: 30, desc: 'Slim-fit technical panels engineered for intensive field drills and high-intensity gym training sessions.' },
  { id: 'event-apparel', name: 'Event / Supporter Merchandise', category: 'Event Apparel', basePrice: 8.50, moq: 100, desc: 'Cost-effective promotional tees, caps, and outerwear perfect for massive tournaments and fan bases.' }
];

const TEXTILES = [
  { id: 'standard-mesh', name: 'Standard Interlock Mesh', cost: 0.00, desc: 'Lightweight, moisture-wicking engineered polyester weave.' },
  { id: 'premium-poly', name: 'Premium Double-Knit Poly', cost: 2.50, desc: 'Heavyweight, highly durable structured athletic knit with anti-pill finishing.' },
  { id: 'organic-cotton', name: 'Organic Combed Cotton (400 GSM)', cost: 4.80, desc: 'Ultra-luxury heavyweight fleece designed specifically for premium streetwear lines.' }
];

const BRANDING_METHODS = [
  { id: 'sublimation', name: 'Full Dye Sublimation', cost: 1.20, setup: 'No Setup Fee' },
  { id: 'embroidery', name: 'High-Density Embroidery', cost: 2.00, setup: '+$25 Setup Matrix' },
  { id: 'screen-print', name: 'Industrial Screen Printing', cost: 0.80, setup: '+$15 Screen Matrix' }
];

const SEED_ORDERS = [
  { id: 'STX-9482', client: 'Brenus Paris', model: 'Premium Elite Hoodies', units: 45, status: 'In Production', progress: 68, cost: 1656.00 },
  { id: 'STX-9483', client: 'Apex Athletics', model: 'Custom Football Kits', units: 250, status: 'Material Procurement', progress: 25, cost: 4432.50 },
  { id: 'STX-9484', client: 'Vanguard FC', model: 'Performance Training Tops', units: 120, status: 'Quality Assurance', progress: 90, cost: 1620.00 }
];

export default function App() {
  // Navigation View Management (Restoring layout tabs from image_a3c5e1.png)
  const [activeTab, setActiveTab] = useState('catalog');

  // Configurator Selection States
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_BASES[0]);
  const [selectedTextile, setSelectedTextile] = useState(TEXTILES[0]);
  const [selectedBranding, setSelectedBranding] = useState(BRANDING_METHODS[0]);
  const [quantity, setQuantity] = useState(50);
  
  // Interaction Control States
  const [uploadedFile, setUploadedFile] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Persistent Storage Engine (Option 1)
  const [pipelineOrders, setPipelineOrders] = useState(() => {
    const saved = localStorage.getItem('sportex_red_pipeline');
    return saved ? JSON.parse(saved) : SEED_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('sportex_red_pipeline', JSON.stringify(pipelineOrders));
  }, [pipelineOrders]);

  // Dynamic Metrics Engine (Option 2)
  const activeOrdersCount = pipelineOrders.length;
  const simulatedFloorCapacity = Math.min(45 + (activeOrdersCount * 11.5), 98.5); 
  const baseInventoryWeight = 25000; 
  const consumedWeight = pipelineOrders.reduce((acc, curr) => acc + (curr.units * 0.45), 0);
  const currentMaterialReserves = Math.max(baseInventoryWeight - consumedWeight, 2450);

  // Financial Calculations Engine
  const baseCostPerUnit = selectedTemplate.basePrice + selectedTextile.cost + selectedBranding.cost;
  let scaleModifier = 1.0;
  let tierLabel = 'Standard Contract';
  if (quantity >= 500) {
    scaleModifier = 0.85; 
    tierLabel = 'Enterprise Volume Rate (-15%)';
  } else if (quantity >= 100) {
    scaleModifier = 0.90;
    tierLabel = 'Bulk Scale Multiplier (-10%)';
  }
  const finalUnitCost = Number((baseCostPerUnit * scaleModifier).toFixed(2));
  const totalInvoice = Number((finalUnitCost * quantity).toFixed(2));

  const filteredTemplates = activeCategory === 'All' 
    ? TEMPLATE_BASES 
    : TEMPLATE_BASES.filter(t => t.category === activeCategory);

  const handleConfigureTrigger = (template) => {
    setSelectedTemplate(template);
    if (quantity < template.moq) setQuantity(template.moq);
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0].name);
      showToast('Technical blueprint parsed successfully.');
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const executeOrderSubmission = (e) => {
    e.preventDefault();
    const newOrder = {
      id: `STX-${Math.floor(1000 + Math.random() * 9000)}`,
      client: 'Global B2B Account',
      model: selectedTemplate.name,
      units: quantity,
      status: 'Pending Engineering Review',
      progress: 12,
      cost: totalInvoice
    };
    setPipelineOrders([newOrder, ...pipelineOrders]);
    showToast('Proposal transmitted to Sialkot production lines.');
  };

  // PDF Generation Exporter Engine (Option 3)
  const handlePdfExport = () => {
    if (window.html2pdf) {
      const element = document.getElementById('printable-invoice-element');
      const options = {
        margin: 0.5,
        filename: `SPORTEX-QUOTE-${selectedTemplate.id.toUpperCase()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, backgroundColor: '#ffffff', useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };
      window.html2pdf().from(element).set(options).save();
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex overflow-hidden">
      
      {/* LEFT SIDEBAR NAVBAR (Restored Layout Shape from image_a3c5e1.png) */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between shrink-0 hidden lg:flex shadow-sm">
        <div>
          {/* Logo Branding Block Modified from Black White Minimalist Professional Initial Logo.png */}
          <div className="p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center space-x-3">
            <div className="h-9 w-9 bg-white rounded flex items-center justify-center font-serif text-lg font-bold shadow-sm select-none">
              <span className="text-red-500">S</span><span className="text-slate-950 -ml-0.5">X</span>
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight uppercase font-serif block text-white">Sportex Platform</span>
              <span className="text-[9px] text-red-500 font-mono tracking-widest uppercase block font-semibold">Industrial Operations</span>
            </div>
          </div>

          <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-[11px]">
            <div className="flex items-center space-x-2 text-slate-500">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse inline-block"></span>
              <span className="font-medium">System Node Active</span>
            </div>
            <span className="font-mono text-slate-400 font-bold">v6.4</span>
          </div>

          <nav className="p-4 space-y-1">
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeTab === 'catalog' ? 'bg-red-600 text-white shadow-sm shadow-red-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <span className="text-sm">📋</span> <span>B2B Catalog Configurator</span>
            </button>
            <button 
              onClick={() => setActiveTab('pipeline')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeTab === 'pipeline' ? 'bg-red-600 text-white shadow-sm shadow-red-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <span className="text-sm">⚙️</span> <span>Active Production Line</span>
              <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${activeTab === 'pipeline' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'}`}>
                {pipelineOrders.length}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('logistics')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${activeTab === 'logistics' ? 'bg-red-600 text-white shadow-sm shadow-red-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
            >
              <span className="text-sm">🌐</span> <span>Sialkot Logistics Hub</span>
            </button>
          </nav>
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 text-[10px] font-mono text-slate-400 text-center font-bold">TERMINAL CONSOLE SECURE</div>
      </aside>

      {/* MAIN DATA SCROLL CONTAINER PANEL */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-slate-50">
        
        {/* VIEW 1: CATALOG CONFIGURATOR & WORKSPACE */}
        {activeTab === 'catalog' && (
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-red-600 uppercase mb-0.5 font-mono">Industrial Apparel Engineering</p>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">Interactive Fabrication Workspace</h1>
            </div>

            {/* Main Template Selection Grid */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
                <div>
                  <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Commercial Template Catalog</h2>
                  <p className="text-slate-500 text-xs">Filter specifications for immediate quotation layout bindings.</p>
                </div>
                <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${activeCategory === cat ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredTemplates.map((item) => (
                  <div key={item.id} className={`border rounded-xl p-4 flex flex-col justify-between transition bg-white ${selectedTemplate.id === item.id ? 'border-red-500 ring-1 ring-red-500 bg-red-50/10' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div>
                      <div className="flex justify-between text-[10px] mb-2 font-mono text-slate-400 font-bold">
                        <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded uppercase tracking-wider">{item.category}</span>
                        <span>MOQ: {item.moq}pcs</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 mb-1 tracking-tight">{item.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-bold">Base Price</span>
                        <span className="text-base font-bold text-slate-900 font-mono">${item.basePrice.toFixed(2)}</span>
                      </div>
                      <button onClick={() => handleConfigureTrigger(item)} className={`text-xs font-bold px-3 py-1.5 rounded transition ${selectedTemplate.id === item.id ? 'bg-red-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                        {selectedTemplate.id === item.id ? 'Active' : 'Configure'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parameters Formulation Row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
              <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-sm">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="h-2 w-2 rounded-full bg-red-600"></span>
                  Engineering Inputs Specifications
                </h2>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">1. Raw Textile Matrix selection</label>
                  <div className="space-y-1.5">
                    {TEXTILES.map((tex) => (
                      <div key={tex.id} onClick={() => setSelectedTextile(tex)} className={`p-3 rounded-lg border cursor-pointer flex items-center justify-between transition text-xs ${selectedTextile.id === tex.id ? 'border-red-500 bg-red-50/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                        <div>
                          <p className="font-bold text-slate-900">{tex.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{tex.desc}</p>
                        </div>
                        <span className={`font-mono font-bold px-2 py-0.5 rounded ${tex.cost === 0 ? 'text-red-600 bg-red-50' : 'text-slate-600 bg-slate-100'}`}>
                          {tex.cost === 0 ? 'Standard Base' : `+$${tex.cost.toFixed(2)}/pc`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">2. Branding & Embellishment Technique</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {BRANDING_METHODS.map((bm) => (
                      <div key={bm.id} onClick={() => setSelectedBranding(bm)} className={`p-3 rounded-lg border cursor-pointer text-center transition flex flex-col justify-between text-xs ${selectedBranding.id === bm.id ? 'border-red-500 text-red-600 bg-red-50/5' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                        <div>
                          <p className="font-bold text-slate-900">{bm.name}</p>
                          <p className="text-[10px] font-mono text-slate-400 mt-0.5">(+${bm.cost.toFixed(2)}/pc)</p>
                        </div>
                        <span className="mt-2 block text-[9px] px-1 py-0.5 rounded bg-slate-50 text-slate-500 font-mono border border-slate-200/60">{bm.setup}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">3. Tech-Pack Blueprint Attachment</label>
                  <div className="border border-dashed border-slate-300 bg-slate-50 rounded-lg p-4 text-center hover:border-red-500 transition relative text-xs">
                    <input type="file" accept=".pdf,.png,.jpg,.ai,.zip" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <p className="text-slate-600 font-medium">{uploadedFile ? `📄 Active Blueprint Vector: ${uploadedFile}` : 'Drag & drop configuration artwork vector file or click to choose'}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-[11px] font-bold text-slate-500 tracking-wider uppercase font-mono">4. Bulk Batch Production Volume</label>
                    <span className="text-xs font-bold font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded">{quantity} Units Selected</span>
                  </div>
                  <input type="range" min={selectedTemplate.moq} max="1000" step="5" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="w-full h-1 bg-slate-200 roundedappearance-none cursor-pointer accent-red-600" />
                </div>
              </div>

              {/* STICKY PRICING INVOICE CALCULATION PANEL */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm sticky top-6">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono border-b border-slate-100 pb-2 text-center">Quotation Parameters</h3>
                
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Blueprint Base</span>
                    <span className="text-slate-900 font-bold truncate max-w-[150px]">{selectedTemplate.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Selected Fabric</span>
                    <span className="text-slate-900 font-bold truncate max-w-[150px]">{selectedTextile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Branding Style</span>
                    <span className="text-slate-900 font-bold">{selectedBranding.name}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-2">
                    <span className="text-slate-400">Discount Matrix</span>
                    <span className="text-slate-600 font-sans font-bold">{tierLabel}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 text-center space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200/60">
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-0.5">Calculated Net Per Unit</span>
                    <span className="text-2xl font-bold text-slate-900 font-mono">${finalUnitCost.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 font-mono mb-0.5">Estimated Run Invoice</span>
                    <span className="text-3xl font-black text-red-600 font-mono">${totalInvoice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    <button onClick={executeOrderSubmission} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg transition text-xs uppercase tracking-wider cursor-pointer shadow-sm">
                      Submit Design Proposal to Factory
                    </button>
                    <button onClick={handlePdfExport} className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-2 rounded-lg transition text-xs border border-slate-200 cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
                      <span>📥</span> Download Commercial PDF Quote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: ACTIVE PRODUCTION LINE TIMELINE GRID */}
        {activeTab === 'pipeline' && (
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-red-600 uppercase mb-0.5 font-mono">Live Factory Floor Operations</p>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">Active Production Pipeline</h1>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-5 border-b border-slate-100 bg-white flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Fabrication Queue Control Matrix</h3>
                  <p className="text-slate-500 text-xs">Persistent pipeline data arrays synchronized dynamically into local client workspace.</p>
                </div>
                <button onClick={() => { if(confirm("Flush pipeline records cache?")) setPipelineOrders(SEED_ORDERS); }} className="text-[10px] tracking-wide font-mono font-bold bg-red-50 text-red-600 px-2.5 py-1 rounded border border-red-200 transition cursor-pointer">
                  Reset System Queue
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 font-mono text-slate-400 font-bold uppercase tracking-wider">
                      <th className="p-4">Tracking Code</th>
                      <th className="p-4">Target Account</th>
                      <th className="p-4">Apparel Model Base</th>
                      <th className="p-4 text-center">Batch Size</th>
                      <th className="p-4">Fulfillment Phase State</th>
                      <th className="p-4 text-right">Invoice Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {pipelineOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-mono text-red-600 font-bold">{ord.id}</td>
                        <td className="p-4 text-slate-900 font-bold">{ord.client}</td>
                        <td className="p-4 text-slate-600">{ord.model}</td>
                        <td className="p-4 text-center font-mono text-slate-500">{ord.units} pcs</td>
                        <td className="p-4 min-w-[180px]">
                          <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-1 font-bold">
                            <span>{ord.status}</span>
                            <span>{ord.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${ord.progress}%` }}></div>
                          </div>
                        </td>
                        <td className="p-4 text-right font-mono font-bold text-slate-900">${Number(ord.cost).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: SIALKOT LOGISTICS HUB TELEMETRY OVERVIEW CARDS (Layout from image_a3c5e1.png) */}
        {activeTab === 'logistics' && (
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
            <div>
              <p className="text-[11px] font-bold tracking-widest text-red-600 uppercase mb-0.5 font-mono">Sialkot Hub Telemetry Control</p>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight font-serif">Industrial Logistics Operations</h1>
            </div>

            {/* Top Cards Row Structure Match from image_a3c5e1.png */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-sm">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Floor Assembly Capacity</span>
                <p className="text-2xl font-bold font-serif text-slate-900 font-mono">{simulatedFloorCapacity.toFixed(1)}% <span className="text-xs text-red-600 font-sans font-bold ml-1">Optimal Zone</span></p>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full transition-all duration-500" style={{ width: `${simulatedFloorCapacity}%` }}></div>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">{activeOrdersCount} of 15 operational knitting loops firing concurrently.</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-sm">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Global Shipping Transit Matrix</span>
                <p className="text-2xl font-bold font-serif text-slate-900">DHL / FedEx Express</p>
                <div className="h-1 flex items-center gap-1">
                  <div className="h-full bg-red-600 flex-1 rounded-full"></div>
                  <div className="h-full bg-red-600 flex-1 rounded-full"></div>
                  <div className="h-full bg-slate-200 flex-1 rounded-full"></div>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Sialkot Air Freight customs lines clearance pace: Nominal.</p>
              </div>

              <div className="bg-white border border-slate-200 p-5 rounded-xl space-y-2 shadow-sm">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Material Inventory Reserves</span>
                <p className="text-2xl font-bold font-serif text-slate-900 font-mono">{currentMaterialReserves.toLocaleString()} KG <span className="text-xs text-slate-500 font-sans font-bold ml-1">Secured</span></p>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-slate-900 h-full transition-all duration-500" style={{ width: `${(currentMaterialReserves / baseInventoryWeight) * 100}%` }}></div>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Heavy fleece and polyester mesh inventory fully loaded.</p>
              </div>
            </div>

            {/* Base Overview Box Panel Match from image_a3c5e1.png */}
            <div className="bg-white border border-slate-200 p-6 rounded-xl space-y-4 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2.5">Sialkot Manufacturing Facilities Overview</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Our in-house fabrication parameters are integrated natively into Sialkot industrial zones. 
                By controlling everything from structural yarn knitting pipelines to high-density vector embroidery arrays, 
                we ensure premium quality standards for global client accounts without sub-contractor delays.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                  <span className="block text-[9px] uppercase tracking-wider font-bold font-mono text-slate-400 mb-0.5">Quality Assurance Parameter</span>
                  <p className="text-xs font-bold text-slate-900 font-mono">100% In-Line Defect Auditing</p>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                  <span className="block text-[9px] uppercase tracking-wider font-bold font-mono text-slate-400 mb-0.5">Export Custom Routing Node</span>
                  <p className="text-xs font-bold text-slate-900 font-mono">Direct Air Freight Terminal Pipeline</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- HIDDEN CANVAS CANVAS NODE GENERATION FRAMEWORK --- */}
      <div className="hidden">
        <div id="printable-invoice-element" className="p-12 bg-white text-slate-800 font-mono space-y-6 max-w-[700px] text-xs border border-slate-300">
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <h1 className="text-xl font-bold font-serif text-slate-900 tracking-tight uppercase">SPORTEX MANUFACTURING CONTRACT</h1>
            <p className="text-slate-400 text-[10px] font-sans font-bold mt-1 tracking-wider">SIALKOT INDUSTRIAL STATE EXPORT GATEWAY PIPELINE INVOICING</p>
          </div>
          <div className="space-y-2 text-slate-700 font-medium">
            <p><span className="text-slate-400">TIMESTAMP LOG :</span> {new Date().toLocaleString()}</p>
            <p><span className="text-slate-400">BASE BLUEPRINT :</span> {selectedTemplate.name} ({selectedTemplate.category})</p>
            <p><span className="text-slate-400">FABRIC SPEC    :</span> {selectedTextile.name}</p>
            <p><span className="text-slate-400">BRANDING METHOD :</span> {selectedBranding.name}</p>
            <p><span className="text-slate-400">RUN VOLUME BATCH:</span> {quantity} Total Finished Units</p>
            <p><span className="text-slate-400">RATE SCALE CLASS:</span> {tierLabel}</p>
          </div>
          <div className="border-t border-b border-slate-200 py-4 text-center space-y-1.5 bg-slate-50 rounded">
            <p className="text-slate-600">FINAL SPECIFICATION UNIT RATE: <span className="text-slate-900 font-bold">${finalUnitCost.toFixed(2)} USD</span></p>
            <p className="text-base font-bold text-red-600">NET ESTIMATED INVOICE VALUATION: ${totalInvoice.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD</p>
          </div>
          <p className="text-[9px] text-slate-400 text-center font-sans">This commercial document template is legally generated from live corporate dashboard configurations.</p>
        </div>
      </div>

      {/* FIXED TOAST NOTIFICATION MESSAGE WINDOW CONTAINER */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white font-bold px-4 py-3 rounded-xl shadow-xl text-xs z-50 animate-in fade-in slide-in-from-bottom-3 duration-150 font-mono border border-slate-800 flex items-center gap-2">
          <span className="text-red-500 font-bold">✓</span> {toastMessage}
        </div>
      )}
    </div>
  );
}