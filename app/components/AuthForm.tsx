"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";
import { useBizPro } from "@/app/context/BizProContext";

interface AuthFormProps {
    initialMode?: "login" | "register";
}

export default function AuthForm({ initialMode }: AuthFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // Prioritize prop, then search param, default to login
    const mode = initialMode || (searchParams.get("mode") === "register" ? "register" : "login");
    const { login } = useBizPro();

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    // New fields for real registration
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // VALIDATION LOGIC
        if (mode === "register") {
            if (email !== confirmEmail) {
                setError("Los correos electrónicos no coinciden.");
                return;
            }
            if (password !== confirmPassword) {
                setError("Las contraseñas no coinciden.");
                return;
            }
            if (password.length < 6) {
                setError("La contraseña debe tener al menos 6 caracteres.");
                return;
            }
        }

        setIsLoading(true);

        // Simulate network delay & Fake Login
        setTimeout(() => {
            // Use provided name or fallback
            const finalName = fullName || email.split('@')[0] || "Usuario";
            // Capitalize first letter
            const formattedName = finalName.charAt(0).toUpperCase() + finalName.slice(1);

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
                        : "Completa el formulario para organizar tu negocio"}
                </p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg mb-6 animate-in fade-in">
                        {error}
                    </div>
                )}

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

                {mode === "register" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] focus:ring-1 focus:ring-[var(--blue-electric)] transition-all"
                                placeholder="Juan Pérez"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">
                                Teléfono
                            </label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] focus:ring-1 focus:ring-[var(--blue-electric)] transition-all"
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">
                                    País
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] focus:ring-1 focus:ring-[var(--blue-electric)] transition-all"
                                    placeholder="EE.UU."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">
                                    Ciudad
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] focus:ring-1 focus:ring-[var(--blue-electric)] transition-all"
                                    placeholder="Miami"
                                />
                            </div>
                        </div>
                    </>
                )}

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

                {mode === "register" && (
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">
                            Confirmar Correo
                        </label>
                        <input
                            type="email"
                            required
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            onPaste={(e) => e.preventDefault()} // Block paste for strict security
                            className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] focus:ring-1 focus:ring-[var(--blue-electric)] transition-all"
                            placeholder="Repite tu correo"
                        />
                    </div>
                )}

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

                {mode === "register" && (
                    <div>
                        <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">
                            Confirmar Contraseña
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] focus:ring-1 focus:ring-[var(--blue-electric)] transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                )}

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



        </div>
    );
}
