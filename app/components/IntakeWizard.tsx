"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";


import { useBizPro } from "@/app/context/BizProContext";

export default function IntakeWizard() {
    const router = useRouter();
    const { setBusinessName, data, language } = useBizPro();
    // Use dynamic data from context
    const questions = data.content.intakeQuestions;

    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const currentQuestion = questions[currentStep];
    const isLastStep = currentStep === questions.length - 1;

    const handleNext = () => {
        if (isLastStep) {
            setIsSubmitting(true);
            // Simulate saving data
            setTimeout(() => {
                router.push("/teaser");
            }, 1500);
        } else {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleAnswerChange = (value: string) => {
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));

        // Specific logic for Question 1 (Business Name)
        if (currentQuestion.id === 'q1') {
            setBusinessName(value);
        }
    };

    const progressPercentage = ((currentStep + 1) / questions.length) * 100;

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-[var(--text-gray)] mb-2">
                    <span>Paso {currentStep + 1} de {questions.length}</span>
                    <span>{Math.round(progressPercentage)}% Completado</span>
                </div>
                <div className="h-2 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--blue-electric)] transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-[var(--glass-bg)] border border-[var(--glass-border)] p-8 rounded-[var(--radius-lg)] shadow-lg min-h-[300px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    {currentQuestion.label[language]}
                </h2>

                <div className="mb-8">
                    {currentQuestion.type === 'text' && (
                        <input
                            type="text"
                            className="w-full text-xl px-5 py-4 rounded-xl bg-[rgba(0,0,0,0.3)] border border-[var(--glass-border)] text-white placeholder-white/20 focus:outline-none focus:border-[var(--blue-electric)] transition-colors text-center"
                            placeholder={currentQuestion.placeholder ? currentQuestion.placeholder[language] : ''}
                            value={answers[currentQuestion.id] || ''}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            autoFocus
                        />
                    )}

                    {currentQuestion.type === 'select' && currentQuestion.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentQuestion.options.map((option: any) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswerChange(option.value)}
                                    className={`p-4 rounded-xl border text-left transition-all ${answers[currentQuestion.id] === option.value
                                        ? "bg-[var(--blue-electric)] border-[var(--blue-electric)] text-white shadow-lg"
                                        : "bg-[rgba(0,0,0,0.3)] border-[var(--glass-border)] text-[var(--text-gray)] hover:bg-white/5 hover:border-white/20"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-auto">
                    <button
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-[var(--text-gray)] transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:text-white'}`}
                    >
                        <ArrowLeft className="w-4 h-4" /> Anterior
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!answers[currentQuestion.id] && !isSubmitting} // Require answer unless submitting (simplified)
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--white)] text-[var(--navy-deep)] font-bold shadow-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        {isLastStep ? (
                            isSubmitting ? "Finalizando..." : "Finalizar"
                        ) : (
                            "Siguiente"
                        )}
                        {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
