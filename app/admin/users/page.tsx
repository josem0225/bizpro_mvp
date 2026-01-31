"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { Search, Filter, Mail, Phone, MoreHorizontal, User, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

export default function ClientsPage() {
    const { data } = useBizPro();
    const users = data.admin?.users || [];
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending" | "Lead">("All");

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "All" || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Cartera de Clientes</h1>
                    <p className="text-[var(--text-gray)]">Gestiona el progreso y comunicación con tus usuarios.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-[var(--blue-electric)] text-white rounded-xl font-bold hover:bg-[#2563EB] transition-all flex items-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.4)]">
                        <User className="w-5 h-5" />
                        Nuevo Cliente
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[var(--glass-bg)] border border-[var(--glass-border)] p-4 rounded-2xl">
                <div className="flex gap-2 p-1 bg-black/20 rounded-xl">
                    {(["All", "Paid", "Pending", "Lead"] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === status
                                    ? "bg-[var(--blue-electric)] text-white shadow-lg"
                                    : "text-[var(--text-gray)] hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {status === "All" ? "Todos" : status === "Paid" ? "Activos" : status === "Pending" ? "Pendientes" : "Leads"}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-gray)]" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o correo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-black/20 border border-[var(--glass-border)] rounded-xl text-sm text-white focus:outline-none focus:border-[var(--blue-electric)] transition-all"
                    />
                </div>
            </div>

            {/* Clients Table */}
            <div className="grid gap-4">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="group bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:border-[var(--blue-electric)]/50 p-6 rounded-2xl transition-all duration-200">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                            {/* User Info */}
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--blue-electric)] to-[var(--navy-brand)] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{user.name}</h3>
                                    <div className="flex gap-4 text-sm text-[var(--text-gray)] mt-1">
                                        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                                            <Mail className="w-3.5 h-3.5" /> {user.email}
                                        </span>
                                        <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                                            <Phone className="w-3.5 h-3.5" /> +1 (555) 000-0000
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Info */}
                            <div className="flex flex-col gap-2 min-w-[140px]">
                                <span className="text-xs uppercase tracking-wider text-[var(--text-gray)] font-semibold">Plan Actual</span>
                                <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium text-center">
                                    {user.plan === 'None' ? 'Sin Plan' : user.plan}
                                </span>
                            </div>

                            {/* Status Info */}
                            <div className="flex flex-col gap-2 min-w-[140px]">
                                <span className="text-xs uppercase tracking-wider text-[var(--text-gray)] font-semibold">Estado</span>
                                <div className={`flex items-center gap-2 text-sm font-medium ${user.status === 'Paid' ? 'text-[var(--success)]' :
                                        user.status === 'Pending' ? 'text-yellow-500' : 'text-[var(--text-gray)]'
                                    }`}>
                                    {user.status === 'Paid' ? <CheckCircle className="w-4 h-4" /> :
                                        user.status === 'Pending' ? <Clock className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    {user.status === 'Paid' ? 'Cliente Activo' : user.status === 'Pending' ? 'Pago Pendiente' : 'Lead Potencial'}
                                </div>
                            </div>

                            {/* Last Contact */}
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-wider text-[var(--text-gray)] font-semibold">Último Contacto</span>
                                <span className="text-sm text-white">{user.lastContact}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-white/10 rounded-lg text-[var(--text-gray)] hover:text-white transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                                <button className="px-4 py-2 bg-[var(--blue-glow)]/10 text-[var(--blue-glow)] hover:bg-[var(--blue-glow)] hover:text-white border border-[var(--blue-glow)]/20 rounded-lg text-sm font-medium transition-all">
                                    Gestionar
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar (Visual Flair) */}
                        {user.plan !== 'None' && (
                            <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex items-center gap-4">
                                <span className="text-xs text-[var(--text-gray)] font-medium">Progreso del Trámite</span>
                                <div className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[var(--success)] shadow-[0_0_10px_var(--success)]"
                                        style={{ width: `${(user.step / 6) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-white font-mono">Paso {user.step}/6</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
