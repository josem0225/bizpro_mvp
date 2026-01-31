"use client";

import { useBizPro } from "@/app/context/BizProContext";
import Link from "next/link";
import { useEffect, useRef } from "react";

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
        <section className="relative min-h-screen flex items-center pt-[80px] overflow-hidden">
            {/* Gradient Overlay handled in page or via global util if needed, but here we can add a subtle one */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(23,19,77,0.4)_0%,var(--navy-deep)_90%)] z-[1] pointer-events-none" />

            <div
                ref={revealRef}
                className="relative z-[3] max-w-[800px] mx-auto text-center px-4 transition-all duration-1000 ease-out translate-y-[30px] opacity-0"
            >
                <span className="inline-block px-4 py-1.5 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-full text-sm text-[var(--blue-glow)] mb-6 font-bold uppercase tracking-widest">
                    Plataforma Oficial para Emprendedores
                </span>

                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] mb-6 tracking-tight">
                    {hero.title[language]}
                    <br />
                    <span className="bg-gradient-to-br from-white to-[var(--text-gray)] bg-clip-text text-transparent">
                        {hero.subtitle[language]}
                    </span>
                </h1>

                <p className="text-xl text-[var(--text-gray)] mb-6 max-w-[600px] mx-auto">
                    {language === 'es'
                        ? "La primera plataforma diseñada para guiar a emprendedores hispanos en Florida. Transforma la burocracia en confianza paso a paso."
                        : "The first platform designed to guide Hispanic entrepreneurs in Florida. Transform bureaucracy into confidence step by step."}
                </p>

                {/* Target Audience Bullets */}
                <div className="flex flex-col gap-2 items-center mb-10 text-[var(--text-gray)]">
                    {hero.audience_bullets[language].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--blue-electric)]"></div>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 justify-center flex-wrap">
                    <Link
                        href="/intake"
                        className="px-8 py-4 rounded-xl font-bold bg-[var(--blue-electric)] text-white shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(59,130,246,0.6)] hover:bg-[#2563EB] transition-all"
                    >
                        {hero.cta_primary[language]}
                    </Link>
                    <Link
                        href="#funciona"
                        className="px-8 py-4 rounded-xl font-bold bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--white)] hover:bg-[rgba(255,255,255,0.1)] hover:border-white transition-all"
                    >
                        {hero.cta_secondary[language]}
                    </Link>
                </div>

                {/* Glass Card Showcase - Dashboard Mockup */}
                <div className="mt-[60px] bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[12px] rounded-[var(--radius-lg)] p-5 shadow-[var(--card-shadow)] transform [perspective:1000px] rotate-x-2 hover:rotate-x-0 transition-transform duration-500">
                    <div className="w-full h-auto rounded-xl bg-[#0f172a] p-5 grid grid-cols-[minmax(0,200px)_1fr] gap-5 text-left overflow-hidden">
                        {/* Mock Sidebar */}
                        <div className="bg-black/30 rounded-lg p-2.5 hidden sm:block">
                            <div className="h-2.5 bg-white/10 mb-2.5 rounded w-[70%]"></div>
                            <div className="h-2.5 bg-[var(--blue-electric)] mb-2.5 rounded w-[90%]"></div>
                            <div className="h-2.5 bg-white/10 mb-2.5 rounded w-[60%]"></div>
                        </div>
                        {/* Mock Main */}
                        <div className="grid gap-4 w-full">
                            <div className="h-10 bg-gradient-to-r from-[var(--navy-brand)] to-transparent rounded-lg flex items-center px-4">
                                <span className="text-xs mr-2.5 text-gray-400">Progreso:</span>
                                <div className="w-[100px] h-2 bg-black/50 rounded-full overflow-hidden">
                                    <div className="w-[30%] h-full bg-[var(--success)]"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="h-20 bg-white/5 rounded-lg border border-[var(--success)] bg-[rgba(16,185,129,0.1)] text-[var(--success)] flex items-center justify-center text-sm font-medium">
                                    ✔ Paso 0: Orientación
                                </div>
                                <div className="h-20 bg-white/5 rounded-lg border border-dashed border-white/20 text-white/30 flex items-center justify-center text-sm">
                                    🔒 Paso 1: Identidad
                                </div>
                                <div className="h-20 bg-white/5 rounded-lg border border-dashed border-white/20 text-white/30 flex items-center justify-center text-sm">
                                    🔒 Paso 2: Docs
                                </div>
                                <div className="h-20 bg-white/5 rounded-lg border border-dashed border-white/20 text-white/30 flex items-center justify-center text-sm">
                                    🔒 Paso 3: Banco
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
