"use client";

import React, { useState } from 'react';
import { Save, DollarSign, BarChart3, Settings, History, ExternalLink, Edit3, Package, Layers, Briefcase, Plus, Trash2 } from 'lucide-react';
import { useBizPro } from '@/app/context/BizProContext';

export default function PricingManagerPreview() {
    const { language } = useBizPro();
    const [activeTab, setActiveTab] = useState<'config' | 'metrics' | 'audit'>('config');

    // --- Mock Data: The 3 Core Offers Match Frontend ---
    const [offers, setOffers] = useState([
        {
            id: 'step',
            title: 'Paso a Paso',
            subtitle: 'Pay as you go',
            price: 79,
            label: '/step',
            link: 'https://buy.stripe.com/step_link',
            active: true,
            icon: <Layers className="text-blue-600" size={24} />
        },
        {
            id: 'startup',
            title: 'Startup Pack',
            subtitle: 'Recommended Bundle',
            price: 299,
            label: '/one-time',
            link: 'https://buy.stripe.com/startup_link',
            active: true,
            bestValue: true,
            icon: <Package className="text-purple-600" size={24} />
        },
        {
            id: 'business',
            title: 'Business Ready',
            subtitle: 'Full Service',
            price: 899,
            label: '/one-time',
            link: 'https://buy.stripe.com/business_link',
            active: true,
            icon: <Briefcase className="text-slate-600" size={24} />
        }
    ]);

    const [paywallCopy, setPaywallCopy] = useState("Inversión Transparente. Sin costos ocultos.");

    const handleAddOffer = () => {
        const newOffer = {
            id: `offer_${Date.now()}`,
            title: 'New Plan',
            subtitle: 'Description',
            price: 0,
            label: '/one-time',
            link: '',
            active: false,
            icon: <Package className="text-slate-400" size={24} />
        };
        setOffers([...offers, newOffer]);
    };

    const handleDeleteOffer = (id: string) => {
        if (confirm("Are you sure you want to delete this offer?")) {
            setOffers(offers.filter(offer => offer.id !== id));
        }
    };

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

                {/* Navigation Tabs */}
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
                        <BarChart3 size={18} /> Metrics
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'audit' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <History size={18} /> Audit Log
                    </button>
                </div>

                {/* --- TAB 1: OFFER CONFIGURATION (The Core Request) --- */}
                {activeTab === 'config' && (
                    <div className="space-y-8 animate-in fade-in duration-300">

                        {/* Section A: Headline Editor */}
                        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                    <Edit3 size={18} className="text-slate-400" /> Page Headline
                                </h3>
                            </div>
                            <input
                                className="w-full text-2xl font-bold text-center border-b-2 border-slate-100 focus:border-blue-500 outline-none p-2 text-slate-800"
                                value={paywallCopy}
                                onChange={(e) => setPaywallCopy(e.target.value)}
                            />
                        </div>

                        {/* Section B: The 3 Main Offer Cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {offers.map((offer, index) => (
                                <div key={offer.id} className={`bg-white rounded-xl border-2 shadow-sm overflow-hidden relative transition-all ${offer.bestValue ? 'border-purple-500 ring-4 ring-purple-500/10' : 'border-slate-200 hover:border-slate-300'}`}>

                                    {/* Best Value Badge */}
                                    {offer.bestValue && (
                                        <div className="bg-purple-500 text-white text-xs font-bold text-center py-1 uppercase tracking-wider">
                                            Recomendado
                                        </div>
                                    )}

                                    {/* Delete Button (Added) */}
                                    <button
                                        onClick={() => handleDeleteOffer(offer.id)}
                                        className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
                                        title="Remove Offer"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                    <div className="p-6 space-y-4">
                                        {/* Header */}
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-slate-50 rounded-lg">{offer.icon}</div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-lg leading-tight">{offer.title}</h3>
                                                <p className="text-xs text-slate-400 font-medium uppercase">{offer.subtitle}</p>
                                            </div>
                                        </div>

                                        {/* Price Input */}
                                        <div className="relative">
                                            <div className="flex items-end gap-1">
                                                <span className="text-3xl font-bold text-slate-800 mb-1">$</span>
                                                <input
                                                    type="number"
                                                    defaultValue={offer.price}
                                                    className="w-24 text-4xl font-extrabold text-slate-900 border-b-2 border-slate-200 focus:border-blue-500 outline-none px-0 py-1 bg-transparent transition-colors"
                                                />
                                                <span className="text-sm text-slate-400 font-semibold mb-2">{offer.label}</span>
                                            </div>
                                        </div>

                                        {/* Link Input */}
                                        <div className="pt-4 border-t border-slate-100">
                                            <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Stripe Payment Link</label>
                                            <div className="flex gap-2">
                                                <input
                                                    defaultValue={offer.link}
                                                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded text-slate-600 focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                                                    placeholder="https://buy.stripe.com/..."
                                                />
                                                <button className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded">
                                                    <ExternalLink size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Status Toggle */}
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-xs font-semibold text-slate-500">Visible on Site</span>
                                            <div className={`w-10 h-5 rounded-full relative cursor-pointer ${offer.active ? 'bg-green-500' : 'bg-slate-300'}`}>
                                                <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${offer.active ? 'right-1' : 'left-1'}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add New Plan Card (Added) */}
                            <button
                                onClick={handleAddOffer}
                                className="border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-6 text-slate-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all min-h-[300px]"
                            >
                                <Plus size={48} className="mb-4 opacity-50" />
                                <span className="font-bold text-lg">Add New Plan</span>
                                <span className="text-xs mt-2">Create another pricing tier</span>
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-slate-400">Manage your offers dynamically. Changes reflect immediately on the frontend.</p>
                        </div>
                    </div>
                )}

                {/* --- TAB 2: METRICS DASHBOARD (Simplified) --- */}
                {activeTab === 'metrics' && (
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="grid md:grid-cols-3 gap-6">
                            <KpiCard title="Total Revenue" value="$45,200" change="+12%" positive />
                            <KpiCard title="Active Subscribers" value="142" change="+5%" positive />
                            <KpiCard title="Avg. Order Value" value="$285" change="-1%" positive={false} />
                        </div>
                        {/* Chart Area Mock */}
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-80 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 flex items-end justify-between px-12 py-8 opacity-20">
                                <div className="w-12 h-[30%] bg-blue-600 rounded-t"></div>
                                <div className="w-12 h-[50%] bg-blue-600 rounded-t"></div>
                                <div className="w-12 h-[40%] bg-blue-600 rounded-t"></div>
                                <div className="w-12 h-[70%] bg-blue-600 rounded-t"></div>
                                <div className="w-12 h-[60%] bg-blue-600 rounded-t"></div>
                                <div className="w-12 h-[90%] bg-blue-600 rounded-t"></div>
                            </div>
                            <p className="text-slate-400 font-medium z-10 bg-white/80 px-4 py-2 rounded-full backdrop-blur">
                                Revenue Chart Visualization
                            </p>
                        </div>
                    </div>
                )}

                {/* --- TAB 3: AUDIT LOG --- */}
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

            </div>
        </div>
    );
}

// --- Helper Components ---
function KpiCard({ title, value, change, positive }: { title: string, value: string, change: string, positive: boolean }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-500 mb-2">{title}</h4>
            <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-slate-900">{value}</div>
                <div className={`text-sm font-bold py-1 px-2 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {change}
                </div>
            </div>
        </div>
    )
}
