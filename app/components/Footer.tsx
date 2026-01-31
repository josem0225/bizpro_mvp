"use client";

import { useBizPro } from "@/app/context/BizProContext";

export default function Footer() {
    const { language, data } = useBizPro();

    return (
        <footer className="border-t border-[var(--glass-border)] py-[50px] mt-[50px] text-center text-[var(--text-gray)] text-sm">
            <div className="w-[90%] max-w-[var(--container-width)] mx-auto">
                <p>&copy; 2026 BizPro USA LLC. {language === 'es' ? "Todos los derechos reservados." : "All rights reserved."}</p>
                <p className="mt-2.5">
                    {data.content.ui.footer.disclaimer[language]}
                </p>
            </div>
        </footer>
    );
}
