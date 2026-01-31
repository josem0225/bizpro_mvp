"use client";

import Link from "next/link";
import { Plus, Package, Edit, Copy, MoreHorizontal, ArrowRight } from "lucide-react";

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

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Constructor de Negocios</h1>
                    <p className="text-[var(--text-gray)]">Gestiona los flujos de trabajo y ofertas para tus clientes.</p>
                </div>
                <button className="px-5 py-2.5 bg-[var(--blue-electric)] text-white rounded-xl font-bold hover:bg-[#2563EB] transition-all flex items-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.4)]">
                    <Plus className="w-5 h-5" />
                    Nuevo Modelo
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {verticals.map((vertical) => (
                    <div key={vertical.id} className="group bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--blue-electric)]/50 p-6 rounded-2xl transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-5">
                                <div className="w-14 h-14 bg-[var(--navy-brand)] border border-[var(--glass-border)] rounded-xl flex items-center justify-center shrink-0">
                                    <Package className="w-7 h-7 text-[var(--gold)]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[var(--blue-glow)] transition-colors">
                                        {vertical.title}
                                    </h3>
                                    <p className="text-[var(--text-gray)] text-sm mb-4 max-w-xl">
                                        {vertical.description}
                                    </p>

                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2 text-[var(--text-gray)]">
                                            <span className="w-2 h-2 rounded-full bg-white/20"></span>
                                            {vertical.steps} Pasos
                                        </div>
                                        <div className="flex items-center gap-2 text-[var(--text-gray)]">
                                            <span className="w-2 h-2 rounded-full bg-white/20"></span>
                                            {vertical.users} Usuarios
                                        </div>
                                        <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${vertical.status === 'Active' ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                            }`}>
                                            {vertical.status === 'Active' ? 'Activo' : 'Borrador'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/admin/builder/${vertical.id}`}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors flex items-center gap-2 border border-white/5"
                                >
                                    <Edit className="w-4 h-4" />
                                    Editar Flujo
                                </Link>
                                <button className="p-2 text-[var(--text-gray)] hover:text-white transition-colors">
                                    <Copy className="w-5 h-5" />
                                </button>
                                <button className="p-2 text-[var(--text-gray)] hover:text-white transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
