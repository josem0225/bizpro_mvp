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
        <section className="relative min-h-screen flex items-center pt-[140px] overflow-hidden bg-[var(--background)]">
            <div
                ref={revealRef}
                className="relative z-[3] max-w-[800px] mx-auto text-center px-4 transition-all duration-1000 ease-out translate-y-[30px] opacity-0"
            >
                <span className="inline-block px-4 py-1.5 bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.3)] rounded-full text-sm text-[var(--blue-glow)] mb-6 font-bold uppercase tracking-widest">
                    Plataforma Oficial para Emprendedores
                </span>

                <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] mb-6 tracking-tight text-[var(--foreground)]">
                    {hero.title[language]}
                    <br />
                    <span className="text-[var(--text-gray)]">
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
                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--navy-brand)]"></div>
                            <span className="font-medium">{item}</span>
                        </div>
                    ))}
                </div>

                <div className="flex gap-4 justify-center flex-wrap">
                    <Link
                        href="/intake"
                        className="px-8 py-3 rounded-lg font-bold bg-[var(--navy-brand)] text-white hover:bg-[var(--navy-light)] transition-all"
                    >
                        {hero.cta_primary[language]}
                    </Link>
                    <Link
                        href="#funciona"
                        className="px-8 py-3 rounded-lg font-bold border-2 border-[var(--glass-border)] text-[var(--foreground)] hover:border-[var(--navy-brand)] transition-all"
                    >
                        {hero.cta_secondary[language]}
                    </Link>
                </div>

                {/* Glass Card Showcase - Dashboard Mockup */}
                <div className="mt-[60px] bg-[var(--background)] border border-[var(--glass-border)] rounded-[var(--radius-lg)] p-5 shadow-[var(--card-shadow)] transform [perspective:1000px] rotate-x-2 hover:rotate-x-0 transition-transform duration-500 max-w-[900px] mx-auto">
                    <div className="w-full h-auto rounded-xl bg-[var(--navy-deep)] p-5 grid grid-cols-[minmax(0,200px)_1fr] gap-5 text-left overflow-hidden">
                        {/* Mock Sidebar */}
                        <div className="bg-[var(--glass-border)]/50 rounded-lg p-2.5 hidden sm:block">
                            <div className="h-2.5 bg-[var(--text-gray)]/20 mb-2.5 rounded w-[70%]"></div>
                            <div className="h-2.5 bg-[var(--navy-brand)] mb-2.5 rounded w-[90%]"></div>
                            <div className="h-2.5 bg-[var(--text-gray)]/20 mb-2.5 rounded w-[60%]"></div>
                        </div>
                        {/* Mock Main */}
                        <div className="grid gap-4 w-full">
                            <div className="h-10 bg-gradient-to-r from-[var(--navy-brand)]/10 to-transparent rounded-lg flex items-center px-4 border border-[var(--navy-brand)]/20">
                                <span className="text-xs mr-2.5 text-[var(--text-gray)]">Progreso:</span>
                                <div className="w-[100px] h-2 bg-[var(--text-gray)]/20 rounded-full overflow-hidden">
                                    <div className="w-[30%] h-full bg-[var(--success)]"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="h-20 bg-[var(--background)] rounded-lg border border-[var(--success)] text-[var(--success)] flex items-center justify-center text-sm font-medium shadow-sm">
                                    ✔ Paso 0: Orientación
                                </div>
                                <div className="h-20 bg-[var(--background)] rounded-lg border border-dashed border-[var(--glass-border)] text-[var(--text-gray)] flex items-center justify-center text-sm opacity-60">
                                    🔒 Paso 1: Identidad
                                </div>
                                <div className="h-20 bg-[var(--background)] rounded-lg border border-dashed border-[var(--glass-border)] text-[var(--text-gray)] flex items-center justify-center text-sm opacity-60">
                                    🔒 Paso 2: Docs
                                </div>
                                <div className="h-20 bg-[var(--background)] rounded-lg border border-dashed border-[var(--glass-border)] text-[var(--text-gray)] flex items-center justify-center text-sm opacity-60">
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
