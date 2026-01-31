"use client";

import IntakeWizard from "@/app/components/IntakeWizard";
import ParticlesBackground from "@/app/components/ParticlesBackground";

export default function IntakePage() {
    return (
        <main className="min-h-screen relative font-sans text-white bg-[var(--navy-deep)] flex items-center justify-center p-4">
            <ParticlesBackground />
            <div className="relative z-10 w-full max-w-2xl">
                <IntakeWizard />
            </div>
        </main>
    );
}
