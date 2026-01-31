"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { useEffect, useRef } from "react";

export default function FeaturesSection() {
    const { language, data } = useBizPro();
    const features = data.content.landing.features;

    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        entry.target.classList.remove("opacity-0", "translate-y-[20px]");
                        // observer.unobserve(entry.target); // Keep observing? No, once is enough typically
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
        <section className="py-[100px]" id="nosotros">
            <div className="w-[90%] max-w-[var(--container-width)] mx-auto">
                <div className="text-center mb-[60px]">
                    <h2 className="text-[2.5rem] font-bold mb-4">{features.title[language]}</h2>
                    <p className="text-[var(--text-gray)]">{features.subtitle[language]}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`bento-card-reveal opacity-0 translate-y-[20px] transition-all duration-700 ease-out bg-[var(--glass-bg)] border border-[var(--glass-border)] p-8 rounded-[var(--radius-md)] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)] hover:translate-y-[-5px] group ${card.wide ? "md:col-span-2" : ""}`}
                        >
                            <span className="text-[2rem] mb-5 inline-block bg-gradient-to-br from-[var(--blue-electric)] to-[var(--navy-brand)] bg-clip-text text-transparent">
                                {card.icon}
                            </span>
                            <h3 className="text-xl font-bold mb-2.5 group-hover:text-[var(--blue-glow)] transition-colors">{card.title[language]}</h3>
                            <p className="text-[var(--text-gray)]">{card.desc[language]}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
