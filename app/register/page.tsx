import AuthForm from "@/app/components/AuthForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export default function RegisterPage() {
    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--navy-deep)]">

            {/* Left Column: Form */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-16 relative">
                <div className="absolute top-8 left-8">
                    <Link href="/" className="flex items-center text-[var(--text-gray)] hover:text-white transition-colors text-sm gap-2">
                        <ArrowLeft className="w-4 h-4" /> Volver al inicio
                    </Link>
                </div>

                <Suspense fallback={<div className="text-white">Cargando...</div>}>
                    <AuthForm initialMode="register" />
                </Suspense>

                <div className="absolute bottom-8 text-center text-[var(--text-gray)] text-xs">
                    &copy; 2026 BizPro LLC
                </div>
            </div>

            {/* Right Column: Visual (Hidden on Mobile) */}
            <div className="hidden lg:block relative bg-[var(--navy-brand)] overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.2)_0%,var(--navy-deep)_80%)]"></div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="relative z-10 w-full h-full flex flex-col justify-center px-16 text-white">
                    <div className="max-w-md">
                        <div className="w-12 h-12 bg-[var(--success)] rounded-xl flex items-center justify-center text-xl font-bold mb-8">
                            Start
                        </div>
                        <h2 className="text-4xl font-bold mb-6">Tu negocio empieza hoy.</h2>
                        <p className="text-lg text-[var(--text-gray)] leading-relaxed">
                            Crea tu cuenta y obtén acceso inmediato a las herramientas que simplifican el caos legal.
                        </p>

                        <div className="mt-12 flex gap-4">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex-1">
                                <div className="text-2xl font-bold mb-1">Gratis</div>
                                <div className="text-xs text-gray-400">Para empezar</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex-1">
                                <div className="text-2xl font-bold mb-1">Seguro</div>
                                <div className="text-xs text-gray-400">Datos encriptados</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
