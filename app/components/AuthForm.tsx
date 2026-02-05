"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
    const { login, language } = useBizPro();

    // TRANSLATIONS
    const t = {
        es: {
            welcomeBack: "Bienvenido de nuevo",
            createAccount: "Crea tu cuenta",
            enterCreds: "Ingresa tus credenciales para continuar",
            fillForm: "Completa el formulario para organizar tu negocio",
            demoBtn: "🚀 Acceso Rápido (DEMO)",
            fullName: "Nombre Completo",
            phone: "Teléfono",
            country: "País",
            city: "Ciudad",
            email: "Correo Electrónico",
            confirmEmail: "Confirmar Correo",
            password: "Contraseña",
            forgotPass: "¿Olvidaste tu contraseña?",
            confirmPass: "Confirmar Contraseña",
            loginBtn: "Ingresar",
            registerBtn: "Crear Cuenta",
            noAccount: "¿No tienes una cuenta?",
            registerLink: "Regístrate gratis",
            hasAccount: "¿Ya tienes cuenta?",
            loginLink: "Inicia sesión",
            errors: {
                matchEmail: "Los correos electrónicos no coinciden.",
                matchPass: "Las contraseñas no coinciden.",
                minPass: "La contraseña debe tener al menos 6 caracteres."
            },
            placeholders: {
                name: "Juan Pérez",
                phone: "+1 (555) 000-0000",
                country: "EE.UU.",
                city: "Miami",
                email: "nombre@ejemplo.com",
                repeatEmail: "Repite tu correo"
            }
        },
        en: {
            welcomeBack: "Welcome Back",
            createAccount: "Create your Account",
            enterCreds: "Enter your credentials to continue",
            fillForm: "Fill the form to organize your business",
            demoBtn: "🚀 Fast Access (DEMO)",
            fullName: "Full Name",
            phone: "Phone Number",
            country: "Country",
            city: "City",
            email: "Email Address",
            confirmEmail: "Confirm Email",
            password: "Password",
            forgotPass: "Forgot your password?",
            confirmPass: "Confirm Password",
            loginBtn: "Login",
            registerBtn: "Create Account",
            noAccount: "Don't have an account?",
            registerLink: "Sign up for free",
            hasAccount: "Already have an account?",
            loginLink: "Login here",
            errors: {
                matchEmail: "Emails do not match.",
                matchPass: "Passwords do not match.",
                minPass: "Password must be at least 6 characters."
            },
            placeholders: {
                name: "John Doe",
                phone: "+1 (555) 000-0000",
                country: "USA",
                city: "Miami",
                email: "name@example.com",
                repeatEmail: "Repeat your email"
            }
        }
    };

    const text = language === 'en' ? t.en : t.es;

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
                setError(text.errors.matchEmail);
                return;
            }
            if (password !== confirmPassword) {
                setError(text.errors.matchPass);
                return;
            }
            if (password.length < 6) {
                setError(text.errors.minPass);
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
        <div className="w-full max-w-sm mx-auto bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
            <div className="mb-8 text-center">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/logos/bizpro-logo-navy.svg"
                        alt="BizPro"
                        width={96}
                        height={96}
                        className="h-24 w-24"
                        priority
                    />
                </div>
                <h1 className="text-3xl font-bold mb-2 text-slate-900">
                    {mode === "login" ? text.welcomeBack : text.createAccount}
                </h1>
                <p className="text-slate-500 mb-6">
                    {mode === "login"
                        ? text.enterCreds
                        : text.fillForm}
                </p>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-6 border border-red-100 animate-in fade-in">
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
                    className="w-full py-3 border border-amber-200 bg-amber-50 text-amber-700 rounded-xl font-bold hover:bg-amber-100 transition-all flex items-center justify-center gap-2 mb-6"
                >
                    {text.demoBtn}
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {mode === "register" && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                {text.fullName}
                            </label>
                            <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                                placeholder={text.placeholders.name}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                {text.phone}
                            </label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                                placeholder={text.placeholders.phone}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    {text.country}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                                    placeholder={text.placeholders.country}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                    {text.city}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                                    placeholder={text.placeholders.city}
                                />
                            </div>
                        </div>
                    </>
                )}

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        {text.email}
                    </label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                        placeholder={text.placeholders.email}
                    />
                </div>

                {mode === "register" && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            {text.confirmEmail}
                        </label>
                        <input
                            type="email"
                            required
                            value={confirmEmail}
                            onChange={(e) => setConfirmEmail(e.target.value)}
                            onPaste={(e) => e.preventDefault()} // Block paste for strict security
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                            placeholder={text.placeholders.repeatEmail}
                        />
                    </div>
                )}

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-medium text-slate-700">
                            {text.password}
                        </label>
                        {mode === "login" && (
                            <Link href="/forgot-password" className="text-xs text-[var(--navy-brand)] hover:underline transition-colors">
                                {text.forgotPass}
                            </Link>
                        )}
                    </div>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                        placeholder="••••••••"
                    />
                </div>

                {mode === "register" && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">
                            {text.confirmPass}
                        </label>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] focus:ring-1 focus:ring-[var(--navy-brand)] transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl font-bold bg-[var(--navy-brand)] text-white shadow-lg shadow-indigo-900/10 hover:bg-[#1a1a3a] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            {mode === "login" ? text.loginBtn : text.registerBtn}
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
                {mode === "login" ? (
                    <p>{text.noAccount} <button type="button" onClick={() => router.push("/login?mode=register")} className="text-[var(--navy-brand)] font-bold hover:underline ml-1">{text.registerLink}</button></p>
                ) : (
                    <p>{text.hasAccount} <button type="button" onClick={() => router.push("/login")} className="text-[var(--navy-brand)] font-bold hover:underline ml-1">{text.loginLink}</button></p>
                )}
            </div>
        </div>
    );
}
