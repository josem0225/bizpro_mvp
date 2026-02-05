"use client";

import React from 'react';
import { History, Search, Download, ShieldCheck } from 'lucide-react';
import { useBizPro } from '@/app/context/BizProContext';

export default function AuditLogPreview() {
    const { language } = useBizPro();

    const text = {
        es: {
            title: "Registro de Auditoría",
            subtitle: "Registro inmutable de todas las acciones administrativas para cumplimiento.",
            export: "Exportar CSV",
            searchPlaceholder: "Buscar por usuario, acción o ID...",
            table: {
                timestamp: "Fecha / ID",
                user: "Usuario",
                action: "Acción",
                entity: "Entidad",
                changes: "Cambios",
                ip: "Dir. IP"
            }
        },
        en: {
            title: "Audit Log",
            subtitle: "Immutable record of all admin actions for compliance.",
            export: "Export CSV",
            searchPlaceholder: "Search by user, action, or ID...",
            table: {
                timestamp: "Timestamp / ID",
                user: "User",
                action: "Action",
                entity: "Entity",
                changes: "Changes",
                ip: "IP Addr"
            }
        }
    };

    const t = language === 'es' ? text.es : text.en;

    // FAKE DATA
    const logs = [
        { id: 'LOG-001', date: 'Jan 25, 2026 14:30', user: 'Carlos Admin', action: 'Update Price', entity: 'Step 1', old: '$79', new: '$89', ip: '192.168.1.1' },
        { id: 'LOG-002', date: 'Jan 25, 2026 14:35', user: 'Carlos Admin', action: 'Update Price', entity: 'Step 1', old: '$89', new: '$79', ip: '192.168.1.1' },
        { id: 'LOG-003', date: 'Jan 26, 2026 09:12', user: 'System', action: 'System Backup', entity: 'Database', old: '-', new: '-', ip: 'localhost' },
        { id: 'LOG-004', date: 'Jan 27, 2026 11:45', user: 'SuperUser', action: 'Toggle Step', entity: 'Step 6', old: 'Off', new: 'On', ip: '10.0.0.45' },
    ];

    return (
        <div className="p-8 bg-slate-50 min-h-screen max-w-6xl mx-auto font-sans">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="text-slate-700" /> {t.title}
                    </h1>
                    <p className="text-slate-500 mt-1">{t.subtitle}</p>
                </div>
                <button className="text-slate-600 hover:text-slate-900 flex items-center gap-2 text-sm font-medium border border-slate-300 px-4 py-2 rounded-lg bg-white hover:bg-slate-50">
                    <Download size={16} /> {t.export}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200">

                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input type="text" placeholder={t.searchPlaceholder} className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                            <tr className="border-b border-slate-200">
                                <th className="px-6 py-3">{t.table.timestamp}</th>
                                <th className="px-6 py-3">{t.table.user}</th>
                                <th className="px-6 py-3">{t.table.action}</th>
                                <th className="px-6 py-3">{t.table.entity}</th>
                                <th className="px-6 py-3">{t.table.changes}</th>
                                <th className="px-6 py-3 text-right">{t.table.ip}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-3">
                                        <div className="font-mono text-slate-900">{log.date}</div>
                                        <div className="text-xs text-slate-400 font-mono">{log.id}</div>
                                    </td>
                                    <td className="px-6 py-3 font-medium text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                {log.user.charAt(0)}
                                            </div>
                                            {log.user}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-slate-600">{log.entity}</td>
                                    <td className="px-6 py-3">
                                        <div className="flex items-center gap-2 font-mono text-xs">
                                            <span className="text-red-500 bg-red-50 px-1 rounded">{log.old}</span>
                                            <span className="text-slate-300">→</span>
                                            <span className="text-green-600 bg-green-50 px-1 rounded font-bold">{log.new}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 text-right text-slate-400 font-mono text-xs">{log.ip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
