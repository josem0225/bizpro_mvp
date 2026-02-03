"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, DollarSign, Rocket, ShieldCheck } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-20 shadow-lg">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <Image
                        src="/logos/bizpro-logo-navy.svg"
                        alt="BizPro Logo"
                        width={48}
                        height={48}
                        className="h-12 w-12"
                        priority
                    />
                    <div>
                        <div className="font-bold text-[var(--navy-brand)] text-xl leading-tight tracking-tight">BizPro</div>
                        <div className="text-[10px] text-slate-400 uppercase font-mono tracking-wider font-semibold">Admin Panel</div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-[var(--navy-brand)] text-white rounded-xl shadow-md transition-all">
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-bold">Dashboard</span>
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[var(--navy-brand)] rounded-xl transition-all font-medium">
                        <Users className="w-5 h-5" />
                        <span className="">Clientes</span>
                    </Link>
                    <Link href="/admin/finance" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[var(--navy-brand)] rounded-xl transition-all font-medium">
                        <CreditCard className="w-5 h-5" />
                        <span className="">Finanzas</span>
                    </Link>
                    <Link href="/admin/builder" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-[var(--navy-brand)] rounded-xl transition-all font-medium">
                        <Settings className="w-5 h-5" />
                        <span className="">Configuración</span>
                    </Link>

                    <div className="pt-4 pb-2">
                        <div className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Management</div>
                        <Link href="/admin/pricing" className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all font-medium group">
                            <DollarSign className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                            <span className="text-sm">Pricing Manager</span>
                        </Link>
                        <Link href="/admin/steps" className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-purple-600 rounded-xl transition-all font-medium group">
                            <Rocket className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
                            <span className="text-sm">Step Activation</span>
                        </Link>
                        <Link href="/admin/audit" className="flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all font-medium group">
                            <ShieldCheck className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
                            <span className="text-sm">Audit Log</span>
                        </Link>
                    </div>
                </nav>

                <div className="p-4 border-t border-slate-100 bg-slate-50">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all font-bold">
                        <LogOut className="w-5 h-5" />
                        <span className="">Salir</span>
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
