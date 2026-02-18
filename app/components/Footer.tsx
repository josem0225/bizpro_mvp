"use client";

import { useBizPro } from "@/app/context/BizProContext";
import Image from "next/image";

export default function Footer() {
    const { language, data } = useBizPro();

    return (
        <footer className="border-t border-slate-100 py-12 mt-12 text-center text-slate-400 text-sm">
            <div className="w-[90%] max-w-[var(--container-width)] mx-auto flex flex-col items-center">
                <div className="mb-8 opacity-90">
                    <Image
                        src="/logos/bizpro-logo-navy.svg"
                        alt="BizPro Logo"
                        width={80}
                        height={80}
                        className="h-20 w-20"
                    />
                </div>
                <p>&copy; 2026 BizPro LLC. {language === 'es' ? "Todos los derechos reservados." : "All rights reserved."}</p>
                <p className="mt-2.5">
                    {data.content.ui.footer.disclaimer[language]}
                </p>
            </div>
        </footer>
    );
}
