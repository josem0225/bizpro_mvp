"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle, Loader2 } from "lucide-react";
import { useBizPro } from "@/app/context/BizProContext";

export default function ForgotPasswordPage() {
    const { language } = useBizPro();
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const t = {
        es: {
            backLogin: "Volver al Login",
            headline: "Recuperar Contraseña",
            subheadline: "No te preocupes, nos pasa a todos. Ingresa tu correo y te ayudaremos a restaurar tu acceso.",
            emailLabel: "Correo Electrónico",
            emailPlaceholder: "nombre@ejemplo.com",
            submitBtn: "Enviar Instrucciones",
            successTitle: "¡Correo Enviado!",
            successMsg: "Si existe una cuenta asociada a",
            successMsg2: "recibirás un enlace de recuperación en unos momentos.",
            tryOther: "Intentar con otro correo",
            feature1: "Seguro & Encriptado",
            feature2: "Soporte 24/7"
        },
        en: {
            backLogin: "Back to Login",
            headline: "Reset Password",
            subheadline: "Don't worry, it happens. Enter your email and we'll help you restore access.",
            emailLabel: "Email Address",
            emailPlaceholder: "name@example.com",
            submitBtn: "Send Instructions",
            successTitle: "Email Sent!",
            successMsg: "If there is an account associated with",
            successMsg2: "you will receive a recovery link shortly.",
            tryOther: "Try another email",
            feature1: "Secure & Encrypted",
            feature2: "24/7 Support"
        }
    };

    const text = language === 'en' ? t.en : t.es;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
                <div className="absolute top-8 left-8">
                    <Link href="/login" className="flex items-center text-[var(--navy-brand)] hover:opacity-80 transition-opacity text-sm gap-2 font-bold">
                        <ArrowLeft className="w-5 h-5" /> {text.backLogin}
                    </Link>
                </div>

                <div className="w-full max-w-sm">
                    {!isSubmitted ? (
                        <>
                            <div className="mb-8 text-center">
                                <div className="w-16 h-16 bg-blue-50 text-[var(--navy-brand)] rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <h1 className="text-3xl font-bold mb-3 text-slate-900">{text.headline}</h1>
                                <p className="text-slate-500 text-base leading-relaxed">
                                    {text.subheadline}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                        {text.emailLabel}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                                        placeholder={text.emailPlaceholder}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 rounded-xl font-bold bg-[var(--navy-brand)] text-white shadow-lg shadow-indigo-900/10 hover:bg-[#1a1a3a] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            {text.submitBtn}
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
                                {text.successMsg} <strong>{email}</strong>, {text.successMsg2}
                            </p>

                            {/* DEMO PURPOSES ONLY: Link manually to reset password since we don't have email */}
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg mb-6 text-xs text-amber-800">
                                <strong>DEMO HELP:</strong>
                                <br />
                                <Link href="/reset-password" className="underline font-bold mt-1 block">
                                    Click here to simulate clicking the email link
                                </Link>
                            </div>

                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="text-[var(--navy-brand)] hover:underline text-sm font-medium"
                            >
                                {text.tryOther}
                            </button>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-8 text-center text-slate-400 text-xs">
                    &copy; 2026 BizPro LLC
                </div>
            </div>

            {/* Right Column: Visual (Pure White + Dashboard Illustration) */}
            <div className="hidden lg:flex relative bg-white items-center justify-center p-12 overflow-hidden">
                <div className="w-full max-w-lg flex flex-col items-center justify-center">
                    {/* Dashboard Mockup (Reuse from Login) */}
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
                            <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                            <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                            <div className="h-32 w-full bg-slate-50 rounded border border-slate-100/50"></div>
                        </div>
                    </div>

                    <div className="mt-10 text-center max-w-md mx-auto">
                        <div className="flex justify-center gap-4">
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                                <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">{text.feature1}</div>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <div className="text-xs text-slate-600 font-bold uppercase tracking-wider">{text.feature2}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
