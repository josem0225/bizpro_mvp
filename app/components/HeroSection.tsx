"use client";

import { useBizPro } from "@/app/context/BizProContext";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Check, ArrowRight, PlayCircle } from "lucide-react";

export default function HeroSection() {
    const { language, data } = useBizPro();
    const hero = data.content.landing.hero;

    // Ref for intersection observer animation
    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("translate-y-0", "opacity-100");
                        entry.target.classList.remove("translate-y-[30px]", "opacity-0");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (revealRef.current) {
            observer.observe(revealRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-6 overflow-hidden bg-[var(--background)]">
            {/* Background Decor - Subtle & Premium */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[var(--navy-brand)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0"></div>

            <div
                ref={revealRef}
                className="relative z-[3] max-w-[1000px] mx-auto text-center px-6 transition-all duration-1000 ease-out translate-y-[30px] opacity-0"
            >
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100/80 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 mb-8 uppercase tracking-wider shadow-sm backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-[var(--navy-brand)] animate-pulse"></span>
                    Plataforma Oficial para Emprendedores
                </span>

                {/* Heading */}
                <h1 className="text-[clamp(3rem,6vw,4.5rem)] font-bold leading-[1.05] mb-6 tracking-tight text-[var(--foreground)]">
                    {hero.title[language]}
                    <span className="block text-[var(--text-gray)] font-medium mt-2 text-[clamp(2rem,4vw,3.5rem)]">
                        {hero.subtitle[language]}
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-[var(--text-gray)] mb-10 max-w-[640px] mx-auto leading-relaxed">
                    {language === 'es'
                        ? "La primera plataforma diseñada para guiar a emprendedores hispanos en Florida. Transforma la burocracia en confianza paso a paso."
                        : "The first platform designed to guide Hispanic entrepreneurs in Florida. Transform bureaucracy into confidence step by step."}
                </p>

                {/* Target Audience Tabs - Premium Look */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {hero.audience_bullets[language].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm text-sm font-medium text-slate-600">
                            <Check className="w-4 h-4 text-[var(--navy-brand)]" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                    <Link
                        href="/intake"
                        className="group flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-[var(--navy-brand)] text-white hover:bg-[#1A1A35] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                        {hero.cta_primary[language]}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                        href="#funciona"
                        className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-white text-slate-700 border border-slate-200 hover:border-[var(--navy-brand)] hover:text-[var(--navy-brand)] hover:shadow-md transition-all duration-300"
                    >
                        <PlayCircle className="w-5 h-5" />
                        {hero.cta_secondary[language]}
                    </Link>
                </div>

                {/* Premium Dashboard Mockup - Clean SaaS Style */}
                <div className="relative mx-auto max-w-[900px]">
                    <div className="relative bg-white border border-slate-200/60 rounded-2xl shadow-[var(--card-shadow)] overflow-hidden">
                        {/* Browser Bar */}
                        <div className="bg-slate-50/50 border-b border-slate-100 p-4 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                            </div>
                            <div className="mx-auto bg-white border border-slate-200/50 px-4 py-1 rounded-md text-[10px] text-slate-400 font-mono">
                                bizpro.app/dashboard
                            </div>
                        </div>

                        {/* App Interface */}
                        <div className="grid grid-cols-[220px_1fr] min-h-[400px] text-left">
                            {/* Sidebar */}
                            <div className="bg-slate-50 border-r border-slate-100 p-6 hidden sm:block">
                                <div className="h-4 w-24 bg-slate-200 rounded mb-8"></div>
                                <div className="space-y-4">
                                    <div className="h-3 w-full bg-[var(--navy-brand)]/10 text-[var(--navy-brand)] rounded px-2 py-4 flex items-center font-medium text-xs">Overview</div>
                                    <div className="h-3 w-3/4 bg-slate-200/50 rounded ml-2"></div>
                                    <div className="h-3 w-5/6 bg-slate-200/50 rounded ml-2"></div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="p-8 bg-white">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <div className="h-5 w-48 bg-slate-900/5 rounded mb-2"></div>
                                        <div className="h-3 w-32 bg-slate-400/10 rounded"></div>
                                    </div>
                                    <div className="h-8 w-8 rounded-full bg-slate-100"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                        <div className="h-2 w-20 bg-slate-200 rounded mb-4"></div>
                                        <div className="h-6 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-xs font-bold">100%</div>
                                    </div>
                                    <div className="p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                        <div className="h-2 w-20 bg-slate-200 rounded mb-4"></div>
                                        <div className="h-6 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2/5</div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="h-16 border border-slate-100 rounded-lg p-4 flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-emerald-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-2 w-24 bg-slate-800/10 rounded mb-1.5"></div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full w-full bg-emerald-400"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-16 border border-[var(--navy-brand)]/20 bg-[var(--navy-brand)]/5 rounded-lg p-4 flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-white border border-[var(--navy-brand)]/20 flex items-center justify-center shadow-sm">
                                            <div className="w-2 h-2 rounded-full bg-[var(--navy-brand)] animate-ping"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-2 w-32 bg-[var(--navy-brand)]/20 rounded mb-1.5"></div>
                                            <div className="h-1.5 w-full bg-white rounded-full overflow-hidden">
                                                <div className="h-full w-[40%] bg-[var(--navy-brand)]"></div>
                                            </div>
                                        </div>
                                        <button className="px-3 py-1 bg-[var(--navy-brand)] text-white text-[10px] uppercase font-bold tracking-wider rounded-md">
                                            Continuar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
