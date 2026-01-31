"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { Check } from "lucide-react";

export default function PricingSection() {
    const { language, data } = useBizPro();
    const pricing = data.content.landing.pricing;
    const packages = data.pricing.packages;
    const steps = data.pricing.steps;
    // Helper to format currency
    const fmt = (n: number) => `$${n}`;

    return (
        <section className="py-[100px]" id="precios">
            <div className="w-[90%] max-w-[var(--container-width)] mx-auto">
                <div className="text-center mb-[60px]">
                    <h2 className="text-[2.5rem] font-bold mb-4">{pricing.title[language]}</h2>
                    <p className="text-[var(--text-gray)]">{language === 'es' ? "Sin costos ocultos." : "No hidden fees."}</p>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-[30px] items-center">

                    {/* OPTION A: Pay per Step */}
                    <div className="bg-[var(--background)] border border-[var(--glass-border)] p-10 rounded-[var(--radius-lg)] text-center relative hover:border-[var(--navy-brand)] transition-colors">
                        <h3 className="text-xl font-bold text-[var(--foreground)]">{pricing.stepByStep.title[language]}</h3>
                        <div className="my-5 text-[3rem] font-bold leading-none text-[var(--foreground)]">
                            {fmt(data.pricing.steps[1].price)}<span className="text-base font-normal text-[var(--text-gray)]">/{language === 'es' ? "paso" : "step"}</span>
                        </div>
                        <p className="text-[var(--text-gray)] text-sm mb-6">{pricing.stepByStep.desc[language]}</p>
                        <ul className="text-left mb-[30px] space-y-3 text-[var(--text-gray)] text-sm">
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Acceso secuencial" : "Sequential access"}</li>
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Pagas a tu ritmo" : "Pay as you go"}</li>
                        </ul>
                        <button className="w-full py-4 rounded-xl font-semibold bg-[var(--background)] border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--foreground)]/5 hover:border-[var(--foreground)] transition-all">
                            {pricing.stepByStep.cta[language]}
                        </button>
                    </div>

                    {/* OPTION B: Startup Pack (Featured) */}
                    <div className="bg-[var(--background)] border-2 border-[var(--blue-electric)] p-10 rounded-[var(--radius-lg)] text-center relative z-[2] shadow-lg transform scale-105">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--gold)] text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase">
                            {pricing.startup.badge[language]}
                        </span>
                        <div className="inline-block bg-[var(--success)]/10 text-[var(--success)] text-sm font-semibold px-2 py-1 rounded mb-4">
                            {pricing.startup.save[language]} {fmt(packages.startup.savings)}
                        </div>
                        <h3 className="text-xl font-bold text-[var(--foreground)]">{pricing.startup.title[language]}</h3>
                        <div className="my-5 text-[3rem] font-bold leading-none text-[var(--foreground)]">
                            {fmt(packages.startup.price)}<span className="text-base font-normal text-[var(--text-gray)]">/{language === 'es' ? "único" : "one-time"}</span>
                        </div>
                        <p className="text-[var(--text-gray)] text-sm mb-6">{pricing.startup.desc[language]}</p>
                        <ul className="text-left mb-[30px] space-y-3 text-[var(--text-gray)] text-sm">
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Identidad + Docs" : "Identity + Docs"}</li>
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Prioridad soporte" : "Priority support"}</li>
                        </ul>
                        <button className="w-full py-4 rounded-xl font-bold bg-[var(--blue-electric)] text-white shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:bg-[#2563EB] transition-all">
                            {pricing.startup.cta[language]}
                        </button>
                    </div>

                    {/* OPTION C: Business Ready */}
                    <div className="bg-[var(--background)] border border-[var(--glass-border)] p-10 rounded-[var(--radius-lg)] text-center relative hover:border-[var(--navy-brand)] transition-colors">
                        <h3 className="text-xl font-bold text-[var(--foreground)]">{pricing.readiness.title[language]}</h3>
                        <div className="my-5 text-[3rem] font-bold leading-none text-[var(--foreground)]">
                            {fmt(packages.readiness.price)}<span className="text-base font-normal text-[var(--text-gray)]">/{language === 'es' ? "único" : "one-time"}</span>
                        </div>
                        <p className="text-[var(--text-gray)] text-sm mb-6">{pricing.readiness.desc[language]}</p>
                        <ul className="text-left mb-[30px] space-y-3 text-[var(--text-gray)] text-sm">
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Todos los 6 pasos" : "All 6 steps"}</li>
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Asesoría 1-1" : "1-on-1 Consulting"}</li>
                        </ul>
                        <button className="w-full py-4 rounded-xl font-semibold bg-[var(--background)] border border-[var(--glass-border)] text-[var(--foreground)] hover:bg-[var(--foreground)]/5 hover:border-[var(--foreground)] transition-all">
                            {pricing.readiness.cta[language]}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
