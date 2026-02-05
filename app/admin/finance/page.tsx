"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { DollarSign, Download, Plus, Search, Calendar, CreditCard } from "lucide-react";
import { useState } from "react";

export default function FinancePage() {
    const { data, language } = useBizPro();
    const transactions = data.admin?.transactions || [];
    const [searchTerm, setSearchTerm] = useState("");

    const totalRevenue = transactions
        .filter((t: any) => t.status === "Completed")
        .reduce((sum: number, t: any) => sum + t.amount, 0);

    const filteredTransactions = transactions.filter((t: any) =>
        t.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.concept.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    // Mock functionality for manual payment logic
    const handleAddPayment = () => {
        alert(language === 'es'
            ? "Esta función abrirá un modal para registrar pagos manuales (Zelle/Cash) y actualizar el estado del cliente."
            : "This function will open a modal to register manual payments (Zelle/Cash) and update client status.");
    };

    const text = {
        es: {
            title: "Finanzas",
            subtitle: "Control de ingresos y conciliación de pagos.",
            export: "Exportar CSV",
            manual: "Registrar Pago Manual",
            metrics: {
                total: "Ingresos Totales",
                average: "Ticket Promedio",
                month: "Este Mes",
                est: "(Est.)"
            },
            recent: "Transacciones Recientes",
            searchPlaceholder: "Buscar por cliente o concepto...",
            cols: { date: "Fecha", client: "Cliente", concept: "Concepto", method: "Método", amount: "Monto", status: "Estado" },
            status: { completed: "Completado", pending: "Pendiente" },
            empty: "No se encontraron transacciones."
        },
        en: {
            title: "Finance",
            subtitle: "Revenue control and payment reconciliation.",
            export: "Export CSV",
            manual: "Manual Payment",
            metrics: {
                total: "Total Revenue",
                average: "Average Ticket",
                month: "This Month",
                est: "(Est.)"
            },
            recent: "Recent Transactions",
            searchPlaceholder: "Search by client or concept...",
            cols: { date: "Date", client: "Client", concept: "Concept", method: "Method", amount: "Amount", status: "Status" },
            status: { completed: "Completed", pending: "Pending" },
            empty: "No transactions found."
        }
    };

    const t = language === 'es' ? text.es : text.en;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--navy-brand)] mb-2">{t.title}</h1>
                    <p className="text-slate-600">{t.subtitle}</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 font-medium shadow-sm hover:t">
                        <Download className="w-4 h-4" />
                        {t.export}
                    </button>
                    <button
                        onClick={handleAddPayment}
                        className="px-5 py-2 bg-[var(--navy-brand)] text-white rounded-xl font-bold hover:bg-[#1e1e38] transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                        {t.manual}
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
                        <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">{t.metrics.total}</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--navy-brand)]">{fmt(totalRevenue)}</div>
                </div>

                <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[var(--navy-brand)]">
                            <CreditCard className="w-4 h-4" />
                        </div>
                        <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">{t.metrics.average}</span>
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
                        <span className="text-slate-500 font-bold uppercase text-xs tracking-wider">{t.metrics.month}</span>
                    </div>
                    <div className="text-3xl font-bold text-[var(--navy-brand)]">{fmt(totalRevenue * 0.3)} <span className="text-xs font-normal text-slate-400">{t.metrics.est}</span></div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-[var(--navy-brand)]">{t.recent}</h2>
                    <div className="relative max-w-xs w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
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
                                <th className="p-4 font-medium">{t.cols.date}</th>
                                <th className="p-4 font-medium">{t.cols.client}</th>
                                <th className="p-4 font-medium">{t.cols.concept}</th>
                                <th className="p-4 font-medium">{t.cols.method}</th>
                                <th className="p-4 font-medium">{t.cols.amount}</th>
                                <th className="p-4 font-medium text-right">{t.cols.status}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTransactions.map((tx: any) => (
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
                                            {tx.status === 'Completed' ? t.status.completed : t.status.pending}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        {t.empty}
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
