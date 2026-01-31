"use client";

import { CheckCircle, Lock, PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
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
        <main className="min-h-screen bg-[var(--navy-deep)] text-white">
            {/* Top Bar */}
            <header className="h-[80px] border-b border-[var(--glass-border)] flex items-center bg-[rgba(5,5,17,0.8)] backdrop-blur-md px-8 sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl mr-auto">
                    <div className="w-8 h-8 bg-[var(--blue-electric)] rounded-md flex items-center justify-center text-sm">B</div>
                    BizPro
                </Link>
                <div className="flex items-center gap-4">
                    <div className="hidden md:block text-right">
                        <div className="text-sm font-bold">{userName}</div>
                        <div className="text-xs text-[var(--text-gray)]">{displayBusinessName}</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[var(--navy-light)] border border-[var(--glass-border)] flex items-center justify-center font-bold">
                        {userName.charAt(0)}
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto p-8">

                {/* Welcome / Status */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold mb-2">
                        {language === 'es' ? "Tu Progreso" : "Your Progress"}
                    </h1>
                    <p className="text-[var(--text-gray)]">
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
                                className={`relative border rounded-2xl p-6 transition-all ${isActive
                                    ? "bg-[var(--glass-bg)] border-[var(--blue-electric)] shadow-[0_0_30px_rgba(59,130,246,0.1)] cursor-pointer"
                                    : isUnlocked
                                        ? "bg-[rgba(255,255,255,0.03)] border-[var(--glass-border)] cursor-pointer hover:bg-white/5"
                                        : "bg-black/20 border-white/5 opacity-60 cursor-not-allowed"
                                    }`}
                                onClick={() => handleStepClick(stepId)}
                            >
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                                    {/* Status Icon */}
                                    <div className="shrink-0">
                                        {isCompleted ? (
                                            <div className="w-12 h-12 rounded-full bg-[rgba(16,185,129,0.1)] border border-[var(--success)] flex items-center justify-center text-[var(--success)]">
                                                <CheckCircle className="w-6 h-6" />
                                            </div>
                                        ) : isActive ? (
                                            <div className="w-12 h-12 rounded-full bg-[var(--blue-electric)] text-white flex items-center justify-center shadow-lg animate-pulse">
                                                <PlayCircle className="w-6 h-6" />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--text-gray)]">
                                                <Lock className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="grow">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--blue-glow)]">
                                                {language === 'es' ? "Paso" : "Step"} {stepId}
                                            </span>
                                            {isActive && <span className="bg-[var(--blue-electric)] text-[10px] px-2 py-0.5 rounded text-white font-bold">{language === 'es' ? "ACTIVO" : "ACTIVE"}</span>}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">{stepContent.title[language]}</h3>
                                        <p className="text-[var(--text-gray)] text-sm max-w-2xl">
                                            {stepContent.short_desc[language]}
                                        </p>
                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                                        {isActive ? (
                                            <button className="flex items-center justify-center w-full md:w-auto gap-2 px-6 py-3 rounded-xl bg-[var(--blue-electric)] text-white font-bold shadow-lg hover:bg-[#2563EB] transition-all">
                                                {language === 'es' ? "Continuar" : "Continue"} <ArrowRight className="w-4 h-4" />
                                            </button>
                                        ) : isUnlocked ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <button className="px-6 py-3 rounded-xl border border-[var(--glass-border)] text-white hover:bg-white/5 transition-all text-sm">
                                                    {language === 'es' ? "Ver Detalles" : "View Details"}
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2">
                                                {price > 0 && <span className="text-lg font-bold">${price}</span>}
                                                <button disabled className="px-4 py-2 rounded-lg bg-white/5 text-[var(--text-gray)] text-sm cursor-not-allowed border border-white/5">
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
