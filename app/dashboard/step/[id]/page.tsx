"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { ArrowLeft, CheckCircle, Download, ExternalLink, FileText, Lock, Eye } from "lucide-react";
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
        <main className="min-h-screen bg-white text-[var(--foreground)] flex flex-col md:flex-row font-sans relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 z-0 pointer-events-none"></div>

            {/* Sidebar (Simple navigation) */}
            <aside className="w-full md:w-64 bg-slate-50 border-r border-slate-200 flex-shrink-0 p-6 hidden md:block relative z-10">
                <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-500 hover:text-[var(--navy-brand)] mb-8 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" /> {language === 'es' ? "Volver" : "Back"}
                </Link>
                <div className="space-y-2">
                    {data.content.stepsDetail.map(s => (
                        <div key={s.id} className={`p-3 rounded-lg text-sm transition-all ${s.id === stepId
                            ? 'bg-[var(--navy-brand)] text-white font-bold shadow-md'
                            : 'text-slate-600 hover:bg-white hover:shadow-sm cursor-pointer'}`}>
                            {language === 'es' ? "Paso" : "Step"} {s.id}: {s.title[language]}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto h-screen relative z-10">
                {/* Mobile Back Header */}
                <div className="md:hidden p-4 border-b border-slate-200 bg-white/80 flex items-center sticky top-0 backdrop-blur-md z-20">
                    <Link href="/dashboard" className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <ArrowLeft className="w-4 h-4" /> Dashboard
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto p-6 md:p-10">

                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {language === 'es' ? "Paso" : "Step"} {stepId}
                            </span>
                            {!isUnlocked && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded flex gap-1 items-center border border-slate-200"><Lock className="w-3 h-3" /> Locked</span>}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--navy-brand)]">{stepData.title[language]}</h1>
                        <p className="text-xl text-slate-600">{stepData.short_desc[language]}</p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left: Content & Education */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Education HTML Content */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 prose prose-slate max-w-none shadow-sm">
                                <div dangerouslySetInnerHTML={{ __html: stepData.education_html[language] }} />
                            </div>

                            {/* Checklist */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-[var(--navy-brand)]">
                                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                                    {language === 'es' ? "Tu Lista de Tareas" : "Your Checklist"}
                                </h3>
                                <div className="space-y-4">
                                    {stepData.checklist.map((item) => (
                                        <label key={item.id} className="flex items-start gap-3 cursor-pointer group hover:bg-slate-50 p-3 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white checked:border-emerald-500 checked:bg-emerald-500 transition-all focus:ring-2 focus:ring-emerald-500/20"
                                                    checked={checkedItems.includes(item.id)}
                                                    onChange={() => toggleCheck(item.id)}
                                                />
                                                <CheckCircle className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white w-3.5 h-3.5 left-[3px] top-[3px]" />
                                            </div>
                                            <span className={`text-sm md:text-base ${checkedItems.includes(item.id) ? 'text-slate-400 line-through' : 'text-slate-700 font-medium'}`}>
                                                {item.text[language]}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-100">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-500">Progreso</span>
                                        <span className="font-bold text-[var(--navy-brand)]">{progress}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Right: Resources & Tools */}
                        <div className="space-y-6">

                            {/* Downloads */}
                            {/* Downloads & Resources Logic */}
                            {stepId === 5 ? (
                                /* STEP 5 SPECIAL LAYOUT: PROJECTIONHUB */
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                                        Recursos Financieros (Dual View)
                                    </h4>
                                    <div className="grid grid-cols-1 gap-4">
                                        {/* 1. Download Excel (English) */}
                                        <a href="/assets/projectionhub_workbook.xlsx" download className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md transition-all group">
                                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center shrink-0">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-slate-700 group-hover:text-emerald-700">Download Workbook (XLSX)</div>
                                                <div className="text-xs text-slate-400">English • Official ProjectionHub Template</div>
                                            </div>
                                            <Download className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />
                                        </a>

                                        {/* 2. Preview Guide (Spanish) */}
                                        <a href="/assets/financial_guide_es.pdf" target="_blank" className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-[var(--navy-brand)] hover:shadow-md transition-all group">
                                            <div className="w-12 h-12 bg-blue-50 text-[var(--navy-brand)] rounded-lg flex items-center justify-center shrink-0">
                                                <Eye className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-slate-700 group-hover:text-[var(--navy-brand)]">Leer Guía de Proyección (PDF)</div>
                                                <div className="text-xs text-slate-400">Español • Instrucciones paso a paso</div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-[var(--navy-brand)]" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                /* STANDARD LAYOUT */
                                stepData.downloads && stepData.downloads.length > 0 && (
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                                        <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                                            {language === 'es' ? "Descargas" : "Downloads"}
                                        </h4>
                                        <div className="space-y-3">
                                            {stepData.downloads.map((dl, idx) => {
                                                const isPdf = dl.url.endsWith('.pdf');
                                                return (
                                                    <a
                                                        key={idx}
                                                        href={dl.url}
                                                        target={isPdf ? "_blank" : "_self"}
                                                        download={!isPdf}
                                                        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-[var(--navy-brand)] hover:shadow-sm transition-all group"
                                                    >
                                                        <div className={`w-10 h-10 rounded flex items-center justify-center text-white group-hover:scale-105 transition-transform ${isPdf ? "bg-[var(--navy-brand)]" : "bg-emerald-600"}`}>
                                                            {isPdf ? <Eye className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                                        </div>
                                                        <div className="overflow-hidden flex-1">
                                                            <div className="text-sm font-bold text-slate-700 truncate group-hover:text-[var(--navy-brand)] transition-colors">{dl.name[language]}</div>
                                                            <div className="text-xs text-slate-400 uppercase">{isPdf ? "Vista Previa" : "Descargar"}</div>
                                                        </div>
                                                        {isPdf ? (
                                                            <ExternalLink className="w-4 h-4 ml-auto text-slate-400 group-hover:text-[var(--navy-brand)]" />
                                                        ) : (
                                                            <Download className="w-4 h-4 ml-auto text-slate-400 group-hover:text-emerald-600" />
                                                        )}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            )}

                            {/* External Resources */}
                            {stepData.resources && stepData.resources.length > 0 && (
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
                                        {language === 'es' ? "Herramientas Oficiales" : "Official Tools"}
                                    </h4>
                                    <div className="space-y-3">
                                        {stepData.resources.map((res, idx) => (
                                            <a key={idx} href={res.url} target="_blank" className="flex items-center gap-2 text-sm text-[var(--navy-brand)] font-semibold hover:underline bg-white p-3 rounded-lg border border-slate-200 hover:border-[var(--navy-brand)] transition-all">
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
                                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                                        {language === 'es' ? "Expertos Recomendados" : "Recommended Experts"}
                                    </h4>

                                    {stepData.referrals.map((ref, idx) => (
                                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4 transition-all hover:border-[var(--navy-brand)] hover:shadow-md group relative overflow-hidden">

                                            {/* Avatar Mock */}
                                            <div className="w-12 h-12 rounded-full bg-[var(--navy-brand)] shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                                {ref.name.charAt(0)}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <h5 className="font-bold text-[var(--foreground)] truncate pr-2 group-hover:text-[var(--navy-brand)] transition-colors">{ref.name}</h5>
                                                    <div className="flex text-amber-400 text-[10px]">
                                                        {'★'.repeat(5)}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-slate-500 font-medium mb-1">{ref.specialty[language]}</p>
                                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    {ref.location}
                                                </p>
                                            </div>

                                            <button className="self-center bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[var(--navy-brand)] hover:text-white transition-colors">
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
