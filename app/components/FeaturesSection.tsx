"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { useEffect, useRef } from "react";
import { Globe, Rocket, Building2 } from "lucide-react";

export default function FeaturesSection() {
    const { language, data } = useBizPro();
    const features = data.content.landing.features;

    const revealRef = useRef<HTMLDivElement>(null);

    // Map content icons (emojis in DB) to Lucide components
    const iconMap = [Globe, Rocket, Building2];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        entry.target.classList.remove("opacity-0", "translate-y-[20px]");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = document.querySelectorAll(".bento-card-reveal");
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-6 bg-white" id="nosotros">
            <div className="w-[90%] max-w-[var(--container-width)] mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-[2.5rem] font-bold mb-2 text-[var(--foreground)] tracking-tight">
                        {features.title[language]}
                    </h2>
                    <p className="text-[var(--text-gray)] text-lg max-w-2xl mx-auto">
                        {features.subtitle[language]}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.cards.map((card: any, idx: number) => {
                        const Icon = iconMap[idx] || Globe;
                        return (
                            <div
                                key={idx}
                                className="bento-card-reveal opacity-0 translate-y-[20px] transition-all duration-700 ease-out bg-white border border-slate-100 p-8 rounded-2xl hover:shadow-[var(--card-shadow)] hover:-translate-y-1 group h-full flex flex-col items-start text-left"
                            >
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-[var(--navy-brand)] group-hover:text-white transition-colors duration-300 text-[var(--navy-brand)]">
                                    <Icon className="w-6 h-6" />
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-[var(--foreground)]">
                                    {card.title[language]}
                                </h3>
                                <p className="text-[var(--text-gray)] leading-relaxed flex-1">
                                    {card.desc[language]}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
