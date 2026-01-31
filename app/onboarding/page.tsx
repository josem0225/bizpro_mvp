import IntakeWizard from "@/app/components/IntakeWizard";
import ParticlesBackground from "@/app/components/ParticlesBackground";

export default function OnboardingPage() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-[var(--navy-deep)] text-white overflow-hidden">

            <ParticlesBackground />

            <div className="relative z-10 w-full max-w-4xl">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--navy-light)] rounded-xl mb-4 border border-[var(--glass-border)]">
                        <span className="text-2xl">🚀</span>
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Configuremos tu Negocio</h1>
                    <p className="text-[var(--text-gray)]">Tus respuestas personalizarán tu plan de acción.</p>
                </div>

                <IntakeWizard />
            </div>

        </main>
    );
}
