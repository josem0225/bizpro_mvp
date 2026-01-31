"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { DollarSign, UserCheck, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
    const { data } = useBizPro();
    const users = data.admin?.users || [];

    // Calculate Metrics
    const totalRevenue = users
        .filter(u => u.status === 'Paid')
        .reduce((acc, curr) => acc + (curr.plan === 'Startup' ? 299 : curr.plan === 'Readiness' ? 899 : 79), 0);

    const pendingActions = users.filter(u => u.status === 'Pending').length;
    const activeClients = users.filter(u => u.status === 'Paid').length;

    const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Panel de Control</h1>
                <span className="text-sm text-[var(--text-gray)]">Última actualización: Ahora mismo</span>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[var(--text-gray)]">Ingresos Totales</span>
                        <div className="w-10 h-10 bg-[var(--success)]/20 text-[var(--success)] rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{fmt(totalRevenue)}</div>
                    <div className="text-xs text-[var(--success)] mt-2">+12% vs mes anterior</div>
                </div>

                <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[var(--text-gray)]">Clientes Activos</span>
                        <div className="w-10 h-10 bg-[var(--blue-electric)]/20 text-[var(--blue-electric)] rounded-lg flex items-center justify-center">
                            <UserCheck className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{activeClients}</div>
                    <div className="text-xs text-[var(--text-gray)] mt-2">En proceso de formación</div>
                </div>

                <div className="bg-[var(--glass-bg)] border border-yellow-500/30 p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full"></div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-yellow-500 font-medium">Requieren Acción</span>
                        <div className="w-10 h-10 bg-yellow-500/20 text-yellow-500 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-white">{pendingActions}</div>
                    <div className="text-xs text-yellow-500 mt-2">Trámites estancados &gt; 3 días</div>
                </div>
            </div>

            {/* Recent Clients Table */}
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-[var(--glass-border)] flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Actividad Reciente</h2>
                    <button className="text-sm text-[var(--blue-glow)] hover:text-white">Ver Todos</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-[var(--text-gray)]">
                            <tr>
                                <th className="p-4 font-medium">Cliente</th>
                                <th className="p-4 font-medium">Plan</th>
                                <th className="p-4 font-medium">Estado</th>
                                <th className="p-4 font-medium">Último Contacto</th>
                                <th className="p-4 font-medium text-right">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--glass-border)]">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-white">{user.name}</div>
                                        <div className="text-xs text-[var(--text-gray)]">{user.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 rounded-md bg-[var(--navy-brand)] border border-[var(--glass-border)] text-xs">
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${user.status === 'Paid' ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' :
                                            user.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                'bg-[var(--text-gray)]/10 text-[var(--text-gray)] border-[var(--text-gray)]/20'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Paid' ? 'bg-[var(--success)]' :
                                                user.status === 'Pending' ? 'bg-yellow-500' :
                                                    'bg-[var(--text-gray)]'
                                                }`}></span>
                                            {user.status === 'Paid' ? 'Pagado' : user.status === 'Pending' ? 'Pendiente' : 'Lead'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-[var(--text-gray)]">
                                        {user.lastContact}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-[var(--blue-glow)] hover:text-white font-medium hover:underline">
                                            Gestionar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
