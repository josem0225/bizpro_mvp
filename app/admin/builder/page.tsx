"use client";

import Link from "next/link";
import { Plus, Package, Edit, Copy, MoreHorizontal, ArrowRight, Eye, Archive, Trash } from "lucide-react";
import { useState } from "react";

export default function BuilderPage() {
    // Mock data for verticals
    const verticals = [
        {
            id: 1,
            title: "Florida LLC Formation",
            description: "Flujo estándar para registro de LLCs en Florida.",
            steps: 6,
            users: 142,
            revenue: 28400,
            status: "Active"
        },
        {
            id: 2,
            title: "Non-Profit Organization",
            description: "Registro de organizaciones sin fines de lucro 501(c)(3).",
            steps: 8,
            users: 12,
            revenue: 0,
            status: "Draft"
        },
        {
            id: 3,
            title: "Sole Proprietorship",
            description: "Registro simple para dueños únicos.",
            steps: 4,
            users: 45,
            revenue: 2200,
            status: "Active"
        }
    ];

    const [openMenuId, setOpenMenuId] = useState<number | null>(null);

    const handleDuplicate = (id: number) => {
        setOpenMenuId(null);
        alert(`Duplicando template #${id}... (Lógica de backend pendiente)`);
    };

    const handlePreview = (id: number) => {
        setOpenMenuId(null);
        alert(`Abriendo vista previa para template #${id}...`);
    };

    const handleArchive = (id: number) => {
        setOpenMenuId(null);
        alert(`Archivando template #${id}...`);
    };

    const handleDelete = (id: number) => {
        setOpenMenuId(null);
        if (confirm("¿Estás seguro de eliminar este template? Esta acción no se puede deshacer.")) {
            alert(`Eliminando template #${id}...`);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--navy-brand)] mb-2">Constructor de Negocios</h1>
                    <p className="text-slate-600">Gestiona los flujos de trabajo y ofertas para tus clientes.</p>
                </div>
                <button className="px-5 py-2.5 bg-[var(--navy-brand)] text-white rounded-xl font-bold hover:bg-[#1e1e38] transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
                    <Plus className="w-5 h-5" />
                    Nuevo Modelo
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {verticals.map((vertical) => (
                    <div key={vertical.id} className="group bg-white border border-slate-200 hover:border-[var(--navy-brand)] p-6 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md relative">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-5">
                                <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center shrink-0">
                                    <Package className="w-7 h-7 text-[var(--navy-brand)]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[var(--navy-brand)] mb-1 group-hover:text-[var(--blue-electric)] transition-colors">
                                        {vertical.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4 max-w-xl">
                                        {vertical.description}
                                    </p>

                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                            {vertical.steps} Pasos
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                                            {vertical.users} Usuarios
                                        </div>
                                        <div className={`px-2 py-0.5 rounded-full text-xs font-bold border ${vertical.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                            {vertical.status === 'Active' ? 'Activo' : 'Borrador'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/admin/builder/${vertical.id}`}
                                    className="px-4 py-2 bg-white hover:bg-slate-50 text-[var(--navy-brand)] rounded-lg font-bold transition-colors flex items-center gap-2 border border-slate-200 hover:border-[var(--navy-brand)]"
                                >
                                    <Edit className="w-4 h-4" />
                                    Editar Flujo
                                </Link>
                                <button className="p-2 text-slate-400 hover:text-[var(--navy-brand)] transition-colors hover:bg-slate-100 rounded-lg">
                                    <Copy className="w-5 h-5" />
                                </button>

                                {/* Context Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setOpenMenuId(openMenuId === vertical.id ? null : vertical.id)}
                                        className={`p-2 transition-colors hover:bg-slate-100 rounded-lg ${openMenuId === vertical.id ? 'text-[var(--navy-brand)] bg-slate-100' : 'text-slate-400 hover:text-[var(--navy-brand)]'}`}
                                    >
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>

                                    {openMenuId === vertical.id && (
                                        <>
                                            <div className="fixed inset-0 z-10 cursor-default" onClick={() => setOpenMenuId(null)}></div>
                                            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                                <div className="p-1">
                                                    <button onClick={() => handleDuplicate(vertical.id)} className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[var(--navy-brand)] rounded-lg flex items-center gap-2 transition-colors">
                                                        <Copy className="w-4 h-4" /> Duplicar Modelo
                                                    </button>
                                                    <button onClick={() => handlePreview(vertical.id)} className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[var(--blue-electric)] rounded-lg flex items-center gap-2 transition-colors">
                                                        <Eye className="w-4 h-4" /> Vista Previa
                                                    </button>
                                                    <button onClick={() => handleArchive(vertical.id)} className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-amber-600 rounded-lg flex items-center gap-2 transition-colors">
                                                        <Archive className="w-4 h-4" /> Archivar
                                                    </button>
                                                    <div className="h-px bg-slate-100 my-1"></div>
                                                    <button onClick={() => handleDelete(vertical.id)} className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors">
                                                        <Trash className="w-4 h-4" /> Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
