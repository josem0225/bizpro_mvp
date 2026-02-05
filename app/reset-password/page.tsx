"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useBizPro } from "@/app/context/BizProContext";

export default function ResetPasswordPage() {
    const { language } = useBizPro();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const t = {
        es: {
            windowTitle: "Restablecer Contraseña",
            headline: "Crea tu nueva contraseña",
            subheadline: "Asegúrate de que sea segura y fácil de recordar para ti.",
            passLabel: "Nueva Contraseña",
            confirmLabel: "Confirmar Contraseña",
            placeholder: "••••••••",
            submitBtn: "Cambiar Contraseña",
            successTitle: "¡Contraseña Actualizada!",
            successMsg: "Tu contraseña ha sido modificada exitosamente. Ya puedes iniciar sesión.",
            loginBtn: "Ir al Login",
            errorMatch: "Las contraseñas no coinciden.",
            errorLength: "La contraseña debe tener al menos 6 caracteres.",
            secureTag: "Encriptación SSL"
        },
        en: {
            windowTitle: "Reset Password",
            headline: "Create new password",
            subheadline: "Make sure it's secure and easy for you to remember.",
            passLabel: "New Password",
            confirmLabel: "Confirm Password",
            placeholder: "••••••••",
            submitBtn: "Reset Password",
            successTitle: "Password Updated!",
            successMsg: "Your password has been successfully changed. You can now login.",
            loginBtn: "Go to Login",
            errorMatch: "Passwords do not match.",
            errorLength: "Password must be at least 6 characters.",
            secureTag: "SSL Encryption"
        }
    };

    const text = language === 'en' ? t.en : t.es;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError(text.errorMatch);
            return;
        }

        if (password.length < 6) {
            setError(text.errorLength);
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">

            {/* Left Column: Form */}
            <div className="flex flex-col justify-center items-center p-8 lg:p-12 relative border-r border-slate-100">

                <div className="w-full max-w-sm">
                    {!isSubmitted ? (
                        <>
                            <div className="mb-8 text-center">
                                <div className="w-16 h-16 bg-indigo-50 text-[var(--navy-brand)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Lock className="w-8 h-8" />
                                </div>
                                <h1 className="text-3xl font-bold mb-3 text-slate-900">{text.headline}</h1>
                                <p className="text-slate-500 text-base leading-relaxed">
                                    {text.subheadline}
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-100 animate-in fade-in">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {text.passLabel}
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                                        placeholder={text.placeholder}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {text.confirmLabel}
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                                        placeholder={text.placeholder}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 rounded-xl font-bold bg-[var(--navy-brand)] text-white shadow-lg shadow-indigo-900/10 hover:bg-[#1a1a3a] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {text.submitBtn}
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center animate-in fade-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-3">{text.successTitle}</h2>
                            <p className="text-slate-500 mb-8 leading-relaxed">
                                {text.successMsg}
                            </p>

                            <button
                                onClick={() => router.push('/login')}
                                className="w-full py-3.5 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-all"
                            >
                                {text.loginBtn}
                            </button>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-8 text-center text-slate-400 text-xs">
                    &copy; 2026 BizPro USA LLC
                </div>
            </div>

            {/* Right Column: Visual (Pure White + Dashboard Illustration) */}
            <div className="hidden lg:flex relative bg-white items-center justify-center p-12 overflow-hidden">
                <div className="w-full max-w-lg flex flex-col items-center justify-center">
                    {/* Dashboard Mockup - Simplified */}
                    <div className="relative w-full bg-white border border-slate-200/60 rounded-2xl shadow-[var(--card-shadow)] overflow-hidden opacity-90 grayscale-[20%]">
                        {/* Browser Bar */}
                        <div className="bg-slate-50/50 border-b border-slate-100 p-3 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                            </div>
                        </div>
                        {/* Abstract Content */}
                        <div className="p-8 space-y-4">
                            <div className="h-4 w-1/3 bg-slate-100 rounded"></div>
                            <div className="h-20 w-full bg-slate-50 rounded border border-slate-100/50"></div>
                            <div className="h-20 w-full bg-slate-50 rounded border border-slate-100/50"></div>
                        </div>
                    </div>

                    <div className="mt-10 text-center max-w-md mx-auto">
                        <div className="flex justify-center gap-4">
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full border-2 border-slate-300"></div>
                                <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">{text.secureTag}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
