"use client";

import React from 'react';
import { Rocket, Eye, EyeOff, Lock } from 'lucide-react';
import { useBizPro } from '@/app/context/BizProContext';

export default function StepActivationPreview() {
    const { language } = useBizPro();

    const text = {
        es: {
            title: "Gestor de Activación de Pasos",
            description: "Controla qué pasos son visibles para los clientes. Activar un paso lo hace disponible instantáneamente en el Portal.",
            table: {
                step: "Nombre del Paso",
                status: "Estado",
                visibility: "Control de Visibilidad",
                ready: "Contenido listo en Airtable",
                live: "EN VIVO",
                dormant: "INACTIVO",
                on: "ON",
                off: "OFF"
            },
            tip: {
                title: "Pro Tip:",
                content: "Activar los Pasos 6-12 habilita el contenido de la 'Fase 2' automáticamente. No requiere desarrollador."
            }
        },
        en: {
            title: "Step Activation Manager",
            description: "Control which steps are visible to customers. Activating a step instantly makes it available in the Portal.",
            table: {
                step: "Step Name",
                status: "Status",
                visibility: "Visibility Control",
                ready: "Content ready in Airtable",
                live: "LIVE",
                dormant: "DORMANT",
                on: "ON",
                off: "OFF"
            },
            tip: {
                title: "Pro Tip:",
                content: "Activating Steps 6-12 enables the \"Phase 2\" content automatically. No developer required."
            }
        }
    };

    const t = language === 'es' ? text.es : text.en;

    // FAKE DATA showing "Active" vs "Dormant"
    const allSteps = [
        { id: 0, name: "Step 0: Initial Orientation", active: true, status: "Live" },
        { id: 1, name: "Step 1: Business Identity", active: true, status: "Live" },
        { id: 2, name: "Step 2: Key Documents", active: true, status: "Live" },
        { id: 3, name: "Step 3: Operational Setup", active: true, status: "Live" },
        { id: 4, name: "Step 4: Business Plan", active: false, status: "Dormant" },
        { id: 5, name: "Step 5: Funding Readiness", active: false, status: "Dormant" },
        { id: 6, name: "Step 6: Ongoing Coordination", active: false, status: "Dormant" },
    ];

    return (
        <div className="p-8 bg-slate-50 min-h-screen max-w-4xl mx-auto font-sans">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <Rocket className="text-purple-600" /> {t.title}
                </h1>
                <p className="text-slate-500 mt-2">
                    {t.description}
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                            <th className="px-6 py-4 font-semibold">{t.table.step}</th>
                            <th className="px-6 py-4 font-semibold">{t.table.status}</th>
                            <th className="px-6 py-4 font-semibold text-right">{t.table.visibility}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {allSteps.map((step) => (
                            <tr key={step.id} className={`group hover:bg-slate-50 transition-colors ${!step.active ? 'bg-slate-50/50' : ''}`}>
                                <td className="px-6 py-5">
                                    <div className={`font-semibold ${step.active ? 'text-slate-800' : 'text-slate-400'}`}>
                                        {step.name}
                                    </div>
                                    {!step.active && <span className="text-xs text-slate-400">{t.table.ready}</span>}
                                </td>
                                <td className="px-6 py-5">
                                    {step.active ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> {t.table.live}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-500">
                                            <Lock size={10} /> {t.table.dormant}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-5 text-right">
                                    {/* TOGGLE UI */}
                                    <label className="inline-flex items-center cursor-pointer relative group-hover:scale-105 transition-transform">
                                        <input type="checkbox" className="sr-only peer" checked={step.active} readOnly />
                                        <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
                                        <span className="ml-3 text-sm font-medium text-slate-600 w-16 text-left">
                                            {step.active ? t.table.on : t.table.off}
                                        </span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm flex items-start gap-3">
                <Rocket className="shrink-0 mt-0.5 w-4 h-4" />
                <p><strong>{t.tip.title}</strong> {t.tip.content}</p>
            </div>

        </div>
    );
}
