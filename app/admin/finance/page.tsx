"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { DollarSign, Download, Plus, Search, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";

export default function FinancePage() {
    const { data } = useBizPro();
    const transactions = data.admin?.transactions || [];
    const [searchTerm, setSearchTerm] = useState("");

    const totalRevenue = transactions
        .filter(t => t.status === "Completed")
        .reduce((sum, t) => sum + t.amount, 0);

    const filteredTransactions = transactions.filter(t =>
        t.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.concept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    // Mock functionality for manual payment logic
    const handleAddPayment = () => {
        alert("Esta función abrirá un modal para registrar pagos manuales (Zelle/Cash) y actualizar el estado del cliente.");
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--navy-brand)] mb-2">Finanzas</h1>
                    <p className="text-slate-600">Control de ingresos y conciliación de pagos.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 font-medium shadow-sm hover:t">
                        <Download className="w-4 h-4" />
                        Exportar CSV
                    </button>
                    <button
                        onClick={handleAddPayment}
                        className="px-5 py-2 bg-[var(--navy-brand)] text-white rounded-xl font-bold hover:bg-[#1e1e38] transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        Registrar Pago Manual
                    </button>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-slate-200 p-6 rounded-2xl relative overflow-hidden shadow-sm hover:shadow-md transition-all">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-full"></div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <DollarSign className="w-4 h-4" />
                        </div>
                        <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Ingresos Totales</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--navy-brand)]">{fmt(totalRevenue)}</div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[var(--navy-brand)]">
                            <CreditCard className="w-4 h-4" />
                        </div>
                        <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Ticket Promedio</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--navy-brand)]">
                        {transactions.length > 0 ? fmt(totalRevenue / transactions.length) : "$0.00"}
                    </div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">Este Mes</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--navy-brand)]">{fmt(totalRevenue * 0.3)} <span className="text-xs font-normal text-slate-400">(Est.)</span></div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-[var(--navy-brand)]">Transacciones Recientes</h2>
                    <div className="relative max-w-xs w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente o concepto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)]/20 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500">
                            <tr>
                                <th className="p-4 font-medium">Fecha</th>
                                <th className="p-4 font-medium">Cliente</th>
                                <th className="p-4 font-medium">Concepto</th>
                                <th className="p-4 font-medium">Método</th>
                                <th className="p-4 font-medium">Monto</th>
                                <th className="p-4 font-medium text-right">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4 text-slate-600 whitespace-nowrap">{tx.date}</td>
                                    <td className="p-4 font-bold text-[var(--navy-brand)]">{tx.user}</td>
                                    <td className="p-4 text-slate-600">{tx.concept}</td>
                                    <td className="p-4">
                                        <span className="flex items-center gap-2 text-slate-600 font-medium">
                                            {tx.method === "Stripe" && <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>}
                                            {tx.method === "Zelle" && <div className="w-2 h-2 rounded-full bg-[#6D1ED4]"></div>}
                                            {tx.method === "Cash" && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                                            {tx.method}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-slate-900">{fmt(tx.amount)}</td>
                                    <td className="p-4 text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${tx.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                            'bg-amber-50 text-amber-700 border border-amber-100'
                                            }`}>
                                            {tx.status === 'Completed' ? 'Completado' : 'Pendiente'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        No se encontraron transacciones.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
