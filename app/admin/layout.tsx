"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, CreditCard, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[var(--navy-brand)] border-r border-indigo-900/50 flex flex-col fixed h-full z-20 shadow-xl">
                <div className="p-6 border-b border-indigo-900/50 flex items-center gap-4">
                    <Image
                        src="/logos/bizpro-logo-white.svg"
                        alt="BizPro Logo"
                        width={48}
                        height={48}
                        className="h-12 w-12"
                    />
                    <div>
                        <div className="font-bold text-white text-xl leading-tight">BizPro</div>
                        <div className="text-[10px] text-indigo-300 uppercase font-mono tracking-wider">Admin Panel</div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 text-white rounded-xl shadow-sm transition-all border border-white/10">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                        <Users className="w-5 h-5" />
                        <span className="font-medium">Clientes</span>
                    </Link>
                    <Link href="/admin/finance" className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                        <CreditCard className="w-5 h-5" />
                        <span className="font-medium">Finanzas</span>
                    </Link>
                    <Link href="/admin/builder" className="flex items-center gap-3 px-4 py-3 text-indigo-200 hover:bg-white/5 hover:text-white rounded-xl transition-all">
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Configuración</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-indigo-900/50">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-red-500/20 hover:text-red-200 rounded-xl transition-all">
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
