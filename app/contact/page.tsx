"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Send, CheckCircle, Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans">
            <Navbar />

            <div className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">

                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Estamos aquí para ayudarte.</h1>
                        <p className="text-xl text-[var(--text-gray)] max-w-2xl mx-auto">
                            ¿Tienes dudas antes de empezar? ¿Problemas técnicos? Escríbenos.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-8 rounded-2xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-[var(--blue-electric)]" /> Correo Electrónico
                                </h3>
                                <p className="text-[var(--text-gray)] mb-2">Para soporte general y comercial:</p>
                                <a href="mailto:hola@bizpro.com" className="text-xl font-medium hover:text-[var(--blue-electric)] transition-colors">hola@bizpro.com</a>
                            </div>

                            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-8 rounded-2xl">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-[var(--blue-electric)]" /> Chat en Vivo
                                </h3>
                                <p className="text-[var(--text-gray)] mb-4">Disponible Lun-Vie, 9am - 5pm EST.</p>
                                <button className="px-6 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[var(--glass-border)] transition-all">
                                    Iniciar Chat
                                </button>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-8 rounded-2xl shadow-xl">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">Nombre</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--blue-electric)]" placeholder="Tu nombre" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">Apellido</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--blue-electric)]" placeholder="Tu apellido" required />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">Correo Electrónico</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--blue-electric)]" placeholder="tucorreo@ejemplo.com" required />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text-gray)] mb-1.5">Mensaje</label>
                                        <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[var(--glass-border)] text-white focus:outline-none focus:border-[var(--blue-electric)]" placeholder="¿Cómo podemos ayudarte?" required></textarea>
                                    </div>

                                    <button type="submit" className="w-full py-4 rounded-xl font-bold bg-[var(--blue-electric)] text-white shadow-lg hover:bg-[#2563EB] transition-all flex items-center justify-center gap-2">
                                        <Send className="w-4 h-4" /> Enviar Mensaje
                                    </button>
                                </form>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                                    <CheckCircle className="w-16 h-16 text-[var(--success)] mb-6" />
                                    <h3 className="text-2xl font-bold mb-2">¡Mensaje Recibido!</h3>
                                    <p className="text-[var(--text-gray)]">
                                        Gracias por contactarnos. Nuestro equipo te responderá en menos de 24 horas.
                                    </p>
                                    <button onClick={() => setIsSubmitted(false)} className="mt-8 text-[var(--blue-glow)] hover:text-white underline">
                                        Enviar otro mensaje
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
