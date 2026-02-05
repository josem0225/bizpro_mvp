"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { Search, Filter, Mail, Phone, MoreHorizontal, User, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

export default function ClientsPage() {
    const { data, language } = useBizPro();
    const users = data.admin?.users || [];
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Pending" | "Lead">("All");
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    const filteredUsers = users.filter((user: any) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "All" || user.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const text = {
        es: {
            title: "Cartera de Clientes",
            subtitle: "Gestiona el progreso y comunicación con tus usuarios.",
            newClient: "Nuevo Cliente",
            filters: { all: "Todos", paid: "Activos", pending: "Pendientes", lead: "Leads" },
            searchPlaceholder: "Buscar por nombre o correo...",
            card: { plan: "Plan Actual", status: "Estado", lastContact: "Último Contacto", manage: "Gestionar", noPlan: "Sin Plan" },
            status: { paid: "Cliente Activo", pending: "Pago Pendiente", lead: "Lead Potencial" },
            progress: { label: "Progreso del Trámite", step: "Paso" },
            drawer: {
                activeClient: "Cliente Activo",
                email: "Email",
                call: "Llamar",
                ltv: "Lifetime Value (LTV)",
                lastActivity: "Última Actividad",
                lastActivityTime: "Hace 2 horas",
                viewing: "Viendo Dashboard",
                notesTitle: "Notas & Actividad",
                paymentCompleted: "Pago Completado",
                paymentNote: "El cliente pagó la cuota inicial de $400 USD.",
                registration: "Registro",
                registrationNote: "Usuario creado desde Landing Page.",
                dangerZone: "Zona de Peligro & Soporte",
                impersonate: "Impersonar Usuario (Log In)",
                resetPassword: "Resetear Password",
                auditLog: "Acciones registradas en el log de auditoría."
            }
        },
        en: {
            title: "Client Portfolio",
            subtitle: "Manage progress and communication with your users.",
            newClient: "New Client",
            filters: { all: "All", paid: "Paid", pending: "Pending", lead: "Leads" },
            searchPlaceholder: "Search by name or email...",
            card: { plan: "Current Plan", status: "Status", lastContact: "Last Contact", manage: "Manage", noPlan: "No Plan" },
            status: { paid: "Active Client", pending: "Payment Pending", lead: "Potential Lead" },
            progress: { label: "Process Progress", step: "Step" },
            drawer: {
                activeClient: "Active Client",
                email: "Email",
                call: "Call",
                ltv: "Lifetime Value (LTV)",
                lastActivity: "Last Activity",
                lastActivityTime: "2 hours ago",
                viewing: "Viewing Dashboard",
                notesTitle: "Notes & Activity",
                paymentCompleted: "Payment Completed",
                paymentNote: "Client paid initial fee of $400 USD.",
                registration: "Registration",
                registrationNote: "User created from Landing Page.",
                dangerZone: "Danger Zone & Support",
                impersonate: "Impersonate User (Log In)",
                resetPassword: "Reset Password",
                auditLog: "Actions recorded in audit log."
            }
        }
    };

    const t = language === 'es' ? text.es : text.en;

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--navy-brand)] mb-2">{t.title}</h1>
                    <p className="text-slate-600">{t.subtitle}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-[var(--navy-brand)] text-white rounded-xl font-bold hover:bg-[#1e1e38] transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
                        <User className="w-5 h-5" />
                        {t.newClient}
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                    {(["All", "Paid", "Pending", "Lead"] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === status
                                ? "bg-white text-[var(--navy-brand)] shadow-sm font-bold border border-slate-200"
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                }`}
                        >
                            {status === "All" ? t.filters.all : status === "Paid" ? t.filters.paid : status === "Pending" ? t.filters.pending : t.filters.lead}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)]/20 transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* Clients Table / Grid */}
            <div className="grid gap-4">
                {filteredUsers.map((user: any) => (
                    <div key={user.id} className="group bg-white border border-slate-200 hover:border-[var(--navy-brand)] p-6 rounded-2xl transition-all duration-200 shadow-sm hover:shadow-md">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                            {/* User Info */}
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 rounded-full bg-[var(--navy-brand)] flex items-center justify-center text-white font-bold text-lg shadow-md">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--navy-brand)] transition-colors">{user.name}</h3>
                                    <div className="flex gap-4 text-sm text-slate-500 mt-1">
                                        <span className="flex items-center gap-1.5 hover:text-[var(--navy-brand)] transition-colors cursor-pointer">
                                            <Mail className="w-3.5 h-3.5" /> {user.email}
                                        </span>
                                        <span className="flex items-center gap-1.5 hover:text-[var(--navy-brand)] transition-colors cursor-pointer">
                                            <Phone className="w-3.5 h-3.5" /> +1 (555) 000-0000
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Plan Info */}
                            <div className="flex flex-col gap-2 min-w-[140px]">
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{t.card.plan}</span>
                                <span className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium text-center">
                                    {user.plan === 'None' ? t.card.noPlan : user.plan}
                                </span>
                            </div>

                            {/* Status Info */}
                            <div className="flex flex-col gap-2 min-w-[140px]">
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{t.card.status}</span>
                                <div className={`flex items-center gap-2 text-sm font-bold ${user.status === 'Paid' ? 'text-emerald-600' :
                                    user.status === 'Pending' ? 'text-amber-500' : 'text-slate-500'
                                    }`}>
                                    {user.status === 'Paid' ? <CheckCircle className="w-4 h-4" /> :
                                        user.status === 'Pending' ? <Clock className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    {user.status === 'Paid' ? t.status.paid : user.status === 'Pending' ? t.status.pending : t.status.lead}
                                </div>
                            </div>

                            {/* Last Contact */}
                            <div className="flex flex-col gap-2">
                                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{t.card.lastContact}</span>
                                <span className="text-sm text-slate-700 font-medium">{user.lastContact}</span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-[var(--navy-brand)] transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="px-4 py-2 bg-white text-[var(--navy-brand)] hover:bg-[var(--navy-brand)] hover:text-white border border-[var(--navy-brand)] rounded-lg text-sm font-bold transition-all shadow-sm"
                                >
                                    {t.card.manage}
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar (Visual Flair) */}
                        {user.plan !== 'None' && (
                            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-4">
                                <span className="text-xs text-slate-500 font-medium">{t.progress.label}</span>
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500"
                                        style={{ width: `${(user.step / 6) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-[var(--navy-brand)] font-bold font-mono">{t.progress.step} {user.step}/6</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* CRM Drawer (Slide-over) */}
            {selectedUser && (
                <>
                    <div
                        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                        onClick={() => setSelectedUser(null)}
                    ></div>
                    <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto border-l border-slate-200">
                        {/* Drawer Header */}
                        <div className="p-6 border-b border-slate-100 bg-slate-50">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-4 items-center">
                                    <div className="w-14 h-14 rounded-full bg-[var(--navy-brand)] flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
                                        {selectedUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-[var(--navy-brand)]">{selectedUser.name}</h2>
                                        <p className="text-slate-500 text-sm flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                            {t.drawer.activeClient}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedUser(null)}
                                    className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                                >
                                    <span className="sr-only">Cerrar</span>
                                    ✕
                                </button>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2">
                                    <Mail className="w-4 h-4" /> {t.drawer.email}
                                </button>
                                <button className="flex-1 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-2">
                                    <Phone className="w-4 h-4" /> {t.drawer.call}
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-8">
                            {/* CRM Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t.drawer.ltv}</div>
                                    <div className="text-2xl font-bold text-[var(--navy-brand)]">$1,240</div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t.drawer.lastActivity}</div>
                                    <div className="text-sm font-bold text-slate-700">{t.drawer.lastActivityTime}</div>
                                    <div className="text-xs text-slate-400">{t.drawer.viewing}</div>
                                </div>
                            </div>

                            {/* Notes / Timeline */}
                            <div>
                                <h3 className="text-sm font-bold text-[var(--navy-brand)] uppercase tracking-wider mb-4">{t.drawer.notesTitle}</h3>
                                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm ml-4">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-slate-900 text-sm">{t.drawer.paymentCompleted}</div>
                                                <time className="font-mono text-xs text-slate-500">Hoy</time>
                                            </div>
                                            <div className="text-slate-500 text-xs">{t.drawer.paymentNote}</div>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            <User className="w-5 h-5" />
                                        </div>
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm ml-4">
                                            <div className="flex items-center justify-between space-x-2 mb-1">
                                                <div className="font-bold text-slate-900 text-sm">{t.drawer.registration}</div>
                                                <time className="font-mono text-xs text-slate-500">Ayer</time>
                                            </div>
                                            <div className="text-slate-500 text-xs">{t.drawer.registrationNote}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Super Admin Actions */}
                            <div className="pt-6 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-[var(--navy-brand)] uppercase tracking-wider mb-4">{t.drawer.dangerZone}</h3>
                                <div className="space-y-3">
                                    <button className="w-full py-3 bg-[var(--navy-brand)] text-white rounded-xl font-bold hover:bg-[#1e1e38] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                                        <User className="w-4 h-4" />
                                        {t.drawer.impersonate}
                                    </button>
                                    <button className="w-full py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                                        <span className="w-4 h-4">✕</span>
                                        {t.drawer.resetPassword}
                                    </button>
                                </div>
                                <p className="text-xs text-slate-400 text-center mt-4">
                                    {t.drawer.auditLog}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
