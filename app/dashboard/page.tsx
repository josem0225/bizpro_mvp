"use client";

import { CheckCircle, Lock, PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBizPro } from "@/app/context/BizProContext";

export default function DashboardPage() {

    const { language, data, setActiveStep } = useBizPro();
    const router = useRouter();

    const steps = data.pricing.steps;
    const contentSteps = data.content.stepsDetail;
    const user = data.user;

    // Use user progress from data
    const completedSteps = user.progress.completedSteps;
    const unlockedSteps = user.progress.unlockedSteps;

    // Find current active step from unlocked ones (last one) or 0
    const currentStepId = unlockedSteps.length > 0 ? unlockedSteps[unlockedSteps.length - 1] : 0;

    // Fallback name
    const userName = user.name || "Emprendedor";
    const displayBusinessName = user.businessName || (language === 'es' ? "Tu Negocio" : "Your Business");

    const handleStepClick = (stepId: number) => {
        // Only allow click if unlocked
        if (unlockedSteps.includes(stepId)) {
            setActiveStep(stepId);
            router.push(`/dashboard/step/${stepId}`);
        }
    };

    return (
        <main className="min-h-screen bg-white text-[var(--foreground)] font-sans relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 z-0 pointer-events-none"></div>

            {/* Top Bar */}
            <header className="h-[80px] border-b border-slate-200 flex items-center bg-white/80 backdrop-blur-md px-8 sticky top-0 z-50 relative text-[var(--foreground)]">
                <Link href="/" className="flex items-center gap-3 mr-auto">
                    <Image
                        src="/logos/bizpro-logo-navy.svg"
                        alt="BizPro"
                        width={40}
                        height={40}
                        className="w-10 h-10"
                    />
                    <span className="font-bold text-xl text-[var(--navy-brand)]">BizPro</span>
                </Link>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-bold text-[var(--navy-brand)]">{userName}</div>
                        <div className="text-xs text-slate-500">{displayBusinessName}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-[var(--navy-brand)]">
                        {userName.charAt(0)}
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto p-8 relative z-10">

                {/* Welcome / Status */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold mb-2 text-[var(--navy-brand)]">
                        {language === 'es' ? "Tu Progreso" : "Your Progress"}
                    </h1>
                    <p className="text-slate-600 text-lg">
                        {language === 'es'
                            ? `Continúa trabajando en ${displayBusinessName}.`
                            : `Continue working on ${displayBusinessName}.`}
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="grid gap-6">
                    {contentSteps.map((stepContent) => {
                        const stepId = stepContent.id;
                        const isCompleted = completedSteps.includes(stepId);
                        const isUnlocked = unlockedSteps.includes(stepId);
                        const isActive = stepId === currentStepId;
                        const price = steps[stepId]?.price || 0;

                        return (
                            <div
                                key={stepId}
                                className={`relative border rounded-2xl p-6 transition-all duration-300 ${isActive
                                    ? "bg-white border-[var(--navy-brand)] shadow-lg ring-1 ring-[var(--navy-brand)]/10 cursor-pointer scale-[1.01]"
                                    : isUnlocked
                                        ? "bg-white border-slate-200 cursor-pointer hover:border-[var(--navy-brand)] hover:shadow-md"
                                        : "bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed grayscale-[0.5]"
                                    }`}
                                onClick={() => handleStepClick(stepId)}
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                                    {/* Status Icon */}
                                    <div className="shrink-0">
                                        {isCompleted ? (
                                            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                                                <CheckCircle className="w-6 h-6" />
                                            </div>
                                        ) : isActive ? (
                                            <div className="w-12 h-12 rounded-full bg-[var(--navy-brand)] text-white flex items-center justify-center shadow-lg animate-pulse ring-4 ring-[var(--navy-brand)]/10">
                                                <PlayCircle className="w-6 h-6" />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="grow">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                                {language === 'es' ? "Paso" : "Step"} {stepId}
                                            </span>
                                            {isActive && <span className="bg-[var(--navy-brand)] text-[10px] px-2 py-0.5 rounded text-white font-bold">{language === 'es' ? "ACTIVO" : "ACTIVE"}</span>}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-[var(--foreground)]">{stepContent.title[language]}</h3>
                                        <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
                                            {stepContent.short_desc[language]}
                                        </p>
                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                                        {isActive ? (
                                            <button className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 rounded-xl bg-[var(--navy-brand)] text-white font-bold shadow-lg hover:bg-slate-900 transition-all hover:-translate-y-0.5">
                                                {language === 'es' ? "Continuar" : "Continue"} <ArrowRight className="w-4 h-4" />
                                            </button>
                                        ) : isUnlocked ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <button className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all text-sm font-semibold">
                                                    {language === 'es' ? "Ver Detalles" : "View Details"}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                {price > 0 && <span className="text-lg font-bold text-slate-400">${price}</span>}
                                                <button disabled className="px-4 py-2 rounded-lg bg-slate-100 text-slate-400 text-sm cursor-not-allowed border border-slate-200 font-medium">
                                                    {language === 'es' ? "Bloqueado" : "Locked"}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </main>
    );
}
