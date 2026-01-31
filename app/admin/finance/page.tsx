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
                    <h1 className="text-3xl font-bold text-white mb-2">Finanzas</h1>
                    <p className="text-[var(--text-gray)]">Control de ingresos y conciliación de pagos.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white rounded-xl hover:bg-white/5 transition-all flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Exportar CSV
                    </button>
                    <button
                        onClick={handleAddPayment}
                        className="px-5 py-2 bg-[var(--blue-electric)] text-white rounded-xl font-bold hover:bg-[#2563EB] transition-all flex items-center gap-2 shadow-[0_4px_15px_rgba(59,130,246,0.4)]"
                    >
                        <Plus className="w-5 h-5" />
                        Registrar Pago Manual
                    </button>
                </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--success)]/10 rounded-bl-full"></div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--success)]/20 flex items-center justify-center text-[var(--success)]">
                            <DollarSign className="w-4 h-4" />
                        </div>
                        <span className="text-[var(--text-gray)] font-medium">Ingresos Totales</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{fmt(totalRevenue)}</div>
                </div>

                <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--blue-electric)]/20 flex items-center justify-center text-[var(--blue-electric)]">
                            <CreditCard className="w-4 h-4" />
                        </div>
                        <span className="text-[var(--text-gray)] font-medium">Ticket Promedio</span>
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {transactions.length > 0 ? fmt(totalRevenue / transactions.length) : "$0.00"}
                    </div>
                </div>

                <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-500">
                            <Calendar className="w-4 h-4" />
                        </div>
                        <span className="text-[var(--text-gray)] font-medium">Este Mes</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{fmt(totalRevenue * 0.3)} <span className="text-xs font-normal text-[var(--text-gray)]">(Est.)</span></div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden">
                <div className="p-5 border-b border-[var(--glass-border)] flex justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-white">Transacciones Recientes</h2>
                    <div className="relative max-w-xs w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-gray)]" />
                        <input
                            type="text"
                            placeholder="Buscar por cliente o concepto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-black/20 border border-[var(--glass-border)] rounded-lg text-sm text-white focus:outline-none focus:border-[var(--blue-electric)]"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-[var(--text-gray)]">
                            <tr>
                                <th className="p-4 font-medium">Fecha</th>
                                <th className="p-4 font-medium">Cliente</th>
                                <th className="p-4 font-medium">Concepto</th>
                                <th className="p-4 font-medium">Método</th>
                                <th className="p-4 font-medium">Monto</th>
                                <th className="p-4 font-medium text-right">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--glass-border)]">
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-[var(--text-gray)] whitespace-nowrap">{tx.date}</td>
                                    <td className="p-4 font-medium text-white">{tx.user}</td>
                                    <td className="p-4 text-[var(--text-gray)]">{tx.concept}</td>
                                    <td className="p-4">
                                        <span className="flex items-center gap-2 text-[var(--text-gray)]">
                                            {tx.method === "Stripe" && <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>}
                                            {tx.method === "Zelle" && <div className="w-2 h-2 rounded-full bg-[#6D1ED4]"></div>}
                                            {tx.method === "Cash" && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
                                            {tx.method}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-white">{fmt(tx.amount)}</td>
                                    <td className="p-4 text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === 'Completed' ? 'bg-[var(--success)]/10 text-[var(--success)]' :
                                                'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {tx.status === 'Completed' ? 'Completado' : 'Pendiente'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-[var(--text-gray)]">
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
