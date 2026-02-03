"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { DollarSign, UserCheck, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
    const { data } = useBizPro();
    const users = data.admin?.users || [];

    // Calculate Metrics
    // Calculate Metrics
    const totalRevenue = users
        .filter((u: any) => u.status === 'Paid')
        .reduce((acc: number, curr: any) => acc + (curr.plan === 'Startup' ? 299 : curr.plan === 'Readiness' ? 899 : 79), 0);

    const pendingActions = users.filter((u: any) => u.status === 'Pending').length;
    const activeClients = users.filter((u: any) => u.status === 'Paid').length;

    const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-[var(--navy-brand)]">Panel de Control</h1>
                <span className="text-sm text-slate-500">Última actualización: Ahora mismo</span>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium">Ingresos Totales</span>
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{fmt(totalRevenue)}</div>
                    <div className="text-xs text-emerald-600 mt-2 font-medium">+12% vs mes anterior</div>
                </div>

                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium">Clientes Activos</span>
                        <div className="w-10 h-10 bg-indigo-50 text-[var(--navy-brand)] rounded-lg flex items-center justify-center">
                            <UserCheck className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{activeClients}</div>
                    <div className="text-xs text-slate-500 mt-2">En proceso de formación</div>
                </div>

                <div className="bg-white border border-amber-200 p-6 rounded-2xl relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full"></div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <span className="text-amber-700 font-medium">Requieren Acción</span>
                        <div className="w-10 h-10 bg-white shadow-sm text-amber-600 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900 relative z-10">{pendingActions}</div>
                    <div className="text-xs text-amber-600 mt-2 font-medium relative z-10">Trámites estancados &gt; 3 días</div>
                </div>
            </div>

            {/* Recent Clients Table */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-slate-900">Actividad Reciente</h2>
                    <button className="text-sm text-[var(--navy-brand)] hover:underline font-bold">Ver Todos</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="p-4 font-medium">Cliente</th>
                                <th className="p-4 font-medium">Plan</th>
                                <th className="p-4 font-medium">Estado</th>
                                <th className="p-4 font-medium">Último Contacto</th>
                                <th className="p-4 font-medium text-right">Acción</th>
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
                                            {user.status === 'Paid' ? 'Pagado' : user.status === 'Pending' ? 'Pendiente' : 'Lead'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-500">
                                        {user.lastContact}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-[var(--navy-brand)] hover:text-indigo-900 font-bold hover:underline">
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
