"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { useState } from "react";
import {
    Save, ArrowLeft, Plus, FileText, Trash2, GripVertical,
    Type, List, AlignLeft, Download, Upload, Edit
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function BuilderEditorPage() {
    const params = useParams();
    const router = useRouter(); // Import useRouter
    const { data, updateVertical } = useBizPro();

    // In a real app, these would come from the context/DB based on params.id
    // For MVP, we default to the first one if ID matches, or mock it.
    const verticalId = params.id;
    const initialData = data.admin?.builder?.verticals.find(v => v.id === verticalId) || data.admin?.builder?.verticals[0];

    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [vertical, setVertical] = useState(initialData);

    if (!vertical) return <div className="text-white">Vertical no encontrada.</div>;

    const handleSave = () => {
        updateVertical(vertical);
        alert("Cambios guardados en memoria exitosamente.");
    };

    const activeStep = vertical.steps[activeStepIndex];

    const handleUpdateActiveStep = (field: string, value: any) => {
        const newSteps = [...vertical.steps];
        newSteps[activeStepIndex] = { ...newSteps[activeStepIndex], [field]: value };
        setVertical({ ...vertical, steps: newSteps });
    };

    const handleAddField = (type: 'text' | 'textarea' | 'select') => {
        const newField = {
            id: `f_${Date.now()}`,
            type,
            label: "Nueva Pregunta",
            options: type === 'select' ? ["Opción 1", "Opción 2"] : undefined
        };
        const newFields = [...(activeStep.formFields || []), newField];
        handleUpdateActiveStep('formFields', newFields);
    };

    const handleDeleteField = (fieldId: string) => {
        const newFields = activeStep.formFields?.filter(f => f.id !== fieldId) || [];
        handleUpdateActiveStep('formFields', newFields);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-4">
                    <Link href="/admin/builder" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white">{vertical.name}</h1>
                            <span className="px-2 py-0.5 rounded-full bg-[var(--blue-electric)]/20 text-[var(--blue-electric)] text-xs border border-[var(--blue-electric)]/30">
                                {vertical.status}
                            </span>
                        </div>
                        <p className="text-sm text-[var(--text-gray)]">Editando flujo de trabajo</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-[var(--success)] text-white rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_4px_15px_rgba(34,197,94,0.4)]"
                >
                    <Save className="w-5 h-5" />
                    Guardar Cambios
                </button>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex gap-6 min-h-0">

                {/* LEFT: Steps Outline */}
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-4 flex-1 overflow-y-auto">
                        <h3 className="text-sm font-bold text-[var(--text-gray)] uppercase tracking-wider mb-4 px-2">
                            Secuencia de Pasos
                        </h3>

                        <div className="space-y-2">
                            {vertical.steps.map((step, idx) => (
                                <div
                                    key={step.id}
                                    onClick={() => setActiveStepIndex(idx)}
                                    className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${idx === activeStepIndex
                                        ? "bg-[var(--blue-electric)]/20 border-[var(--blue-electric)] text-white"
                                        : "bg-transparent border-transparent hover:bg-white/5 text-[var(--text-gray)] hover:text-white"
                                        }`}
                                >
                                    <GripVertical className="w-4 h-4 opacity-50 cursor-grab" />
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === activeStepIndex ? "bg-[var(--blue-electric)] text-white" : "bg-white/10"
                                        }`}>
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">{step.title}</div>
                                        <div className="text-xs opacity-70 flex justify-between">
                                            <span>{step.price === 0 ? "Gratis" : `$${step.price}`}</span>
                                            <span>{Array.isArray(step.formFields) ? step.formFields.length : 0} inputs</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-3 border-2 border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 rounded-xl text-[var(--text-gray)] font-medium transition-all flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            Agregar Paso
                        </button>
                    </div>
                </div>

                {/* RIGHT: Detail Editor */}
                <div className="w-2/3 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6 overflow-y-auto">
                    {activeStep ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                            {/* Basics */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Edit className="w-5 h-5 text-[var(--blue-glow)]" />
                                    Configuración Básica
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-[var(--text-gray)] mb-1">Título del Paso</label>
                                        <input
                                            type="text"
                                            value={activeStep.title}
                                            onChange={(e) => handleUpdateActiveStep('title', e.target.value)}
                                            className="w-full bg-black/20 border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white focus:border-[var(--blue-electric)] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-[var(--text-gray)] mb-1">Precio ($)</label>
                                        <input
                                            type="number"
                                            value={activeStep.price}
                                            onChange={(e) => handleUpdateActiveStep('price', Number(e.target.value))}
                                            className="w-full bg-black/20 border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white focus:border-[var(--blue-electric)] outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-[var(--text-gray)] mb-1">Descripción Educativa</label>
                                    <textarea
                                        value={activeStep.description}
                                        onChange={(e) => handleUpdateActiveStep('description', e.target.value)}
                                        rows={3}
                                        className="w-full bg-black/20 border border-[var(--glass-border)] rounded-lg px-4 py-2 text-white focus:border-[var(--blue-electric)] outline-none resize-none"
                                    />
                                </div>
                            </div>

                            <hr className="border-white/10" />

                            {/* Dynamic Form Builder */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <List className="w-5 h-5 text-[var(--gold)]" />
                                        Formulario de Entrada
                                    </h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAddField('text')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white flex items-center gap-1 transition-colors">
                                            <Type className="w-3 h-3" /> Texto
                                        </button>
                                        <button onClick={() => handleAddField('textarea')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white flex items-center gap-1 transition-colors">
                                            <AlignLeft className="w-3 h-3" /> Area
                                        </button>
                                        <button onClick={() => handleAddField('select')} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-medium text-white flex items-center gap-1 transition-colors">
                                            <List className="w-3 h-3" /> Dropdown
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 bg-black/20 rounded-xl p-4 min-h-[100px]">
                                    {(!activeStep.formFields || activeStep.formFields.length === 0) && (
                                        <div className="text-center text-[var(--text-gray)] text-sm py-4 italic">
                                            No hay campos configurados para este paso.
                                        </div>
                                    )}
                                    {activeStep.formFields?.map((field: any, idx: number) => (
                                        <div key={field.id} className="flex gap-3 items-start bg-[var(--glass-bg)] p-3 rounded-lg border border-[var(--glass-border)]">
                                            <div className="mt-2 text-[var(--text-gray)]">
                                                {field.type === 'text' && <Type className="w-4 h-4" />}
                                                {field.type === 'textarea' && <AlignLeft className="w-4 h-4" />}
                                                {field.type === 'select' && <List className="w-4 h-4" />}
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={field.label}
                                                    onChange={(e) => {
                                                        const newFields = [...(activeStep.formFields || [])];
                                                        newFields[idx].label = e.target.value;
                                                        handleUpdateActiveStep('formFields', newFields);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-white font-medium focus:ring-0 placeholder-white/30"
                                                    placeholder="Pregunta o Etiqueta del Campo"
                                                />
                                                {field.type === 'select' && (
                                                    <input
                                                        type="text"
                                                        value={field.options?.join(', ')}
                                                        onChange={(e) => {
                                                            const newFields = [...(activeStep.formFields || [])];
                                                            newFields[idx].options = e.target.value.split(',').map(s => s.trim());
                                                            handleUpdateActiveStep('formFields', newFields);
                                                        }}
                                                        className="w-full text-xs bg-white/5 rounded px-2 py-1 text-[var(--text-gray)] border-none focus:ring-0"
                                                        placeholder="Opciones separadas por coma (ej. Opción A, Opción B)"
                                                    />
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteField(field.id)}
                                                className="p-1.5 hover:bg-red-500/10 text-[var(--text-gray)] hover:text-red-500 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-white/10" />

                            {/* Files Library */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Download className="w-5 h-5 text-purple-400" />
                                        Biblioteca de Archivos
                                    </h3>
                                    <button className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors">
                                        <Upload className="w-3 h-3" /> Subir PDF
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {(!activeStep.files || activeStep.files.length === 0) ? (
                                        <div className="text-center text-[var(--text-gray)] text-sm py-4 italic border border-dashed border-white/10 rounded-xl">
                                            No hay archivos adjuntos para que el usuario descargue.
                                        </div>
                                    ) : (
                                        activeStep.files.map((file: any, index: number) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-[var(--glass-border)]">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="w-4 h-4 text-purple-400" />
                                                    <span className="text-sm text-white">{file.name}</span>
                                                </div>
                                                <button className="text-red-500 hover:text-red-400 text-xs">Eliminar</button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-[var(--text-gray)]">
                            <Plus className="w-12 h-12 mb-4 opacity-50" />
                            <p>Selecciona un paso para editar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
