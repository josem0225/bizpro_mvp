"use client";

import { useBizPro } from "@/app/context/BizProContext";
import { Mail, Phone, CheckCircle, User, Clock, FileText, Lock, Calendar, Download, Send, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface ClientDrawerProps {
    user: any;
    onClose: () => void;
}

export default function ClientDrawer({ user, onClose }: ClientDrawerProps) {
    const { language } = useBizPro();
    const [note, setNote] = useState("");
    const [lastReminder, setLastReminder] = useState<string | null>("Yesterday, 2:30 PM");

    const handleSendReminder = () => {
        alert(`Reminder sent to ${user.email}`);
        setLastReminder("Just now");
    };

    const text = {
        es: {
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
            auditLog: "Acciones registradas en el log de auditoría.",
            docsTitle: "Expediente Digital",
            unlockStep: "Desbloquear Paso",
            reminderTitle: "Recordatorios",
            sendReminder: "Enviar Recordatorio Manual",
            lastReminderLabel: "Último enviado:",
            notePlaceholder: "Escribir nota..."
        },
        en: {
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
            auditLog: "Actions recorded in audit log.",
            docsTitle: "Digital File",
            unlockStep: "Unlock Step",
            reminderTitle: "Reminders",
            sendReminder: "Send Manual Reminder",
            lastReminderLabel: "Last sent:",
            notePlaceholder: "Write a note..."
        }
    };

    const t = language === 'es' ? text.es : text.en;

    return (
        <>
            <div
                className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                onClick={onClose}
            ></div>
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto border-l border-slate-200">
                {/* Drawer Header */}
                <div className="p-6 border-b border-slate-100 bg-slate-50 sticky top-0 z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex gap-4 items-center">
                            <div className="w-14 h-14 rounded-full bg-[var(--navy-brand)] flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-[var(--navy-brand)]">{user.name}</h2>
                                <p className="text-slate-500 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    {t.activeClient}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                        >
                            <span className="sr-only">Close</span>
                            ✕
                        </button>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between group hover:border-blue-400 transition-all cursor-pointer" onClick={() => navigator.clipboard.writeText(user.email)}>
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                    <Mail size={16} />
                                </div>
                                <div className="truncate text-sm font-bold text-slate-700 select-all">
                                    {user.email || "email@example.com"}
                                </div>
                            </div>
                            <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Copiar</span>
                        </div>

                        <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between group hover:border-green-400 transition-all cursor-pointer" onClick={() => navigator.clipboard.writeText("+1 (555) 123-4567")}>
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                                    <Phone size={16} />
                                </div>
                                <div className="truncate text-sm font-bold text-slate-700 select-all">
                                    +1 (555) 123-4567
                                </div>
                            </div>
                            <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">Copiar</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-8">
                    {/* CRM Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t.ltv}</div>
                            <div className="text-2xl font-bold text-[var(--navy-brand)]">$1,240</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="text-xs font-bold text-slate-400 uppercase mb-1">{t.lastActivity}</div>
                            <div className="text-sm font-bold text-slate-700">{t.lastActivityTime}</div>
                            <div className="text-xs text-slate-400">{t.viewing}</div>
                        </div>
                    </div>

                    {/* MANUAL REMINDER (Request #1) */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {t.reminderTitle}
                        </h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-sm text-amber-900 bg-white/50 p-2 rounded-lg">
                                <span>{t.lastReminderLabel}</span>
                                <span className="font-bold">{lastReminder || "Never"}</span>
                            </div>
                            <button
                                onClick={handleSendReminder}
                                className="w-full py-2 bg-white border border-amber-300 text-amber-800 rounded-lg text-sm font-bold hover:bg-amber-100 flex items-center justify-center gap-2 transition-colors shadow-sm"
                            >
                                <Send className="w-4 h-4" /> {t.sendReminder}
                            </button>
                        </div>
                    </div>

                    {/* DOCUMENT ACCESS (Request #2) */}
                    <div>
                        <h3 className="text-sm font-bold text-[var(--navy-brand)] uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> {t.docsTitle}
                        </h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 text-blue-600 p-2 rounded"><FileText size={16} /></div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-700">Operating Agreement</div>
                                        <div className="text-xs text-slate-400">PDF • 2.4 MB</div>
                                    </div>
                                </div>
                                <Download size={16} className="text-slate-300 group-hover:text-blue-600" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-50 text-blue-600 p-2 rounded"><FileText size={16} /></div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-700">EIN Confirmation</div>
                                        <div className="text-xs text-slate-400">PDF • 1.1 MB</div>
                                    </div>
                                </div>
                                <Download size={16} className="text-slate-300 group-hover:text-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Notes / Timeline */}
                    <div>
                        <h3 className="text-sm font-bold text-[var(--navy-brand)] uppercase tracking-wider mb-4">{t.notesTitle}</h3>
                        <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-emerald-500 text-slate-500 group-[.is-active]:text-emerald-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm ml-4">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-slate-900 text-sm">{t.paymentCompleted}</div>
                                        <time className="font-mono text-xs text-slate-500">Hoy</time>
                                    </div>
                                    <div className="text-slate-500 text-xs">{t.paymentNote}</div>
                                </div>
                            </div>
                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-100 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <User className="w-5 h-5" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-4 rounded-xl border border-slate-200 shadow-sm ml-4">
                                    <div className="flex items-center justify-between space-x-2 mb-1">
                                        <div className="font-bold text-slate-900 text-sm">{t.registration}</div>
                                        <time className="font-mono text-xs text-slate-500">Ayer</time>
                                    </div>
                                    <div className="text-slate-500 text-xs">{t.registrationNote}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Control (Request #3) */}
                    <div className="pt-6 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Lock size={14} /> Admin Controls
                        </h3>
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-slate-700">Blocked at Step 3</span>
                                <button className="px-3 py-1 bg-white border border-slate-200 text-xs font-bold text-[var(--navy-brand)] rounded hover:bg-slate-100">{t.unlockStep}</button>
                            </div>
                        </div>

                    </div>

                    {/* Super Admin Actions */}
                    <div className="pt-6 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-[var(--navy-brand)] uppercase tracking-wider mb-4">{t.dangerZone}</h3>
                        <div className="space-y-3">
                            <button className="w-full py-3 bg-[var(--navy-brand)] text-white rounded-xl font-bold hover:bg-[#1e1e38] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                                <User className="w-4 h-4" />
                                {t.impersonate}
                            </button>
                            <button className="w-full py-3 bg-white border border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                                <span className="w-4 h-4">✕</span>
                                {t.resetPassword}
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 text-center mt-4">
                            {t.auditLog}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
