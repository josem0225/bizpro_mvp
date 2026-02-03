import React, { useState, useEffect } from "react";
import { FileText, ShieldCheck } from "lucide-react";

export default function DocumentPreview({ businessName, language }: { businessName: string, language: 'es' | 'en' }) {
    return (
        <div className="relative w-full max-w-lg mx-auto bg-white text-black p-8 rounded-sm shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 mb-12 border border-gray-200">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <span className="text-6xl font-bold -rotate-45 uppercase">DRAFT</span>
            </div>

            {/* Header / Seal */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-6">
                <div>
                    <div className="text-xs uppercase font-bold text-slate-500 tracking-wider">DRAFT</div>
                    <div className="font-serif text-lg font-bold text-[var(--navy-brand)] mt-1">Estado de Florida</div>
                    <div className="text-[10px] text-slate-500">Departamento de Estado - División de Corporaciones</div>
                </div>
                <div className="w-12 h-12 rounded-full border-2 border-[var(--gold)] flex items-center justify-center opacity-80">
                    <span className="text-[var(--gold)] text-[8px] font-bold text-center leading-tight">OFFICIAL<br />SEAL</span>
                </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
                <h3 className="font-serif text-xl font-bold uppercase underline decoration-double decoration-[var(--navy-brand)]">ARTÍCULOS DE ORGANIZACIÓN</h3>
            </div>

            {/* Content Body */}
            <div className="space-y-4 text-xs font-serif leading-relaxed">
                <p>Por la presente se certifica que:</p>

                <div className="pl-4 border-l-2 border-[var(--gold)] py-1 my-4 bg-slate-50">
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Nombre de la Entidad Proposed</div>
                    <div className="text-lg font-bold text-[var(--navy-brand)]">{businessName}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                        <div className="font-bold mb-1">Tipo:</div>
                        <div>Limited Liability Company</div>
                    </div>
                    <div>
                        <div className="font-bold mb-1">Fecha de Efecto:</div>
                        <div>{new Date().toLocaleDateString()}</div>
                    </div>
                    <div>
                        <div className="font-bold mb-1">Estatus:</div>
                        <div className="text-[var(--gold)] font-bold">PENDIENTE DE PAGO</div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-end">
                <div className="text-[10px] text-gray-400">
                    {/* Fix: docRef was undefined. We can generate a dummy one or use a prop if available. Using a dummy for now. */}
                    Doc Ref: {Math.random().toString(36).substring(7).toUpperCase()}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-blue-600">
                    <FileText className="w-3 h-3" />
                    <span>BizPro Verified Draft</span>
                </div>
            </div>
        </div>
    );
}
