"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { useState } from "react";
import {
    Save, ArrowLeft, Plus, FileText, Trash2, GripVertical,
    Type, List, AlignLeft, Download, Upload, Edit, Eye, ExternalLink
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ASSET_LIBRARY } from "@/app/lib/mock-assets";

export default function BuilderEditorPage() {
    const params = useParams();
    const router = useRouter(); // Import useRouter
    const { data, updateVertical } = useBizPro();

    // In a real app, these would come from the context/DB based on params.id
    // For MVP, we default to the first one if ID matches, or mock it.
    const [library, setLibrary] = useState(ASSET_LIBRARY);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [newFile, setNewFile] = useState<{ name: string, type: 'pdf' | 'xlsx' | 'docx' | 'image' }>({ name: '', type: 'pdf' });

    const verticalId = params.id;
    const initialData = data.admin?.builder?.verticals.find((v: any) => v.id === verticalId) || data.admin?.builder?.verticals[0];

    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [vertical, setVertical] = useState(initialData);

    const activeStep = vertical.steps[activeStepIndex];

    const handleUpdateActiveStep = (field: string, value: any) => {
        const newSteps = [...vertical.steps];
        newSteps[activeStepIndex] = { ...newSteps[activeStepIndex], [field]: value };
        setVertical({ ...vertical, steps: newSteps });
    };

    const handleQuickUpload = () => {
        const newAsset = {
            id: `custom_${Date.now()}`,
            name: newFile.name,
            type: newFile.type,
            url: `/assets/mock_${Date.now()}.${newFile.type}`
        };

        // 1. Add to local library
        setLibrary([...library, newAsset]);

        // 2. Add to current step
        const stepFile = {
            name: { es: newAsset.name, en: newAsset.name },
            url: newAsset.url
        };
        const newFiles = [...(activeStep.files || []), stepFile];
        handleUpdateActiveStep('files', newFiles);

        // 3. Reset and close
        setNewFile({ name: '', type: 'pdf' });
        setIsUploadModalOpen(false);
    };

    if (!vertical) return <div className="text-white">Vertical no encontrada.</div>;

    const handleSave = () => {
        updateVertical(vertical);
        alert("Cambios guardados en memoria exitosamente.");
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
        const newFields = activeStep.formFields?.filter((f: any) => f.id !== fieldId) || [];
        handleUpdateActiveStep('formFields', newFields);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <Link href="/admin/builder" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors shadow-sm">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-[var(--navy-brand)]">{vertical.name}</h1>
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs border border-blue-100 font-bold">
                                {vertical.status}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500">Editando flujo de trabajo</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                    <Save className="w-5 h-5" />
                    Guardar Cambios
                </button>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex gap-6 min-h-0">

                {/* LEFT: Steps Outline */}
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1 overflow-y-auto shadow-sm">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                            Secuencia de Pasos
                        </h3>

                        <div className="space-y-2">
                            {vertical.steps.map((step: any, idx: number) => (
                                <div
                                    key={step.id}
                                    onClick={() => setActiveStepIndex(idx)}
                                    className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${idx === activeStepIndex
                                        ? "bg-slate-50 border-slate-200 shadow-sm"
                                        : "bg-transparent border-transparent hover:bg-slate-50 hover:border-slate-100"
                                        }`}
                                >
                                    <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx === activeStepIndex ? "bg-[var(--navy-brand)] text-white" : "bg-slate-100 text-slate-500"
                                        }`}>
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className={`font-bold truncate ${idx === activeStepIndex ? "text-[var(--navy-brand)]" : "text-slate-600"}`}>
                                            {step.title}
                                        </div>
                                        <div className="text-xs text-slate-400 flex justify-between mt-0.5">
                                            <span>{step.price === 0 ? "Gratis" : `$${step.price}`}</span>
                                            <span>{Array.isArray(step.formFields) ? step.formFields.length : 0} inputs</span>
                                        </div>
                                    </div>
                                    {idx === activeStepIndex && <div className="w-1.5 h-1.5 rounded-full bg-[var(--navy-brand)]"></div>}
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 hover:border-[var(--navy-brand)] hover:bg-slate-50 rounded-xl text-slate-500 hover:text-[var(--navy-brand)] font-bold transition-all flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            Agregar Paso
                        </button>
                    </div>
                </div>

                {/* RIGHT: Detail Editor */}
                <div className="w-2/3 bg-white border border-slate-200 rounded-2xl p-6 overflow-y-auto shadow-sm">
                    {activeStep ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">

                            {/* 1. Basics */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-[var(--navy-brand)] flex items-center gap-2">
                                    <Edit className="w-5 h-5 text-blue-500" />
                                    Configuración Básica
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-600 mb-1">Título del Paso</label>
                                        <input
                                            type="text"
                                            value={activeStep.title}
                                            onChange={(e) => handleUpdateActiveStep('title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[var(--navy-brand)] focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)]/20 outline-none font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-600 mb-1">Precio ($)</label>
                                        <input
                                            type="number"
                                            value={activeStep.price}
                                            onChange={(e) => handleUpdateActiveStep('price', Number(e.target.value))}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[var(--navy-brand)] focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)]/20 outline-none font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">Descripción Educativa</label>
                                    <textarea
                                        value={activeStep.description}
                                        onChange={(e) => handleUpdateActiveStep('description', e.target.value)}
                                        rows={3}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-slate-700 focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)]/20 outline-none resize-none"
                                    />
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* 2. Dynamic Form Builder */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[var(--navy-brand)] flex items-center gap-2">
                                        <List className="w-5 h-5 text-amber-500" />
                                        Formulario de Entrada
                                    </h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAddField('text')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 transition-colors">
                                            <Type className="w-3 h-3" /> Texto
                                        </button>
                                        <button onClick={() => handleAddField('textarea')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 transition-colors">
                                            <AlignLeft className="w-3 h-3" /> Area
                                        </button>
                                        <button onClick={() => handleAddField('select')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 transition-colors">
                                            <List className="w-3 h-3" /> Dropdown
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 bg-slate-50 rounded-xl p-4 min-h-[100px] border border-slate-100">
                                    {(!activeStep.formFields || activeStep.formFields.length === 0) && (
                                        <div className="text-center text-slate-400 text-sm py-8 italic">
                                            No hay campos configurados para este paso.
                                        </div>
                                    )}
                                    {activeStep.formFields?.map((field: any, idx: number) => (
                                        <div key={field.id} className="flex gap-3 items-start bg-white p-3 rounded-lg border border-slate-200 shadow-sm group hover:border-slate-300 transition-all">
                                            <div className="mt-2 text-slate-400">
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
                                                    className="w-full bg-transparent border-none p-0 text-[var(--navy-brand)] font-bold focus:ring-0 placeholder-slate-300"
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
                                                        className="w-full text-xs bg-slate-50 rounded px-2 py-1 text-slate-500 border border-slate-200 focus:border-[var(--navy-brand)] focus:ring-0"
                                                        placeholder="Opciones separadas por coma (ej. Opción A, Opción B)"
                                                    />
                                                )}
                                            </div>
                                            <button
                                                onClick={() => handleDeleteField(field.id)}
                                                className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* 3. Files Library */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[var(--navy-brand)] flex items-center gap-2">
                                        <Download className="w-5 h-5 text-purple-600" />
                                        Biblioteca de Archivos (Airtable)
                                    </h3>
                                </div>

                                {/* Asset Picker */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Asignar Recurso</label>
                                    <div className="flex gap-2">
                                        <select
                                            className="flex-1 bg-white border border-slate-300 rounded-lg text-sm p-2 outline-none focus:border-[var(--navy-brand)]"
                                            onChange={(e) => {
                                                const selectedId = e.target.value;
                                                const asset = library.find(a => a.id === selectedId);
                                                if (asset) {
                                                    const newFile = {
                                                        name: { es: asset.name, en: asset.name }, // Simple mock for i18n
                                                        url: asset.url
                                                    };
                                                    const newFiles = [...(activeStep.files || []), newFile];
                                                    handleUpdateActiveStep('files', newFiles);
                                                }
                                                e.target.value = ""; // Reset
                                            }}
                                        >
                                            <option value="">-- Seleccionar de la Biblioteca --</option>
                                            {library.map(asset => (
                                                <option key={asset.id} value={asset.id}>
                                                    {asset.type.toUpperCase()} - {asset.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            onClick={() => setIsUploadModalOpen(true)}
                                            className="px-3 py-2 bg-[var(--navy-brand)] text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
                                            title="Subir Nuevo Archivo"
                                        >
                                            <Upload className="w-4 h-4" />
                                            <span className="hidden sm:inline text-xs font-bold">Nuevo</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Upload Modal */}
                                {isUploadModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                                        <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                                            <h3 className="text-xl font-bold text-[var(--navy-brand)] mb-4 flex items-center gap-2">
                                                <Upload className="w-5 h-5" />
                                                Subir Nuevo Recurso
                                            </h3>

                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Nombre del Archivo</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Ej: Guía de Impuestos 2026"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-[var(--navy-brand)]"
                                                        value={newFile.name}
                                                        onChange={(e) => setNewFile({ ...newFile, name: e.target.value })}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de Archivo</label>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {['pdf', 'xlsx', 'docx', 'image'].map(type => (
                                                            <button
                                                                key={type}
                                                                onClick={() => setNewFile({ ...newFile, type: type as any })}
                                                                className={`p-2 rounded-lg border text-sm font-medium transition-all ${newFile.type === type
                                                                    ? 'bg-[var(--navy-brand)] text-white border-[var(--navy-brand)]'
                                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                                    }`}
                                                            >
                                                                {type.toUpperCase()}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-amber-50 text-amber-800 text-xs p-3 rounded-lg border border-amber-100">
                                                    Nota: En este MVP, el archivo se simulará con una URL generada automáticamente.
                                                </div>
                                            </div>

                                            <div className="flex gap-3 justify-end mt-6">
                                                <button
                                                    onClick={() => setIsUploadModalOpen(false)}
                                                    className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={handleQuickUpload}
                                                    disabled={!newFile.name}
                                                    className="px-5 py-2 bg-[var(--navy-brand)] text-white rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                                >
                                                    Guardar y Asignar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-2">
                                    {(!activeStep.files || activeStep.files.length === 0) ? (
                                        <div className="text-center text-slate-400 text-sm py-4 italic">
                                            No hay archivos asignados a este paso.
                                        </div>
                                    ) : (
                                        activeStep.files.map((file: any, index: number) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${file.url?.endsWith('.pdf') ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                        {file.url?.endsWith('.pdf') ? <Eye className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <div className="text-sm font-medium text-slate-700 truncate max-w-[200px]">{file.name.es || file.name}</div>
                                                        <div className="text-[10px] text-slate-400 uppercase">{file.url?.endsWith('.pdf') ? 'Vista Previa' : 'Descarga'}</div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        const newFiles = activeStep.files.filter((_: any, i: number) => i !== index);
                                                        handleUpdateActiveStep('files', newFiles);
                                                    }}
                                                    className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[var(--navy-brand)] flex items-center gap-2">
                                        <ExternalLink className="w-5 h-5 text-indigo-500" />
                                        Herramientas Oficiales (Links)
                                    </h3>
                                    <button
                                        onClick={() => {
                                            const newTool = { name: "Nueva Herramienta", url: "https://" };
                                            const newResources = [...(activeStep.resources || []), newTool];
                                            handleUpdateActiveStep('resources', newResources);
                                        }}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 transition-colors"
                                    >
                                        <Plus className="w-3 h-3" /> Agregar Tool
                                    </button>
                                </div>

                                <div className="space-y-3 bg-slate-50 rounded-xl p-4 min-h-[100px] border border-slate-100">
                                    {(!activeStep.resources || activeStep.resources.length === 0) && (
                                        <div className="text-center text-slate-400 text-sm py-4 italic">
                                            No hay herramientas asignadas.
                                        </div>
                                    )}
                                    {activeStep.resources?.map((res: any, idx: number) => (
                                        <div key={idx} className="flex gap-3 items-center bg-white p-3 rounded-lg border border-slate-200 shadow-sm group hover:border-slate-300 transition-all">
                                            <div className="mt-1 text-slate-400">
                                                <ExternalLink className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <input
                                                    type="text"
                                                    value={res.name}
                                                    onChange={(e) => {
                                                        const newResources = [...(activeStep.resources || [])];
                                                        newResources[idx].name = e.target.value;
                                                        handleUpdateActiveStep('resources', newResources);
                                                    }}
                                                    className="w-full bg-transparent border-none p-0 text-sm font-bold text-[var(--navy-brand)] focus:ring-0 placeholder-slate-300"
                                                    placeholder="Nombre de la Herramienta"
                                                />
                                                <input
                                                    type="text"
                                                    value={res.url}
                                                    onChange={(e) => {
                                                        const newResources = [...(activeStep.resources || [])];
                                                        newResources[idx].url = e.target.value;
                                                        handleUpdateActiveStep('resources', newResources);
                                                    }}
                                                    className="w-full text-xs bg-slate-50 rounded px-2 py-1 text-slate-500 border border-slate-200 focus:border-[var(--navy-brand)] focus:ring-0"
                                                    placeholder="URL (https://...)"
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    const newResources = activeStep.resources.filter((_: any, i: number) => i !== idx);
                                                    handleUpdateActiveStep('resources', newResources);
                                                }}
                                                className="p-1.5 hover:bg-red-50 text-slate-300 hover:text-red-500 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <Plus className="w-12 h-12 mb-4 opacity-20" />
                            <p>Selecciona un paso para editar</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
