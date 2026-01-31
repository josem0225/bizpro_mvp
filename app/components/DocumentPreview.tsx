import { FileText, ShieldCheck } from "lucide-react";

export default function DocumentPreview({ businessName, language }: { businessName: string, language: 'es' | 'en' }) {
    return (
        <div className="relative w-full max-w-lg mx-auto bg-white text-black p-8 rounded-sm shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 mb-12 border border-gray-200">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <span className="text-6xl font-bold -rotate-45 uppercase">DRAFT</span>
            </div>

            {/* Header */}
            <div className="text-center border-b-2 border-black pb-4 mb-6">
                <div className="flex justify-center mb-2">
                    <ShieldCheck className="w-12 h-12 text-gray-800" />
                </div>
                <h2 className="font-serif text-xl font-bold uppercase tracking-widest">
                    {language === 'es' ? "Estado de Florida" : "State of Florida"}
                </h2>
                <p className="text-xs uppercase mt-1">
                    {language === 'es' ? "Departamento de Estado - División de Corporaciones" : "Department of State - Division of Corporations"}
                </p>
            </div>

            {/* Body */}
            <div className="font-serif space-y-6 text-sm">
                <div className="text-center">
                    <h3 className="text-lg font-bold underline mb-4">
                        {language === 'es' ? "ARTÍCULOS DE ORGANIZACIÓN" : "ARTICLES OF ORGANIZATION"}
                    </h3>
                    <p>
                        {language === 'es' ? "Por la presente se certifica que:" : "Hereby certifies that:"}
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 text-center">
                    <p className="text-xs text-gray-500 uppercase mb-1">
                        {language === 'es' ? "Nombre de la Entidad Proposed" : "Proposed Entity Name"}
                    </p>
                    <p className="text-2xl font-bold text-blue-900 font-sans">
                        {businessName || "TU NEGOCIO LLC"}
                    </p>
                </div>

                <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span>{language === 'es' ? "Tipo:" : "Type:"}</span>
                        <span className="font-mono">Limited Liability Company</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span>{language === 'es' ? "Fecha de Efecto:" : "Effective Date:"}</span>
                        <span className="font-mono">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 py-1">
                        <span>{language === 'es' ? "Estatus:" : "Status:"}</span>
                        <span className="font-bold text-green-600 uppercase">{language === 'es' ? "PENDIENTE DE PAGO" : "PAYMENT PENDING"}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-end">
                <div className="text-[10px] text-gray-400">
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
