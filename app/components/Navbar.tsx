"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBizPro } from "@/app/context/BizProContext";

export default function Navbar() {
    const { language, toggleLanguage, data, login } = useBizPro();
    const navText = data.content.ui.nav;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        login("Carlos Emprendedor"); // Default demo user
        router.push("/dashboard");
    };

    return (
        <header className="fixed top-0 left-0 w-full h-[var(--header-height)] z-[1000] bg-[rgba(5,5,17,0.8)] backdrop-blur-[10px] border-b border-[var(--glass-border)] flex items-center">
            <div className="w-[90%] max-w-[var(--container-width)] mx-auto flex justify-between items-center">
                {/* Logo - Navigates to Landing */}
                <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2.5 text-[var(--white)]">
                    <div className="w-8 h-8 bg-[var(--blue-electric)] rounded-md flex items-center justify-center text-lg">
                        B
                    </div>
                    BizPro USA
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                    <ul className="flex gap-[30px]">
                        <li>
                            <Link href="#funciona" className="text-[var(--text-gray)] font-medium hover:text-[var(--white)] transition-colors">
                                {navText.howItWorks[language]}
                            </Link>
                        </li>
                        <li>
                            <Link href="#precios" className="text-[var(--text-gray)] font-medium hover:text-[var(--white)] transition-colors">
                                {navText.pricing[language]}
                            </Link>
                        </li>
                        <li>
                            <Link href="#nosotros" className="text-[var(--text-gray)] font-medium hover:text-[var(--white)] transition-colors">
                                {navText.about[language]}
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* CTA Buttons */}
                <div className="flex gap-4 items-center">
                    {/* Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="hidden md:flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white mr-4"
                    >
                        <span className={language === 'es' ? "text-white font-bold" : "text-white/40"}>ES</span>
                        <span className="text-white/40">/</span>
                        <span className={language === 'en' ? "text-white font-bold" : "text-white/40"}>EN</span>
                    </button>

                    {/* Login -> Login Page */}
                    <Link href="/login" className="hidden sm:block text-sm text-[var(--text-gray)] hover:text-white transition-colors">
                        {navText.login[language]}
                    </Link>
                    {/* Start -> Intake */}
                    <Link
                        href="/intake"
                        className="px-5 py-2 text-sm font-semibold rounded-xl bg-[var(--blue-electric)] text-white shadow-[0_4px_15px_rgba(59,130,246,0.4)] hover:translate-y-[-2px] hover:shadow-[0_8px_25px_rgba(59,130,246,0.6)] hover:bg-[#2563EB] transition-all"
                    >
                        {navText.start[language]}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-[var(--header-height)] left-0 w-full bg-[var(--navy-deep)] border-b border-[var(--glass-border)] p-4 md:hidden flex flex-col gap-4">
                    <Link href="#funciona" className="text-[var(--text-gray)] font-medium hover:text-[var(--white)]">
                        {navText.howItWorks[language]}
                    </Link>
                    <Link href="#precios" className="text-[var(--text-gray)] font-medium hover:text-[var(--white)]">
                        {navText.pricing[language]}
                    </Link>
                    <Link href="/login" className="text-left text-[var(--text-gray)] font-medium hover:text-[var(--white)]">
                        {navText.login[language]}
                    </Link>
                    <button onClick={toggleLanguage} className="text-left text-[var(--text-gray)] font-medium hover:text-[var(--white)]">
                        Cambiar Idioma ({language.toUpperCase()})
                    </button>
                </div>
            )}
        </header>
    );
}
