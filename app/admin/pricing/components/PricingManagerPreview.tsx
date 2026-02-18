"use client";

import React, { useState } from 'react';
import { Save, BarChart3, Settings, History, ExternalLink, Edit3, Package, Layers, Briefcase, Plus, Trash2, Check, X, CreditCard, TrendingUp, Users, DollarSign, ArrowUpRight } from 'lucide-react';
import { useBizPro } from '@/app/context/BizProContext';

interface Offer {
    id: string;
    title: string;
    subtitle: string;
    price: number;
    label: string;
    link: string;
    active: boolean;
    bestValue?: boolean;
    features: string[];
    iconName: 'layers' | 'package' | 'briefcase';
}

export default function PricingManagerPreview() {
    const { language } = useBizPro();
    const [activeTab, setActiveTab] = useState<'config' | 'metrics' | 'audit'>('config');

    // --- State: Offers with Features ---
    const [offers, setOffers] = useState<Offer[]>([
        {
            id: 'step',
            title: 'Paso a Paso',
            subtitle: 'Paga a tu ritmo',
            price: 79,
            label: '/paso',
            link: 'https://buy.stripe.com/step_link',
            active: true,
            features: ["Acceso secuencial", "Pagas a tu ritmo", "Sin contratos"],
            iconName: 'layers'
        },
        {
            id: 'startup',
            title: 'Startup Pack',
            subtitle: 'Todo lo esencial',
            price: 299,
            label: '/único',
            link: 'https://buy.stripe.com/startup_link',
            active: true,
            bestValue: true,
            features: ["Identidad Corporativa", "Documentos Legales", "Prioridad en Soporte", "Ahorras $108"],
            iconName: 'package'
        },
        {
            id: 'business',
            title: 'Business Ready',
            subtitle: 'Llave en mano',
            price: 899,
            label: '/único',
            link: 'https://buy.stripe.com/business_link',
            active: true,
            features: ["Todos los 6 pasos", "Asesoría 1-1", "Gestión Bancaria", "Trámites Fiscales"],
            iconName: 'briefcase'
        }
    ]);

    const [paywallCopy, setPaywallCopy] = useState("Inversión Transparente. Sin costos ocultos.");

    // --- Modal State ---
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // --- Handlers ---
    const handleAddOffer = () => {
        const newOffer: Offer = {
            id: `offer_${Date.now()}`,
            title: 'New Plan',
            subtitle: 'Description',
            price: 0,
            label: '/one-time',
            link: '',
            active: false,
            features: ["Feature 1", "Feature 2"],
            iconName: 'package'
        };
        setOffers([...offers, newOffer]);
        setEditingOffer(newOffer);
        setIsEditModalOpen(true);
    };

    const handleDeleteOffer = (id: string) => {
        if (confirm("Are you sure you want to delete this offer?")) {
            setOffers(offers.filter(offer => offer.id !== id));
        }
    };

    const openEditModal = (offer: Offer) => {
        setEditingOffer({ ...offer });
        setIsEditModalOpen(true);
    };

    const saveEditedOffer = () => {
        if (!editingOffer) return;
        setOffers(offers.map(o => o.id === editingOffer.id ? editingOffer : o));
        setIsEditModalOpen(false);
        setEditingOffer(null);
    };

    const updateEditingFeature = (index: number, value: string) => {
        if (!editingOffer) return;
        const newFeatures = [...editingOffer.features];
        newFeatures[index] = value;
        setEditingOffer({ ...editingOffer, features: newFeatures });
    };

    const addFeatureToEditing = () => {
        if (!editingOffer) return;
        setEditingOffer({ ...editingOffer, features: [...editingOffer.features, "New Feature"] });
    };

    const removeFeatureFromEditing = (index: number) => {
        if (!editingOffer) return;
        const newFeatures = editingOffer.features.filter((_, i) => i !== index);
        setEditingOffer({ ...editingOffer, features: newFeatures });
    };

    const getIcon = (name: string) => {
        switch (name) {
            case 'layers': return <Layers className="text-blue-600" size={24} />;
            case 'briefcase': return <Briefcase className="text-slate-600" size={24} />;
            default: return <Package className="text-purple-600" size={24} />;
        }
    }


    return (
        <div className="p-8 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Offer Management</h1>
                        <p className="text-slate-500">Control the 3 main offers displayed on the public website.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 flex items-center gap-2">
                            <ExternalLink size={14} /> View Live Page
                        </button>
                        <button className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800 shadow-sm">
                            <Save size={16} /> Save Changes
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm w-fit mb-8">
                    <button
                        onClick={() => setActiveTab('config')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'config' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <Settings size={18} /> Offer Configuration
                    </button>
                    <button
                        onClick={() => setActiveTab('metrics')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'metrics' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <BarChart3 size={18} /> Sales Analytics
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'audit' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <History size={18} /> Audit Log
                    </button>
                </div>

                {/* --- TAB 1: OFFER CONFIGURATION --- */}
                {activeTab === 'config' && (
                    <div className="space-y-8 animate-in fade-in duration-300">
                        {/* Headline */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-center">
                            <h3 className="text-sm font-bold text-slate-400 mb-2 uppercase">Page Headline</h3>
                            <input
                                className="w-full text-2xl font-bold text-center border-b border-transparent hover:border-slate-200 focus:border-blue-500 outline-none p-2 text-slate-800 transition-colors"
                                value={paywallCopy}
                                onChange={(e) => setPaywallCopy(e.target.value)}
                            />
                        </div>

                        {/* Cards Grid */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {offers.map((offer) => (
                                <div key={offer.id} className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden relative transition-all group ${offer.bestValue ? 'border-purple-500 ring-4 ring-purple-500/10' : 'border-slate-200'}`}>
                                    {offer.bestValue && (
                                        <div className="bg-purple-500 text-white text-xs font-bold text-center py-1 uppercase tracking-wider absolute top-0 left-0 right-0">
                                            Recomendado
                                        </div>
                                    )}
                                    <div className="absolute top-8 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button onClick={() => openEditModal(offer)} className="p-2 bg-white text-blue-600 border border-slate-200 rounded-lg shadow-sm hover:bg-blue-50 transition-colors"><Edit3 size={16} /></button>
                                        <button onClick={() => handleDeleteOffer(offer.id)} className="p-2 bg-white text-red-400 border border-slate-200 rounded-lg shadow-sm hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                    <div className={`p-6 space-y-4 ${offer.bestValue ? 'pt-10' : ''}`}>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-slate-50 rounded-lg">{getIcon(offer.iconName)}</div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg leading-tight">{offer.title}</h3>
                                                <p className="text-xs text-slate-400 font-medium uppercase">{offer.subtitle}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-end gap-1 border-b border-slate-100 pb-4">
                                            <span className="text-3xl font-bold text-slate-800 mb-1">$</span>
                                            <span className="text-4xl font-extrabold text-slate-900">{offer.price}</span>
                                            <span className="text-sm text-slate-400 font-semibold mb-2">{offer.label}</span>
                                        </div>
                                        <ul className="space-y-2 pt-2">
                                            {offer.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 p-2 rounded truncate">
                                                <CreditCard size={12} />
                                                <span className="truncate">{offer.link || "No Stripe Link Set"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button onClick={handleAddOffer} className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all min-h-[300px]">
                                <Plus size={48} className="mb-4 opacity-50" />
                                <span className="font-bold text-lg">Add New Plan</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* --- TAB 2: METRICS DASHBOARD (Updated with Realistic Data) --- */}
                {activeTab === 'metrics' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        {/* KPI Cards */}
                        <div className="grid md:grid-cols-4 gap-6">
                            <KpiCard title="Total Revenue (MTD)" value="$12,450" change="+18%" positive icon={<DollarSign size={20} className="text-green-600" />} />
                            <KpiCard title="Active Subscribers" value="85" change="+5" positive icon={<Users size={20} className="text-blue-600" />} />
                            <KpiCard title="Avg. Order Value" value="$146" change="-2%" positive={false} icon={<BarChart3 size={20} className="text-purple-600" />} />
                            <KpiCard title="Conversion Rate" value="3.2%" change="+0.5%" positive icon={<TrendingUp size={20} className="text-amber-600" />} />
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 h-96">
                            {/* Sales Mock Chart */}
                            <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                                <h4 className="font-bold text-slate-800 mb-6">Revenue Trend (Last 30 Days)</h4>
                                <div className="flex-1 flex items-end justify-between px-4 gap-2">
                                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                                        <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group h-full flex items-end transition-all hover:bg-blue-100">
                                            <div style={{ height: `${h}%` }} className="w-full bg-blue-600 rounded-t-sm opacity-90 group-hover:opacity-100 transition-all"></div>
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-bold">
                                                ${h * 120}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-xs text-slate-400 mt-4 px-2">
                                    <span>Feb 1</span>
                                    <span>Feb 8</span>
                                    <span>Feb 15</span>
                                    <span>Feb 22</span>
                                </div>
                            </div>

                            {/* Plan Distribution */}
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
                                <h4 className="font-bold text-slate-800 mb-6">Sales by Plan</h4>
                                <div className="flex-1 flex flex-col justify-center space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-slate-600">Startup Pack ($299)</span>
                                            <span className="font-bold text-slate-900">58%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-[58%]"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-slate-600">Paso a Paso ($79)</span>
                                            <span className="font-bold text-slate-900">24%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[24%]"></div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-slate-600">Business Ready ($899)</span>
                                            <span className="font-bold text-slate-900">18%</span>
                                        </div>
                                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-slate-600 w-[18%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions Table */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                <h4 className="font-bold text-slate-800">Recent Transactions</h4>
                                <button className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">View All <ArrowUpRight size={12} /></button>
                            </div>
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                    <tr>
                                        <th className="px-6 py-3">Customer</th>
                                        <th className="px-6 py-3">Plan</th>
                                        <th className="px-6 py-3">Date</th>
                                        <th className="px-6 py-3 text-right">Amount</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-3 font-medium text-slate-900">TechFlow Inc.</td>
                                        <td className="px-6 py-3 text-slate-600">Startup Pack</td>
                                        <td className="px-6 py-3 text-slate-500">Today, 2:30 PM</td>
                                        <td className="px-6 py-3 text-right font-bold text-slate-900">$299.00</td>
                                        <td className="px-6 py-3 text-center"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">Paid</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-3 font-medium text-slate-900">John Doe LLC</td>
                                        <td className="px-6 py-3 text-slate-600">Paso a Paso (Step 1)</td>
                                        <td className="px-6 py-3 text-slate-500">Yesterday</td>
                                        <td className="px-6 py-3 text-right font-bold text-slate-900">$79.00</td>
                                        <td className="px-6 py-3 text-center"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">Paid</span></td>
                                    </tr>
                                    <tr className="hover:bg-slate-50">
                                        <td className="px-6 py-3 font-medium text-slate-900">Global Trade Co.</td>
                                        <td className="px-6 py-3 text-slate-600">Business Ready</td>
                                        <td className="px-6 py-3 text-slate-500">Feb 14, 2026</td>
                                        <td className="px-6 py-3 text-right font-bold text-slate-900">$899.00</td>
                                        <td className="px-6 py-3 text-center"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">Paid</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


                {/* --- TAB 3: AUDIT LOG (Kept as is) --- */}
                {activeTab === 'audit' && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-300">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                                <tr>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Admin</th>
                                    <th className="px-6 py-3">Action</th>
                                    <th className="px-6 py-3">Detail</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50">
                                    <td className="px-6 py-3 text-slate-500">Today, 12:01 PM</td>
                                    <td className="px-6 py-3 font-medium">You</td>
                                    <td className="px-6 py-3"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Updated Price</span></td>
                                    <td className="px-6 py-3 text-slate-600">Changed Startup Pack to $299</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}

                {/* --- EDIT MODAL (The Controlled Experience) --- */}
                {isEditModalOpen && editingOffer && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                                <h3 className="text-xl font-bold text-slate-800">Edit Offer</h3>
                                <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="space-y-4">
                                    <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label><input className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editingOffer.title} onChange={(e) => setEditingOffer({ ...editingOffer, title: e.target.value })} /></div>
                                    <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subtitle</label><input className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editingOffer.subtitle} onChange={(e) => setEditingOffer({ ...editingOffer, subtitle: e.target.value })} /></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Price ($)</label><input type="number" className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editingOffer.price} onChange={(e) => setEditingOffer({ ...editingOffer, price: parseInt(e.target.value) || 0 })} /></div>
                                        <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Label</label><input className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editingOffer.label} onChange={(e) => setEditingOffer({ ...editingOffer, label: e.target.value })} /></div>
                                    </div>
                                    <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Stripe Link</label><input className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono text-slate-600" value={editingOffer.link} placeholder="https://buy.stripe.com/..." onChange={(e) => setEditingOffer({ ...editingOffer, link: e.target.value })} /></div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="bestValueToggle" checked={editingOffer.bestValue || false} onChange={(e) => setEditingOffer({ ...editingOffer, bestValue: e.target.checked })} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                                        <label htmlFor="bestValueToggle" className="text-sm font-medium text-slate-700">Mark as 'Best Value'</label>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 pt-4">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Features List</label>
                                    <div className="space-y-2">
                                        {editingOffer.features.map((feature, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <div className="bg-slate-50 p-2 rounded text-slate-400"><Check size={16} /></div>
                                                <input className="w-full p-2 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none" value={feature} onChange={(e) => updateEditingFeature(idx, e.target.value)} />
                                                <button onClick={() => removeFeatureFromEditing(idx)} className="text-slate-400 hover:text-red-500 px-1"><X size={16} /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={addFeatureToEditing} className="mt-3 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded flex items-center gap-1 transition-colors"><Plus size={14} /> Add Feature Item</button>
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 sticky bottom-0">
                                <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-slate-600 font-bold text-sm hover:bg-slate-100 rounded-lg">Cancel</button>
                                <button onClick={saveEditedOffer} className="px-6 py-2 bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 rounded-lg shadow-sm">Save Changes</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function KpiCard({ title, value, change, positive, icon }: { title: string, value: string, change: string, positive: boolean, icon?: any }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
                <h4 className="text-sm font-semibold text-slate-500">{title}</h4>
                {icon && <div className="p-2 bg-slate-50 rounded-lg">{icon}</div>}
            </div>
            <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-slate-900">{value}</div>
                <div className={`text-sm font-bold py-1 px-2 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {change}
                </div>
            </div>
        </div>
    )
}
