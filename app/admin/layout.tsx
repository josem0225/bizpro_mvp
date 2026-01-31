"use client";

import Link from "next/link";
import { LayoutDashboard, Users, CreditCard, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[var(--background)] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[var(--navy-brand)] border-r border-[var(--glass-border)] flex flex-col fixed h-full z-20">
                <div className="p-6 border-b border-[var(--glass-border)]">
                    <span className="text-2xl font-bold text-white">BizPro</span>
                    <span className="text-xs text-[var(--gold)] ml-2 uppercase font-mono">Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-[var(--blue-electric)] text-white rounded-xl shadow-lg transition-all">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-[var(--text-gray)] hover:bg-white/5 hover:text-white rounded-xl transition-all">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">Clientes</span>
                    </Link>
                    <Link href="/admin/finance" className="flex items-center gap-3 px-4 py-3 text-[var(--text-gray)] hover:bg-white/5 hover:text-white rounded-xl transition-all">
                        <CreditCard className="w-5 h-5" />
                        <span className="font-medium">Finanzas</span>
                    </Link>
                    <Link href="/admin/builder" className="flex items-center gap-3 px-4 py-3 text-[var(--text-gray)] hover:bg-white/5 hover:text-white rounded-xl transition-all">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Configuración</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-[var(--glass-border)]">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Salir</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
