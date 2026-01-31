"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { Check, X } from "lucide-react";

export default function ComparisonSection() {
    const { language, data } = useBizPro();
    const comparison = data.content.landing.comparison;

    return (
        <section className="py-[100px] bg-[rgba(0,0,0,0.3)]">
            <div className="w-[90%] max-w-[var(--container-width)] mx-auto">
                <div className="text-center mb-[60px]">
                    <h2 className="text-[2.5rem] font-bold mb-4">{comparison.title[language]}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* BizPro Side */}
                    <div className="bg-[rgba(23,19,77,0.6)] border border-[var(--blue-electric)] rounded-[var(--radius-lg)] p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--blue-electric)]"></div>
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                            <div className="w-8 h-8 bg-[var(--blue-electric)] rounded-md flex items-center justify-center text-sm text-white">B</div>
                            BizPro
                        </h3>
                        <div className="space-y-6">
                            {comparison.bizpro[language].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-[rgba(16,185,129,0.1)] border border-[var(--success)] flex items-center justify-center text-[var(--success)] shrink-0">
                                        <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Others Side */}
                    <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] p-8 relative opacity-80">
                        <h3 className="text-2xl font-bold mb-8 text-[var(--text-gray)]">Gestores / Others</h3>
                        <div className="space-y-6">
                            {comparison.others[language].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
                                        <X className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[var(--text-gray)]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
