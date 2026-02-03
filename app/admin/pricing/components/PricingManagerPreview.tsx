"use client";

import React from 'react';
import { Save, AlertCircle, DollarSign, CheckCircle2 } from 'lucide-react';

export default function PricingManagerPreview() {
    // FAKE DATA for Demo
    const steps = [
        { id: 1, name: "Step 1: Business Identity", price: 79, active: true },
        { id: 2, name: "Step 2: Key Documents", price: 129, active: true },
        { id: 3, name: "Step 3: Operational Setup", price: 129, active: true },
        { id: 4, name: "Step 4: Business Plan", price: 199, active: false },
    ];

    const packages = [
        { id: 1, name: "Startup Navigation Package", price: 299, original: 337 },
        { id: 2, name: "Business Readiness Package", price: 899, original: 1036 },
    ];

    return (
        <div className="p-8 bg-slate-50 min-h-screen max-w-5xl mx-auto font-sans">

            {/* Header */}
            <div className="mb-8 border-b pb-4 border-slate-200 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Pricing Manager</h1>
                    <p className="text-slate-500">Manage Step & Package pricing. Changes affect <span className="font-bold text-red-600">NEW customers only</span>.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-sm transition-all">
                    <Save size={18} /> Save Changes
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* SECTION 1: Individual Steps */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <DollarSign size={18} className="text-blue-600" /> Individual Step Prices
                        </h2>
                    </div>
                    <div className="p-6 space-y-6">
                        {steps.map((step) => (
                            <div key={step.id} className="flex items-center justify-between group">
                                <div>
                                    <div className="font-semibold text-slate-700">{step.name}</div>
                                    <div className="text-xs text-slate-400 uppercase tracking-wider">{step.active ? 'Active' : 'Inactive'}</div>
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                    <input
                                        type="number"
                                        defaultValue={step.price}
                                        className="w-32 pl-7 pr-3 py-2 border border-slate-300 rounded-lg text-right font-mono text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 2: Packages */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-600" /> Package Deals
                        </h2>
                    </div>
                    <div className="p-6 space-y-8">
                        {packages.map((pkg) => (
                            <div key={pkg.id} className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                                <div className="flex justify-between mb-2">
                                    <h3 className="font-bold text-slate-800">{pkg.name}</h3>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">SAVE ${pkg.original - pkg.price}</span>
                                </div>
                                <div className="flex items-center gap-4 mt-4">
                                    <div className="flex-1">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Package Price</label>
                                        <div className="relative mt-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                                            <input
                                                type="number"
                                                defaultValue={pkg.price}
                                                className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg font-mono text-slate-900 font-bold text-lg"
                                            />
                                        </div>
                                    </div>
                                    <div className="text-slate-400 pt-6">vs</div>
                                    <div className="flex-1 opacity-60">
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Sum of Steps</label>
                                        <div className="relative mt-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                                            <input
                                                type="number"
                                                defaultValue={pkg.original}
                                                disabled
                                                className="w-full pl-7 pr-3 py-2 bg-slate-100 border border-slate-200 rounded-lg font-mono text-slate-500 cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs text-slate-500 flex items-center gap-1">
                                    <AlertCircle size={12} /> Price must be lower than sum of steps
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
