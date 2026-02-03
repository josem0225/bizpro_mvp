"use client";

import React from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';

export default function LockedPlanPreview() {
    return (
        <div className="max-w-2xl mx-auto my-12 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
                <h3 className="font-bold">Your Personalized Roadmap</h3>
                <span className="text-xs bg-slate-800 px-3 py-1 rounded-full border border-slate-700">6 Steps</span>
            </div>

            <div className="divide-y divide-slate-100">

                {/* FREE STEP - OPEN */}
                <div className="px-6 py-5 flex items-center gap-4 bg-green-50/50">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="text-green-600 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-slate-900">Step 0: Initial Orientation</h4>
                        <p className="text-sm text-slate-500">Completed during intake</p>
                    </div>
                    <span className="text-xs font-bold text-green-700 uppercase">Unlocked</span>
                </div>

                {/* STEP 1 - LOCKED */}
                <div className="px-6 py-5 flex items-center gap-4 opacity-75">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Lock className="text-slate-400 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-slate-800">Step 1: Business Identity</h4>
                        <p className="text-sm text-slate-500">Name, Structure, Domain</p>
                    </div>
                    <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden"></div> {/* Placeholder progress bar */}
                </div>

                {/* STEP 2 - LOCKED */}
                <div className="px-6 py-5 flex items-center gap-4 opacity-75">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Lock className="text-slate-400 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-slate-800">Step 2: Key Documents</h4>
                        <p className="text-sm text-slate-500">EIN, Operating Agreement</p>
                    </div>
                    <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden"></div>
                </div>

                {/* CALL TO ACTION OVERLAY */}
                <div className="bg-gradient-to-b from-transparent to-white p-6 text-center border-t border-slate-100">
                    <p className="text-slate-600 mb-4 font-medium">Unlock your full roadmap to start your business.</p>
                    <button className="bg-[var(--navy-brand)] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all w-full md:w-auto">
                        Unlock All Steps for $299
                    </button>
                </div>

            </div>
        </div>
    );
}
