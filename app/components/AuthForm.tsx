"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import { useBizPro } from "@/app/context/BizProContext";

export default function AuthForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode") === "register" ? "register" : "login";
    const { login } = useBizPro();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network delay & Fake Login
        setTimeout(() => {
            const fakeName = email.split('@')[0] || "Usuario";
            // Capitalize first letter
            const formattedName = fakeName.charAt(0).toUpperCase() + fakeName.slice(1);

            login(formattedName);
            setIsLoading(false);
            router.push("/dashboard");
        }, 800);
    };

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2 text-white">
                    {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
                </h1>
                <p className="text-[var(--text-gray)] mb-6">
                    {mode === "login"
                        ? "Ingresa tus credenciales para continuar"
                        : "Comienza a organizar tu negocio hoy mismo"}
                </p>

                {/* DEMO FAST ACCESS */}
                <button
                    type="button"
                    onClick={() => {
                        login("Carlos Emprendedor");
                        router.push("/dashboard");
                    }}
                    className="w-full py-3 border-2 border-dashed border-[var(--gold)]/50 bg-[var(--gold)]/10 text-[var(--gold)] rounded-xl font-bold hover:bg-[var(--gold)]/20 transition-all flex items-center justify-center gap-2 mb-6"
                >
                    🚀 Acceso Rápido (DEMO)
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] focus:ring-1 focus:ring-[var(--blue-electric)] transition-all"
                        placeholder="nombre@ejemplo.com"
                    />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-medium text-[var(--text-gray)]">
                            Contraseña
                        </label>
                        {mode === "login" && (
                            <a href="#" className="text-xs text-[var(--blue-glow)] hover:text-white transition-colors">
                                ¿Olvidaste tu contraseña?
                            </a>
                        )}
                    </div>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] focus:ring-1 focus:ring-[var(--blue-electric)] transition-all"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl font-bold bg-[var(--blue-electric)] text-white shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:bg-[#2563EB] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {mode === "login" ? "Ingresar" : "Crear Cuenta"}
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-[var(--text-gray)]">
                {mode === "login" ? (
                    <p>¿No tienes una cuenta? <button type="button" onClick={() => router.push("/login?mode=register")} className="text-[var(--blue-glow)] font-semibold hover:text-white ml-1">Regístrate gratis</button></p>
                ) : (
                    <p>¿Ya tienes cuenta? <button type="button" onClick={() => router.push("/login")} className="text-[var(--blue-glow)] font-semibold hover:text-white ml-1">Inicia sesión</button></p>
                )}
            </div>

            <div className="mt-8 relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--glass-border)]"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-[var(--navy-deep)] px-2 text-[var(--text-gray)] uppercase">O continúa con</span>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-[var(--glass-border)] rounded-xl bg-[var(--glass-bg)] hover:bg-white/5 transition-colors">
                    <span className="text-white text-sm font-medium">Google</span>
                </button>
                <button type="button" className="flex items-center justify-center px-4 py-2 border border-[var(--glass-border)] rounded-xl bg-[var(--glass-bg)] hover:bg-white/5 transition-colors">
                    <span className="text-white text-sm font-medium">Apple</span>
                </button>
            </div>

        </div>
    );
}
