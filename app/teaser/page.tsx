"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import DocumentPreview from "@/app/components/DocumentPreview";
import LockedPlanPreview from "./components/LockedPlanPreview";

export default function TeaserPage() {
    const { language, data } = useBizPro();
    const pricing = data.content.landing.pricing;
    const packages = data.pricing.packages;
    const user = data.user;

    // Fallback if user skipped auth
    const userName = user.name.split(' ')[0] || "Emprendedor";
    const displayBusinessName = user.businessName || "tu negocio";

    const fmt = (n: number) => `$${n}`;

    return (
        <main className="min-h-screen relative font-sans text-[var(--foreground)] bg-white overflow-hidden">
            {/* Background Pattern - Subtle dots like Home if needed, or just clean white */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 z-0"></div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">

                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-[rgba(16,185,129,0.1)] border border-[var(--success)] rounded-full text-sm text-[var(--success)] mb-6 font-bold uppercase tracking-widest">
                        ANÁLISIS COMPLETADO
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--navy-brand)]">
                        Hola {userName}, aquí está el plan para {displayBusinessName}.
                    </h1>
                    <p className="text-xl text-[var(--text-gray)] max-w-2xl mx-auto mb-12">
                        Basado en tus respuestas, hemos diseñado la ruta más eficiente para legalizar tu negocio en Florida sin errores.
                    </p>

                    {/* INSTANT GRATIFICATION: Document Preview */}
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        <DocumentPreview businessName={displayBusinessName} language={language} />
                    </div>

                    {/* PERSONALIZED ROADMAP (Locked) */}
                    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <LockedPlanPreview />
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    {/* OPTION A: Pay per Step */}
                    <div className="bg-white border border-slate-200 p-8 rounded-[var(--radius-lg)] text-center relative hover:border-[var(--navy-brand)] hover:shadow-lg transition-all h-full flex flex-col group">
                        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--navy-brand)] transition-colors">{pricing.stepByStep.title[language]}</h3>
                        <div className="my-5 text-[2.5rem] font-bold leading-none text-[var(--foreground)]">
                            {fmt(data.pricing.steps[1].price)}<span className="text-base font-normal text-[var(--text-gray)]">/{language === 'es' ? "paso" : "step"}</span>
                        </div>
                        <p className="text-[var(--text-gray)] text-sm mb-6">{pricing.stepByStep.desc[language]}</p>
                        <ul className="text-left mb-8 space-y-3 text-[var(--text-gray)] text-sm flex-grow">
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Acceso secuencial" : "Sequential access"}</li>
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Pagas a tu ritmo" : "Pay as you go"}</li>
                        </ul>
                        <Link href="/dashboard" className="w-full py-3 rounded-xl font-semibold bg-white border border-slate-200 text-[var(--foreground)] hover:bg-[var(--navy-brand)] hover:text-white hover:border-[var(--navy-brand)] transition-all block">
                            {pricing.stepByStep.cta[language]}
                        </Link>
                    </div>

                    {/* OPTION B: Startup Pack (Featured) */}
                    <div className="bg-white border-2 border-[var(--navy-brand)] p-8 rounded-[var(--radius-lg)] text-center relative z-[2] shadow-[var(--card-shadow)] transform scale-105 h-full flex flex-col">
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            {pricing.startup.badge[language]}
                        </span>
                        <div className="inline-block bg-[#F0FDF4] text-[#15803D] text-sm font-bold px-2 py-1 rounded mb-4 self-center">
                            {pricing.startup.save[language]} {fmt(packages.startup.savings)}
                        </div>
                        <h3 className="text-2xl font-bold text-[var(--navy-brand)]">{pricing.startup.title[language]}</h3>
                        <div className="my-5 text-[3rem] font-bold leading-none text-[var(--foreground)]">
                            {fmt(packages.startup.price)}<span className="text-base font-normal text-[var(--text-gray)]">/{language === 'es' ? "único" : "one-time"}</span>
                        </div>
                        <p className="text-[var(--text-gray)] text-sm mb-6">{pricing.startup.desc[language]}</p>
                        <ul className="text-left mb-8 space-y-3 text-[var(--text-gray)] text-sm flex-grow">
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--navy-brand)] w-4 h-4" /> {language === 'es' ? "Identidad + Docs" : "Identity + Docs"}</li>
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--navy-brand)] w-4 h-4" /> {language === 'es' ? "Prioridad soporte" : "Priority support"}</li>
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--navy-brand)] w-4 h-4" /> {language === 'es' ? "Acceso comunidad" : "Community access"}</li>
                        </ul>
                        <button className="w-full py-4 rounded-xl font-bold bg-[var(--navy-brand)] text-white shadow-lg hover:bg-[#1A1A35] transition-all flex items-center justify-center gap-2" onClick={() => window.location.href = '/dashboard'}>
                            {pricing.startup.cta[language]} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* OPTION C: Business Ready */}
                    <div className="bg-white border border-slate-200 p-8 rounded-[var(--radius-lg)] text-center relative hover:border-[var(--navy-brand)] hover:shadow-lg transition-all h-full flex flex-col group">
                        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--navy-brand)] transition-colors">{pricing.readiness.title[language]}</h3>
                        <div className="my-5 text-[2.5rem] font-bold leading-none text-[var(--foreground)]">
                            {fmt(packages.readiness.price)}<span className="text-base font-normal text-[var(--text-gray)]">/{language === 'es' ? "único" : "one-time"}</span>
                        </div>
                        <p className="text-[var(--text-gray)] text-sm mb-6">{pricing.readiness.desc[language]}</p>
                        <ul className="text-left mb-8 space-y-3 text-[var(--text-gray)] text-sm flex-grow">
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Todos los 6 pasos" : "All 6 steps"}</li>
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Asesoría 1-1" : "1-on-1 Consulting"}</li>
                            <li className="flex items-center gap-2.5"><Check className="text-[var(--success)] w-4 h-4" /> {language === 'es' ? "Plan de Negocio" : "Business Plan"}</li>
                        </ul>
                        <Link href="/dashboard" className="w-full py-3 rounded-xl font-semibold bg-white border border-slate-200 text-[var(--foreground)] hover:bg-[var(--navy-brand)] hover:text-white hover:border-[var(--navy-brand)] transition-all block">
                            {pricing.readiness.cta[language]}
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}
