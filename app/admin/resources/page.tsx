"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { useState } from "react";
import {
    FileText,
    Upload,
    Trash2,
    Eye,
    EyeOff,
    Search,
    Plus,
    MoreHorizontal,
    File,
    FileSpreadsheet,
    Image as ImageIcon
} from "lucide-react";

export default function ResourcesPage() {
    const { resources, addResource, updateResource, deleteResource, language } = useBizPro();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newResource, setNewResource] = useState({ name: "", type: "pdf" as const });

    const filteredResources = resources.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddResource = () => {
        const id = `res_${Date.now()}`;
        addResource({
            id,
            name: newResource.name,
            type: newResource.type,
            url: `/assets/mock_${id}.${newResource.type}`,
            status: 'visible'
        });
        setIsModalOpen(false);
        setNewResource({ name: "", type: "pdf" });
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="text-red-500" />;
            case 'xlsx': return <FileSpreadsheet className="text-green-500" />;
            case 'docx': return <File className="text-blue-500" />;
            case 'image': return <ImageIcon className="text-purple-500" />;
            default: return <FileText className="text-slate-500" />;
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--navy-brand)]">Biblioteca de Archivos</h1>
                    <p className="text-slate-500">Gestiona los recursos descargables disponibles para los pasos.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-2.5 bg-[var(--navy-brand)] text-white rounded-xl font-bold hover:bg-[#1e1e38] transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                    <Upload className="w-5 h-5" />
                    Subir Nuevo Archivo
                </button>
            </div>

            {/* Search & Stats */}
            <div className="flex gap-4 items-center bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre de archivo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[var(--navy-brand)]"
                    />
                </div>
                <div className="px-4 py-2 bg-slate-50 rounded-lg text-sm text-slate-600 font-bold border border-slate-200">
                    {filteredResources.length} Archivos
                </div>
            </div>

            {/* Resources List */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                        <tr>
                            <th className="p-4 pl-6 font-medium">Nombre del Archivo</th>
                            <th className="p-4 font-medium">Tipo</th>
                            <th className="p-4 font-medium">URL (Simulada)</th>
                            <th className="p-4 font-medium text-center">Visibilidad</th>
                            <th className="p-4 font-medium text-right pr-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredResources.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-slate-400 italic">No se encontraron archivos.</td>
                            </tr>
                        ) : (
                            filteredResources.map((resource) => (
                                <tr key={resource.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                                {getIcon(resource.type)}
                                            </div>
                                            <span className="font-bold text-slate-700">{resource.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold uppercase">
                                            {resource.type}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-500 font-mono truncate max-w-[200px] block">
                                            {resource.url}
                                        </code>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button
                                            onClick={() => updateResource(resource.id, { status: resource.status === 'visible' ? 'hidden' : 'visible' })}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${resource.status === 'visible'
                                                    ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                                                }`}
                                        >
                                            {resource.status === 'visible' ? <Eye size={14} /> : <EyeOff size={14} />}
                                            {resource.status === 'visible' ? "Visible" : "Oculto"}
                                        </button>
                                    </td>
                                    <td className="p-4 text-right pr-6">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => deleteResource(resource.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Upload Modal */}
            {isModalOpen && (
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
                                    placeholder="Ej: Checklist Apertura 2026"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 outline-none focus:border-[var(--navy-brand)]"
                                    value={newResource.name}
                                    onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Tipo de Archivo</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['pdf', 'xlsx', 'docx', 'image'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setNewResource({ ...newResource, type: type as any })}
                                            className={`p-2 rounded-lg border text-sm font-medium transition-all ${newResource.type === type
                                                    ? 'bg-[var(--navy-brand)] text-white border-[var(--navy-brand)]'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {type.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end mt-6">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleAddResource}
                                disabled={!newResource.name}
                                className="px-5 py-2 bg-[var(--navy-brand)] text-white rounded-lg font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Guardar Archivo
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
