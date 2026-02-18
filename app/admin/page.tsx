"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { DollarSign, UserCheck, AlertCircle } from "lucide-react";
import ClientDrawer from "./components/ClientDrawer";
import { useState } from "react";

export default function AdminDashboard() {
    const { data, language } = useBizPro();
    const users = data.admin?.users || [];

    // Calculate Metrics
    const totalRevenue = users
        .filter((u: any) => u.status === 'Paid')
        .reduce((acc: number, curr: any) => acc + (curr.plan === 'Startup' ? 299 : curr.plan === 'Readiness' ? 899 : 79), 0);

    const pendingActions = users.filter((u: any) => u.status === 'Pending').length;
    const activeClients = users.filter((u: any) => u.status === 'Paid').length;

    const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    const text = {
        es: {
            title: "Panel de Control",
            updated: "Última actualización: Ahora mismo",
            revenue: "Ingresos Totales",
            vs: "+12% vs mes anterior",
            active: "Clientes Activos",
            process: "En proceso de formación",
            action: "Requieren Acción",
            stuck: "Trámites estancados > 3 días",
            recent: "Actividad Reciente",
            viewAll: "Ver Todos",
            cols: { client: "Cliente", plan: "Plan", status: "Estado", contact: "Último Contacto", action: "Acción" },
            status: { paid: "Pagado", pending: "Pendiente", lead: "Lead" },
            manage: "Gestionar"
        },
        en: {
            title: "Admin Dashboard",
            updated: "Last updated: Just now",
            revenue: "Total Revenue",
            vs: "+12% vs last month",
            active: "Active Clients",
            process: "Formation in progress",
            action: "Action Required",
            stuck: "Stalled processes > 3 days",
            recent: "Recent Activity",
            viewAll: "View All",
            cols: { client: "Client", plan: "Plan", status: "Status", contact: "Last Contact", action: "Action" },
            status: { paid: "Paid", pending: "Pending", lead: "Lead" },
            manage: "Manage"
        }
    };

    const t = language === 'es' ? text.es : text.en;

    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    return (
        <div className="space-y-8 relative">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[var(--navy-brand)]">{t.title}</h1>
                <span className="text-sm text-slate-500">{t.updated}</span>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium">{t.revenue}</span>
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{fmt(totalRevenue)}</div>
                    <div className="text-xs text-emerald-600 mt-2 font-medium">{t.vs}</div>
                </div>

                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium">{t.active}</span>
                        <div className="w-10 h-10 bg-indigo-50 text-[var(--navy-brand)] rounded-lg flex items-center justify-center">
                            <UserCheck className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{activeClients}</div>
                    <div className="text-xs text-slate-500 mt-2">{t.process}</div>
                </div>

                <div className="bg-white border border-amber-200 p-6 rounded-2xl relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-amber-700 font-medium">{t.action}</span>
                        <div className="w-10 h-10 bg-white shadow-sm text-amber-600 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 relative z-10">{pendingActions}</div>
                    <div className="text-xs text-amber-600 mt-2 font-medium relative z-10">{t.stuck}</div>
                </div>
            </div>

            {/* Recent Clients Table */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900">{t.recent}</h2>
                    <button className="text-sm text-[var(--navy-brand)] hover:underline font-bold">{t.viewAll}</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="p-4 font-medium">{t.cols.client}</th>
                                <th className="p-4 font-medium">{t.cols.plan}</th>
                                <th className="p-4 font-medium">{t.cols.status}</th>
                                <th className="p-4 font-medium">{t.cols.contact}</th>
                                <th className="p-4 font-medium text-right">{t.cols.action}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map((user: any) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4">
                                        <div className="font-bold text-slate-900">{user.name}</div>
                                        <div className="text-xs text-slate-500">{user.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold border ${user.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            user.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                'bg-slate-50 text-slate-600 border-slate-200'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Paid' ? 'bg-emerald-500' :
                                                user.status === 'Pending' ? 'bg-amber-500' :
                                                    'bg-slate-400'
                                                }`}></span>
                                            {user.status === 'Paid' ? t.status.paid : user.status === 'Pending' ? t.status.pending : t.status.lead}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-500">
                                        {user.lastContact}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="text-[var(--navy-brand)] hover:text-indigo-900 font-bold hover:underline"
                                        >
                                            {t.manage}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Client Management Drawer */}
            {selectedUser && (
                <ClientDrawer
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
}
