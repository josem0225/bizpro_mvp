"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { ArrowLeft, CheckCircle, Download, ExternalLink, FileText, Lock } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function StepDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { language, data, setActiveStep } = useBizPro();
    const idParam = params.id;

    // Parse step ID
    const stepId = typeof idParam === 'string' ? parseInt(idParam, 10) : 0;

    // Get Step Data
    const stepData = data.content.stepsDetail.find(s => s.id === stepId);
    if (!stepData) {
        return (
            <div className="min-h-screen bg-[var(--navy-deep)] text-white flex items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Paso no encontrado / Step not found</h1>
                    <Link href="/dashboard" className="text-[var(--blue-glow)] hover:underline">
                        Volver al Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const price = data.pricing.steps[stepId]?.price || 0;
    const isUnlocked = data.user.progress.unlockedSteps.includes(stepId);

    // Mock completing items
    const [checkedItems, setCheckedItems] = useState<string[]>([]);

    const toggleCheck = (itemId: string) => {
        setCheckedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(i => i !== itemId)
                : [...prev, itemId]
        );
    };

    const progress = Math.round((checkedItems.length / (stepData.checklist.length || 1)) * 100);

    return (
        <main className="min-h-screen bg-[#050511] text-white flex flex-col md:flex-row">

            {/* Sidebar (Simple navigation) */}
            <aside className="w-full md:w-64 bg-black/20 border-r border-white/10 flex-shrink-0 p-6 hidden md:block">
                <Link href="/dashboard" className="flex items-center gap-2 text-sm text-[var(--text-gray)] hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4" /> {language === 'es' ? "Volver" : "Back"}
                </Link>
                <div className="space-y-2">
                    {data.content.stepsDetail.map(s => (
                        <div key={s.id} className={`p-3 rounded-lg text-sm ${s.id === stepId ? 'bg-[var(--blue-electric)] text-white font-bold' : 'text-[var(--text-gray)] hover:bg-white/5'}`}>
                            {language === 'es' ? "Paso" : "Step"} {s.id}: {s.title[language]}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto h-screen">
                {/* Mobile Back Header */}
                <div className="md:hidden p-4 border-b border-white/10 bg-black/20 flex items-center sticky top-0 backdrop-blur-md z-10">
                    <Link href="/dashboard" className="flex items-center gap-2 text-sm text-[var(--text-gray)]">
                        <ArrowLeft className="w-4 h-4" /> Dashboard
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto p-6 md:p-10">

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-[var(--blue-glow)]">
                                {language === 'es' ? "Paso" : "Step"} {stepId}
                            </span>
                            {!isUnlocked && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded flex gap-1 items-center"><Lock className="w-3 h-3" /> Locked</span>}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{stepData.title[language]}</h1>
                        <p className="text-xl text-[var(--text-gray)]">{stepData.short_desc[language]}</p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left: Content & Education */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Education HTML Content */}
                            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-8 prose prose-invert max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: stepData.education_html[language] }} />
                            </div>

                            {/* Checklist */}
                            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                                    {language === 'es' ? "Tu Lista de Tareas" : "Your Checklist"}
                                </h3>
                                <div className="space-y-4">
                                    {stepData.checklist.map((item) => (
                                        <label key={item.id} className="flex items-start gap-3 cursor-pointer group hover:bg-white/5 p-3 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/30 bg-transparent checked:border-[var(--success)] checked:bg-[var(--success)] transition-all"
                                                    checked={checkedItems.includes(item.id)}
                                                    onChange={() => toggleCheck(item.id)}
                                                />
                                                <CheckCircle className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white w-3.5 h-3.5 left-[3px] top-[3px]" />
                                            </div>
                                            <span className={`text-sm md:text-base ${checkedItems.includes(item.id) ? 'text-[var(--text-gray)] line-through' : 'text-white'}`}>
                                                {item.text[language]}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/10">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-[var(--text-gray)]">Progreso</span>
                                        <span className="font-bold">{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                        <div className="h-full bg-[var(--success)] transition-all duration-500" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right: Resources & Tools */}
                        <div className="space-y-6">

                            {/* Downloads */}
                            {stepData.downloads && stepData.downloads.length > 0 && (
                                <div className="bg-[#0f0f2d] border border-[var(--glass-border)] rounded-xl p-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-gray)] mb-4">
                                        {language === 'es' ? "Descargas" : "Downloads"}
                                    </h4>
                                    <div className="space-y-3">
                                        {stepData.downloads.map((dl, idx) => (
                                            <a key={idx} href={dl.url} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                                                <div className="w-10 h-10 bg-[var(--navy-deep)] rounded flex items-center justify-center text-[var(--blue-glow)] group-hover:scale-110 transition-transform">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <div className="text-sm font-medium truncate">{dl.name[language]}</div>
                                                    <div className="text-xs text-[var(--text-gray)]">PDF • 2.4 MB</div>
                                                </div>
                                                <Download className="w-4 h-4 ml-auto text-[var(--text-gray)]" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* External Resources */}
                            {stepData.resources && stepData.resources.length > 0 && (
                                <div className="bg-[#0f0f2d] border border-[var(--glass-border)] rounded-xl p-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-gray)] mb-4">
                                        {language === 'es' ? "Herramientas Oficiales" : "Official Tools"}
                                    </h4>
                                    <div className="space-y-3">
                                        {stepData.resources.map((res, idx) => (
                                            <a key={idx} href={res.url} target="_blank" className="flex items-center gap-2 text-sm text-[var(--blue-glow)] hover:underline">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                {res.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Referrals/Pros */}
                            {stepData.referrals && stepData.referrals.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--text-gray)]">
                                        {language === 'es' ? "Expertos Recomendados" : "Recommended Experts"}
                                    </h4>

                                    {stepData.referrals.map((ref, idx) => (
                                        <div key={idx} className="bg-[#0f0f2d] border border-[var(--glass-border)] rounded-xl p-4 flex gap-4 transition-all hover:border-[var(--gold)] group relative overflow-hidden">
                                            {/* Gold shine effect */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(234,179,8,0.1)] to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>

                                            {/* Avatar Mock */}
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--navy-brand)] shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-[#0f0f2d]">
                                                {ref.name.charAt(0)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h5 className="font-bold text-white truncate pr-2">{ref.name}</h5>
                                                    <div className="flex text-[var(--gold)] text-[10px]">
                                                        {'★'.repeat(5)}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-[var(--blue-glow)] font-medium mb-1">{ref.specialty[language]}</p>
                                                <p className="text-xs text-[var(--text-gray)] flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                    {ref.location}
                                                </p>
                                            </div>

                                            <button className="self-center bg-[var(--white)] text-[var(--navy-deep)] text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
                                                Contactar
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
