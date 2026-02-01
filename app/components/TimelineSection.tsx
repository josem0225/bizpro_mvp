"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { useEffect, useRef } from "react";

export default function TimelineSection() {
    const { language, data } = useBizPro();
    const steps = data.content.stepsDetail;

    const revealRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("opacity-100", "translate-y-0");
                        entry.target.classList.remove("opacity-0", "translate-y-[30px]");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const steps = document.querySelectorAll(".step-reveal");
        steps.forEach((step) => observer.observe(step)); // Observe each step individually

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-6 bg-[var(--background)]" id="funciona">
            <div className="w-[90%] max-w-[var(--container-width)] mx-auto">
                <div className="text-center mb-6">
                    <h2 className="text-[2.5rem] font-bold mb-2">{data.content.ui.nav.howItWorks[language]}</h2>
                    <p className="text-[var(--text-gray)]">{language === 'es' ? "Un sistema probado paso a paso." : "A proven step-by-step system."}</p>
                </div>

                <div className="relative max-w-[800px] mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-[var(--glass-border)]" />

                    {/* Steps */}
                    {steps.map((step) => {
                        // Resolve price from pricing Data
                        const price = data.pricing.steps[step.id]?.price || 0;
                        return (
                            <div key={step.id} className="step-reveal flex mb-8 relative opacity-0 translate-y-[30px] transition-all duration-700 ease-out">
                                <div className="w-[42px] h-[42px] bg-[var(--navy-deep)] border-[2px] border-[var(--blue-electric)] rounded-full grid place-items-center font-bold text-[var(--blue-electric)] z-[2] shrink-0 shadow-[0_0_0_4px_var(--navy-deep)]">
                                    {step.id}
                                </div>
                                <div className="ml-6 bg-[var(--background)] border border-[var(--glass-border)] p-6 rounded-[var(--radius-md)] grow shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-[var(--foreground)] font-bold text-lg">{step.title[language]}</h3>
                                        {price > 0 && (
                                            <span className="text-sm font-bold text-[var(--blue-electric)] bg-[var(--navy-brand)]/5 border border-[var(--blue-electric)]/20 px-2 py-0.5 rounded">
                                                ${price}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[var(--text-gray)] text-sm md:text-base">{step.short_desc[language]}</p>
                                </div>
                            </div>
                        )
                    })}

                    {/* Future/Dotted Step decoration */}
                    <div className="step-reveal flex mb-[50px] relative opacity-0 translate-y-[30px] transition-all duration-700 ease-out">
                        <div className="w-[42px] h-[42px] bg-[var(--navy-deep)] border-[2px] border-[var(--blue-electric)] rounded-full grid place-items-center font-bold text-[var(--blue-electric)] z-[2] shrink-0 shadow-[0_0_0_4px_var(--navy-deep)]">
                            ...
                        </div>
                        <div className="ml-6 bg-[var(--background)] border border-dashed border-[var(--glass-border)] p-6 rounded-[var(--radius-md)] grow">
                            <h3 className="text-[var(--foreground)] mb-2 font-bold text-lg opacity-80">{language === 'es' ? "Crecimiento Continuo" : "Continuous Growth"}</h3>
                            <p className="text-[var(--text-gray)] text-sm md:text-base">{language === 'es' ? "Escala tu negocio sin límites." : "Scale your business without limits."}</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
