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
                <div className="flex justify-between text-sm text-slate-500 mb-2 font-medium">
                    <span>Paso {currentStep + 1} de {questions.length}</span>
                    <span>{Math.round(progressPercentage)}% Completado</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--navy-brand)] transition-all duration-500 ease-out"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-xl min-h-[300px] flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6 text-slate-900 text-center">
                    {currentQuestion.label[language]}
                </h2>

                <div className="mb-8 relative">
                    {(currentQuestion.type === 'text' || currentQuestion.type === 'email') && (
                        <div className="relative">
                            <input
                                type={currentQuestion.type}
                                className="w-full text-xl px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[var(--navy-brand)] transition-colors text-center"
                                placeholder={currentQuestion.placeholder ? currentQuestion.placeholder[language] : ''}
                                value={answers[currentQuestion.id] || ''}
                                onChange={(e) => handleAnswerChange(e.target.value)}
                                autoFocus
                            />
                            {/* Trust Signal for Input */}
                            <div className="flex justify-center items-center gap-2 mt-4 text-xs text-emerald-600 opacity-80">
                                <CheckCircle className="w-3 h-3" />
                                <span>
                                    {language === 'es' ? "Sus datos están encriptados con 256-bit SSL" : "Your data is encrypted with 256-bit SSL"}
                                </span>
                            </div>
                        </div>
                    )}

                    {currentQuestion.type === 'select' && currentQuestion.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {currentQuestion.options.map((option: any) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleAnswerChange(option.value)}
                                    className={`p-4 rounded-xl border text-left transition-all ${answers[currentQuestion.id] === option.value
                                        ? "bg-[var(--navy-brand)] border-[var(--navy-brand)] text-white shadow-lg"
                                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
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
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-400 transition-colors ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'hover:text-slate-700'}`}
                    >
                        <ArrowLeft className="w-4 h-4" /> Anterior
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={!answers[currentQuestion.id] && !isSubmitting} // Require answer unless submitting (simplified)
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--navy-brand)] text-white font-bold shadow-lg shadow-indigo-900/10 hover:bg-[#1a1a3a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
