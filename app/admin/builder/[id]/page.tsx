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
    const { data, updateVertical, language, resources } = useBizPro();

    const activeResources = resources.filter(r => r.status === 'visible');

    const verticalId = params.id;
    const initialData = data.admin?.builder?.verticals.find((v: any) => v.id === verticalId) || data.admin?.builder?.verticals[0];

    // Dictionary for Builder Editor
    const text = {
        es: {
            header: { subtitle: "Editando flujo de trabajo", save: "Guardar Cambios", saved: "Cambios guardados en memoria exitosamente." },
            sidebar: { sequence: "Secuencia de Pasos", add: "Agregar Paso", price: "Gratis", inputs: "inputs" },
            empty: "Selecciona un paso para editar",
            basics: {
                title: "Configuración Básica",
                stepTitle: "Título del Paso",
                price: "Precio ($)",
                desc: "Descripción Educativa"
            },
            form: {
                title: "Formulario de Entrada",
                add: { text: "Texto", area: "Area", select: "Dropdown" },
                empty: "No hay campos configurados para este paso.",
                placeholder: "Pregunta o Etiqueta del Campo",
                optionsPlaceholder: "Opciones separadas por coma (ej. Opción A, Opción B)"
            },
            files: {
                title: "Recursos Asignados",
                assign: "Asignar de Biblioteca Central",
                selectPlaceholder: "-- Seleccionar Archivo --",
                manage: "Gestionar Biblioteca",
                empty: "No hay recursos asignados. Selecciona uno de la biblioteca.",
            },
            tools: {
                title: "Herramientas Oficiales (Links)",
                add: "Agregar Tool",
                empty: "No hay herramientas asignadas.",
                placeholderName: "Nombre de la Herramienta",
                placeholderUrl: "URL (https://...)"
            }
        },
        en: {
            header: { subtitle: "Editing workflow", save: "Save Changes", saved: "Changes saved to memory successfully." },
            sidebar: { sequence: "Steps Sequence", add: "Add Step", price: "Free", inputs: "inputs" },
            empty: "Select a step to edit",
            basics: {
                title: "Basic Configuration",
                stepTitle: "Step Title",
                price: "Price ($)",
                desc: "Educational Description"
            },
            form: {
                title: "Input Form",
                add: { text: "Text", area: "Area", select: "Dropdown" },
                empty: "No fields configured for this step.",
                placeholder: "Question or Field Label",
                optionsPlaceholder: "Comma separated options (e.g. Option A, Option B)"
            },
            files: {
                title: "Assigned Resources",
                assign: "Assign from Central Library",
                selectPlaceholder: "-- Select File --",
                manage: "Manage Library",
                empty: "No resources assigned. Select one from the library.",
            },
            tools: {
                title: "Official Tools (Links)",
                add: "Add Tool",
                empty: "No official tools assigned.",
                placeholderName: "Tool Name",
                placeholderUrl: "URL (https://...)"
            }
        }
    };

    const t = language === 'es' ? text.es : text.en;

    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [vertical, setVertical] = useState(initialData);

    const activeStep = vertical.steps[activeStepIndex];

    const handleUpdateActiveStep = (field: string, value: any) => {
        const newSteps = [...vertical.steps];
        newSteps[activeStepIndex] = { ...newSteps[activeStepIndex], [field]: value };
        setVertical({ ...vertical, steps: newSteps });
    };

    if (!vertical) return <div className="text-white">Vertical no encontrada.</div>;

    const handleSave = () => {
        updateVertical(vertical);
        alert(t.header.saved);
    };

    const handleAddField = (type: 'text' | 'textarea' | 'select') => {
        const newField = {
            id: `f_${Date.now()}`,
            type,
            label: language === 'es' ? "Nueva Pregunta" : "New Question",
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
                        <p className="text-sm text-slate-500">{t.header.subtitle}</p>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                    <Save className="w-5 h-5" />
                    {t.header.save}
                </button>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex gap-6 min-h-0">

                {/* LEFT: Steps Outline */}
                <div className="w-1/3 flex flex-col gap-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex-1 overflow-y-auto shadow-sm">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                            {t.sidebar.sequence}
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
                                            <span>{step.price === 0 ? t.sidebar.price : `$${step.price}`}</span>
                                            <span>{Array.isArray(step.formFields) ? step.formFields.length : 0} {t.sidebar.inputs}</span>
                                        </div>
                                    </div>
                                    {idx === activeStepIndex && <div className="w-1.5 h-1.5 rounded-full bg-[var(--navy-brand)]"></div>}
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-200 hover:border-[var(--navy-brand)] hover:bg-slate-50 rounded-xl text-slate-500 hover:text-[var(--navy-brand)] font-bold transition-all flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4" />
                            {t.sidebar.add}
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
                                    {t.basics.title}
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-600 mb-1">{t.basics.stepTitle}</label>
                                        <input
                                            type="text"
                                            value={activeStep.title}
                                            onChange={(e) => handleUpdateActiveStep('title', e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[var(--navy-brand)] focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)]/20 outline-none font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-600 mb-1">{t.basics.price}</label>
                                        <input
                                            type="number"
                                            value={activeStep.price}
                                            onChange={(e) => handleUpdateActiveStep('price', Number(e.target.value))}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-[var(--navy-brand)] focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)]/20 outline-none font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1">{t.basics.desc}</label>
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
                                        {t.form.title}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAddField('text')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 transition-colors">
                                            <Type className="w-3 h-3" /> {t.form.add.text}
                                        </button>
                                        <button onClick={() => handleAddField('textarea')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 transition-colors">
                                            <AlignLeft className="w-3 h-3" /> {t.form.add.area}
                                        </button>
                                        <button onClick={() => handleAddField('select')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 transition-colors">
                                            <List className="w-3 h-3" /> {t.form.add.select}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 bg-slate-50 rounded-xl p-4 min-h-[100px] border border-slate-100">
                                    {(!activeStep.formFields || activeStep.formFields.length === 0) && (
                                        <div className="text-center text-slate-400 text-sm py-8 italic">
                                            {t.form.empty}
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
                                                    placeholder={t.form.placeholder}
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
                                                        placeholder={t.form.optionsPlaceholder}
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

                            {/* 3. Files Library (Centralized) */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-[var(--navy-brand)] flex items-center gap-2">
                                        <Download className="w-5 h-5 text-purple-600" />
                                        {t.files.title}
                                    </h3>
                                    <Link href="/admin/resources" target="_blank" className="text-xs text-blue-600 font-bold hover:underline py-1 px-2">{t.files.manage}</Link>
                                </div>

                                {/* Asset Picker */}
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">{t.files.assign}</label>
                                    <div className="flex gap-2">
                                        <select
                                            className="flex-1 bg-white border border-slate-300 rounded-lg text-sm p-2 outline-none focus:border-[var(--navy-brand)]"
                                            onChange={(e) => {
                                                const selectedId = e.target.value;
                                                const asset = resources.find(a => a.id === selectedId);
                                                if (asset) {
                                                    const newFile = {
                                                        name: { es: asset.name, en: asset.name },
                                                        url: asset.url
                                                    };
                                                    const newFiles = [...(activeStep.files || []), newFile];
                                                    handleUpdateActiveStep('files', newFiles);
                                                }
                                                e.target.value = ""; // Reset
                                            }}
                                        >
                                            <option value="">{t.files.selectPlaceholder}</option>
                                            {activeResources.map(asset => (
                                                <option key={asset.id} value={asset.id}>
                                                    {asset.type.toUpperCase()} - {asset.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-2">
                                    {(!activeStep.files || activeStep.files.length === 0) ? (
                                        <div className="text-center text-slate-400 text-sm py-4 italic">
                                            {t.files.empty}
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
                                        {t.tools.title}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            const newTool = { name: "Nueva Herramienta", url: "https://" };
                                            const newResources = [...(activeStep.resources || []), newTool];
                                            handleUpdateActiveStep('resources', newResources);
                                        }}
                                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1 transition-colors"
                                    >
                                        <Plus className="w-3 h-3" /> {t.tools.add}
                                    </button>
                                </div>

                                <div className="space-y-3 bg-slate-50 rounded-xl p-4 min-h-[100px] border border-slate-100">
                                    {(!activeStep.resources || activeStep.resources.length === 0) && (
                                        <div className="text-center text-slate-400 text-sm py-4 italic">
                                            {t.tools.empty}
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
                                                    placeholder={t.tools.placeholderName}
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
                                                    placeholder={t.tools.placeholderUrl}
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
                            <p>{t.empty}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
