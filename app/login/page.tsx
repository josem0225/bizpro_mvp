import AuthForm from "@/app/components/AuthForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export default function LoginPage() {
    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

            {/* Left Column: Form */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-12 relative border-r border-slate-100">
                <div className="absolute top-8 left-8">
                    <Link href="/" className="flex items-center text-[var(--navy-brand)] hover:opacity-80 transition-opacity text-sm gap-2 font-bold">
                        <ArrowLeft className="w-5 h-5" /> Volver al inicio
                    </Link>
                </div>

                <div className="w-full max-w-sm">
                    <Suspense fallback={<div className="text-[var(--navy-brand)]">Cargando...</div>}>
                        <AuthForm />
                    </Suspense>
                </div>

                <div className="absolute bottom-8 text-center text-slate-400 text-xs">
                    &copy; 2026 BizPro USA LLC
                </div>
            </div>

            {/* Right Column: Visual (Pure White + Dashboard Illustration) */}
            <div className="hidden lg:flex relative bg-white items-center justify-center p-12 overflow-hidden">
                <div className="w-full max-w-lg flex flex-col items-center justify-center">
                    {/* Dashboard Mockup (Scaled down for better breathing room) */}
                    <div className="relative w-full bg-white border border-slate-200/60 rounded-2xl shadow-[var(--card-shadow)] overflow-hidden">
                        {/* Browser Bar */}
                        <div className="bg-slate-50/50 border-b border-slate-100 p-3 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                            </div>
                            <div className="mx-auto bg-white border border-slate-200/50 px-3 py-1 rounded-md text-[9px] text-slate-400 font-mono">
                                bizpro.app/dashboard
                            </div>
                        </div>

                        {/* App Interface */}
                        <div className="grid grid-cols-[120px_1fr] min-h-[300px] text-left">
                            {/* Sidebar */}
                            <div className="bg-slate-50 border-r border-slate-100 p-4">
                                <div className="h-2.5 w-16 bg-slate-200 rounded mb-6"></div>
                                <div className="space-y-3">
                                    <div className="h-2 w-full bg-[var(--navy-brand)]/10 rounded px-2 py-2.5 flex items-center"></div>
                                    <div className="h-2 w-3/4 bg-slate-200/50 rounded ml-1"></div>
                                    <div className="h-2 w-5/6 bg-slate-200/50 rounded ml-1"></div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="p-5 bg-white">
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <div className="h-3.5 w-32 bg-slate-900/5 rounded mb-2"></div>
                                        <div className="h-2 w-20 bg-slate-400/10 rounded"></div>
                                    </div>
                                    <div className="h-6 w-6 rounded-full bg-slate-100"></div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm">
                                        <div className="h-1.5 w-12 bg-slate-200 rounded mb-3"></div>
                                        <div className="h-4 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-[10px] font-bold">100%</div>
                                    </div>
                                    <div className="p-3 rounded-xl border border-slate-100 bg-white shadow-sm">
                                        <div className="h-1.5 w-12 bg-slate-200 rounded mb-3"></div>
                                        <div className="h-4 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">2/5</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="h-10 border border-slate-100 rounded-lg p-2.5 flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                            {/* Check Icon simulated */}
                                            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm"></div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="h-1.5 w-16 bg-slate-800/10 rounded mb-1"></div>
                                            <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full w-full bg-emerald-400"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 text-center max-w-md mx-auto">
                        <h2 className="text-2xl font-bold text-[var(--navy-brand)] mb-3">Coordina tu negocio sin sorpresas.</h2>
                        <p className="text-slate-500 text-base leading-relaxed mb-6">
                            Unete a más de 500 emprendedores latinos que ya han formalizado su negocio en Florida con nuestra guía paso a paso.
                        </p>

                        <div className="flex justify-center gap-4">
                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 w-28">
                                <div className="text-lg font-bold text-slate-900 mb-0.5">100%</div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase">En Español</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 w-28">
                                <div className="text-lg font-bold text-slate-900 mb-0.5">$0</div>
                                <div className="text-[10px] text-slate-400 font-medium uppercase">Costos Ocultos</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
