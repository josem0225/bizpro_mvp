"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function AdminPage() {
    // Use data instead of appData, following the new context structure
    const { data, updatePrice, updateStepStatus, updatePaywallTemplate } = useBizPro();
    const [feedback, setFeedback] = useState("");

    // Local state for paywall templates to allow editing before saving (or direct live editing)
    // For simulation, we can edit directly or use local state. Let's use direct for simplicity in inputs, but we'll show a "Save" button effect.

    const handlePriceChange = (id: number, val: string) => {
        const num = parseInt(val);
        if (!isNaN(num)) {
            updatePrice(id, num);
        }
    };

    const handleTemplateChange = (lang: 'es' | 'en', val: string) => {
        updatePaywallTemplate(lang, val);
    };

    const handleSave = () => {
        setFeedback("Cambios guardados correctamente");
        setTimeout(() => setFeedback(""), 2000);
        // In a real app, this would make an API call. 
        // In this simulation, the context state is already updated in memory, 
        // but we show the feedback to satisfy the requirement "Agrega un botón 'Guardar Cambios'".
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans text-slate-800">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">{data.content.ui.admin.title.es}</h1>
                    <Link href="/" className="flex items-center gap-2 text-blue-600 hover:underline">
                        <ArrowLeft className="w-4 h-4" /> Volver a Landing
                    </Link>
                </div>

                <p className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                    <strong>Modo Demo:</strong> Cambia los precios y templates aquí. Los cambios son instantáneos en la memoria del navegador.
                </p>

                <div className="grid gap-8">

                    {/* Price Management */}
                    <div>
                        <h2 className="text-xl font-bold border-b pb-2 mb-4">Gestión de Precios por Paso</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Iterate over steps. Convert object to array for mapping */}
                            {Object.values(data.content.stepsDetail).map((step: any) => {
                                const price = data.pricing.steps[step.id]?.price || 0;
                                return (
                                    <div key={step.id} className="border p-4 rounded-lg flex justify-between items-center bg-gray-50">
                                        <div>
                                            <div className="font-bold flex items-center gap-2">
                                                Paso {step.id}: {step.title.es}
                                                <span className={`text-[10px] px-2 py-0.5 rounded uppercase ${data.pricing.steps[step.id]?.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                                                    {data.pricing.steps[step.id]?.status}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">{step.title.en}</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {/* Status Toggle */}
                                            <label className="flex items-center gap-2 text-xs font-bold cursor-pointer select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={data.pricing.steps[step.id]?.status === 'active'}
                                                    onChange={(e) => updateStepStatus(step.id, e.target.checked ? 'active' : 'dormant')}
                                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                                />
                                                Activo
                                            </label>

                                            {/* Price Input */}
                                            <div className="flex items-center gap-1">
                                                <span className="font-bold text-gray-400">$</span>
                                                <input
                                                    type="number"
                                                    className="border rounded px-2 py-1 w-20 text-right font-bold"
                                                    value={price}
                                                    onChange={(e) => handlePriceChange(step.id, e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Paywall Templates */}
                    <div>
                        <h2 className="text-xl font-bold border-b pb-2 mb-4">Templates de Paywall</h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-bold mb-1 text-gray-600">Español (ES)</label>
                                <textarea
                                    className="w-full border rounded-lg p-3 text-sm font-mono bg-gray-50 h-24"
                                    value={data.pricing.paywallTemplates.es}
                                    onChange={(e) => handleTemplateChange('es', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1 text-gray-600">Inglés (EN)</label>
                                <textarea
                                    className="w-full border rounded-lg p-3 text-sm font-mono bg-gray-50 h-24"
                                    value={data.pricing.paywallTemplates.en}
                                    onChange={(e) => handleTemplateChange('en', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-4 border-t">
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition active:scale-95 flex items-center gap-2"
                        >
                            <Save className="w-5 h-5" />
                            {data.content.ui.admin.save.es}
                        </button>
                    </div>

                </div>

                {feedback && (
                    <div className="fixed bottom-8 right-8 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom font-bold flex items-center gap-2 z-50">
                        <CheckCircle className="w-5 h-5" /> {feedback}
                    </div>
                )}

            </div>
        </div>
    );
}

// Icons
import { CheckCircle } from "lucide-react"; // Import missing icon
