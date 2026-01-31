"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // Simulate API call
    };

    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[var(--navy-deep)]">
            <div className="flex flex-col justify-center items-center p-8 lg:p-16 relative">
                <div className="absolute top-8 left-8">
                    <Link href="/login" className="flex items-center text-[var(--text-gray)] hover:text-white transition-colors text-sm gap-2">
                        <ArrowLeft className="w-4 h-4" /> Volver al Login
                    </Link>
                </div>

                <div className="w-full max-w-sm">
                    {!isSubmitted ? (
                        <>
                            <div className="mb-8 text-center">
                                <h1 className="text-3xl font-bold mb-2 text-white">Recuperar Contraseña</h1>
                                <p className="text-[var(--text-gray)]">
                                    Ingresa tu correo y te enviaremos instrucciones.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
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

                                <button
                                    type="submit"
                                    className="w-full py-3.5 rounded-xl font-bold bg-[var(--blue-electric)] text-white shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:bg-[#2563EB] transition-all flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-4 h-4" /> Enviar Instrucciones
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-16 h-16 bg-[var(--success)]/20 text-[var(--success)] rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">¡Correo Enviado!</h2>
                            <p className="text-[var(--text-gray)] mb-8">
                                Si existe una cuenta asociada a <strong>{email}</strong>, recibirás un enlace de recuperación en unos momentos.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-[var(--blue-glow)] hover:text-white underline text-sm"
                            >
                                Intentar con otro correo
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Simple Visual Right */}
            <div className="hidden lg:block bg-[var(--navy-brand)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,var(--navy-deep),var(--blue-electric)_150%)] opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <p className="text-9xl font-bold text-white rotate-[-10deg]">BizPro</p>
                </div>
            </div>
        </main>
    );
}
