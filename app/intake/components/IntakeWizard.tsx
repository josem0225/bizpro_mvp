"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Upload, Calendar as CalendarIcon, Type, MapPin, Briefcase, Building2, Globe, Lightbulb, DollarSign, Wallet, CreditCard, Languages, CalendarDays, FileText } from "lucide-react";

// --- Types ---
type FormData = {
    businessName: string;
    location: string;
    industry: string;
    legalStructure: string;
    hasDomain: string; // 'yes' | 'no'
    hasExperience: string; // 'yes' | 'no'
    fundingStatus: string;
    bankStatus: string;
    stripeStatus: string;
    language: string; // 'es' | 'en'
    launchDate: string;
    additionalInfo: string;
};

const INITIAL_DATA: FormData = {
    businessName: "",
    location: "",
    industry: "",
    legalStructure: "",
    hasDomain: "",
    hasExperience: "",
    fundingStatus: "",
    bankStatus: "",
    stripeStatus: "",
    language: "",
    launchDate: "",
    additionalInfo: "",
};

const FL_COUNTIES = [
    "Miami-Dade", "Broward", "Palm Beach", "Orange", "Hillsborough", "Duval", "Pinellas", "Lee", "Polk", "Brevard", "Other"
];

const INDUSTRIES = [
    "Retail", "Services", "Technology", "Health & Wellness", "Construction", "Food & Beverage", "Real Estate", "E-commerce", "Other"
];

export default function IntakeWizard() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem("bizpro-intake-wizard");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFormData(parsed.formData || INITIAL_DATA);
                setCurrentStep(parsed.currentStep || 1);
            } catch (e) {
                console.error("Failed to parse saved wizard state");
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to LocalStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("bizpro-intake-wizard", JSON.stringify({ formData, currentStep }));
        }
    }, [formData, currentStep, isLoaded]);

    const updateField = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 12) setCurrentStep(c => c + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(c => c - 1);
    };

    const progress = (currentStep / 12) * 100;

    if (!isLoaded) return null; // Avoid hydration mismatch

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            {/* Header / Progress */}
            <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-[var(--navy-brand)] uppercase tracking-wider">
                        Step {currentStep} of 12
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                        {Math.round(progress)}% Completed
                    </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[var(--navy-brand)] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="p-8 min-h-[400px] flex flex-col justify-center relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="w-full"
                    >
                        {/* --- STEP 1: BUSINESS NAME --- */}
                        {currentStep === 1 && (
                            <StepLayout
                                icon={<Type className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="What is the name of your business?"
                                description="This will be the official name used for registration."
                            >
                                <input
                                    type="text"
                                    placeholder="e.g. Acme Corp"
                                    value={formData.businessName}
                                    onChange={(e) => updateField("businessName", e.target.value)}
                                    className="w-full text-3xl font-bold border-b-2 border-slate-200 py-2 focus:outline-none focus:border-[var(--navy-brand)] placeholder:text-slate-300 transition-colors bg-transparent text-[var(--navy-brand)]"
                                    autoFocus
                                />
                            </StepLayout>
                        )}

                        {/* --- STEP 2: LOCATION --- */}
                        {currentStep === 2 && (
                            <StepLayout
                                icon={<MapPin className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Where is your business located?"
                                description="Select the Florida county where you'll operate."
                            >
                                <select
                                    value={formData.location}
                                    onChange={(e) => updateField("location", e.target.value)}
                                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-lg focus:ring-2 focus:ring-[var(--navy-brand)] focus:outline-none cursor-pointer text-[var(--navy-brand)] font-medium"
                                >
                                    <option value="" disabled>Select a County</option>
                                    {FL_COUNTIES.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </StepLayout>
                        )}

                        {/* --- STEP 3: INDUSTRY --- */}
                        {currentStep === 3 && (
                            <StepLayout
                                icon={<Briefcase className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="What industry are you in?"
                                description="This helps us recommend specific licenses."
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {INDUSTRIES.map(ind => (
                                        <SelectButton
                                            key={ind}
                                            label={ind}
                                            selected={formData.industry === ind}
                                            onClick={() => updateField("industry", ind)}
                                        />
                                    ))}
                                </div>
                            </StepLayout>
                        )}

                        {/* --- STEP 4: LEGAL STRUCTURE --- */}
                        {currentStep === 4 && (
                            <StepLayout
                                icon={<Building2 className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Choose a Legal Structure"
                                description="Most small businesses start as an LLC."
                            >
                                <div className="space-y-3">
                                    <SelectButton
                                        label="LLC (Limited Liability Company)"
                                        subLabel="Best for liability protection & flexible taxes."
                                        selected={formData.legalStructure === "LLC"}
                                        onClick={() => updateField("legalStructure", "LLC")}
                                    />
                                    <SelectButton
                                        label="Corporation (C-Corp / S-Corp)"
                                        subLabel="Best for raising capital & issuing stock."
                                        selected={formData.legalStructure === "Corp"}
                                        onClick={() => updateField("legalStructure", "Corp")}
                                    />
                                    <SelectButton
                                        label="Sole Proprietorship"
                                        subLabel="Simplest, but no liability protection."
                                        selected={formData.legalStructure === "Sole Prop"}
                                        onClick={() => updateField("legalStructure", "Sole Prop")}
                                    />
                                </div>
                            </StepLayout>
                        )}

                        {/* --- STEP 5: DOMAIN --- */}
                        {currentStep === 5 && (
                            <StepLayout
                                icon={<Globe className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Do you have a web domain?"
                                description="e.g. www.yourbusiness.com"
                            >
                                <div className="flex gap-4 w-full">
                                    <SelectCard label="Yes" selected={formData.hasDomain === 'yes'} onClick={() => updateField("hasDomain", "yes")} />
                                    <SelectCard label="No" selected={formData.hasDomain === 'no'} onClick={() => updateField("hasDomain", "no")} />
                                </div>
                            </StepLayout>
                        )}

                        {/* --- STEP 6: EXPERIENCE --- */}
                        {currentStep === 6 && (
                            <StepLayout
                                icon={<Lightbulb className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Do you have prior business experience?"
                                description="Have you owned or managed a business before?"
                            >
                                <div className="flex gap-4 w-full">
                                    <SelectCard label="Yes" selected={formData.hasExperience === 'yes'} onClick={() => updateField("hasExperience", "yes")} />
                                    <SelectCard label="No" selected={formData.hasExperience === 'no'} onClick={() => updateField("hasExperience", "no")} />
                                </div>
                            </StepLayout>
                        )}

                        {/* --- STEP 7: FUNDING --- */}
                        {currentStep === 7 && (
                            <StepLayout
                                icon={<DollarSign className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="What is your funding status?"
                                description="How will you finance the initial costs?"
                            >
                                <div className="space-y-3">
                                    <SelectButton label="Bootstrapped (Self-funded)" selected={formData.fundingStatus === "bootstrapped"} onClick={() => updateField("fundingStatus", "bootstrapped")} />
                                    <SelectButton label="Seeking Investment" selected={formData.fundingStatus === "seeking"} onClick={() => updateField("fundingStatus", "seeking")} />
                                    <SelectButton label="Already Funded" selected={formData.fundingStatus === "funded"} onClick={() => updateField("fundingStatus", "funded")} />
                                </div>
                            </StepLayout>
                        )}

                        {/* --- STEP 8: BANK ACCOUNT --- */}
                        {currentStep === 8 && (
                            <StepLayout
                                icon={<Wallet className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Do you have a Business Bank Account?"
                                description="Separate your personal and business finances."
                            >
                                <div className="space-y-3">
                                    <SelectButton label="Yes, I have one" selected={formData.bankStatus === "has-account"} onClick={() => updateField("bankStatus", "has-account")} />
                                    <SelectButton label="No, I need to open one" selected={formData.bankStatus === "needs-account"} onClick={() => updateField("bankStatus", "needs-account")} />
                                </div>
                            </StepLayout>
                        )}

                        {/* --- STEP 9: STRIPE --- */}
                        {currentStep === 9 && (
                            <StepLayout
                                icon={<CreditCard className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Do you have a Stripe account?"
                                description="To accept payments online."
                            >
                                <div className="space-y-3">
                                    <SelectButton label="Yes, configured" selected={formData.stripeStatus === "has-account"} onClick={() => updateField("stripeStatus", "has-account")} />
                                    <SelectButton label="No, I need help" selected={formData.stripeStatus === "needs-account"} onClick={() => updateField("stripeStatus", "needs-account")} />
                                </div>
                            </StepLayout>
                        )}

                        {/* --- STEP 10: LANGUAGE --- */}
                        {currentStep === 10 && (
                            <StepLayout
                                icon={<Languages className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Preferred Language"
                                description="For your documents and dashboard."
                            >
                                <div className="flex gap-4 w-full">
                                    <SelectCard label="English" selected={formData.language === 'en'} onClick={() => updateField("language", "en")} />
                                    <SelectCard label="Español" selected={formData.language === 'es'} onClick={() => updateField("language", "es")} />
                                </div>
                            </StepLayout>
                        )}

                        {/* --- STEP 11: LAUNCH DATE --- */}
                        {currentStep === 11 && (
                            <StepLayout
                                icon={<CalendarDays className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Estimated Launch Date"
                                description="When do you plan to start operating?"
                            >
                                <input
                                    type="date"
                                    value={formData.launchDate}
                                    onChange={(e) => updateField("launchDate", e.target.value)}
                                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-lg focus:ring-2 focus:ring-[var(--navy-brand)] focus:outline-none text-[var(--navy-brand)] font-medium"
                                />
                            </StepLayout>
                        )}

                        {/* --- STEP 12: ADDITIONAL INFO --- */}
                        {currentStep === 12 && (
                            <StepLayout
                                icon={<FileText className="w-8 h-8 text-[var(--navy-brand)]" />}
                                title="Additional Information"
                                description="Anything else we should know?"
                            >
                                <textarea
                                    value={formData.additionalInfo}
                                    onChange={(e) => updateField("additionalInfo", e.target.value)}
                                    placeholder="Tell us more about your business goals..."
                                    className="w-full h-32 p-4 rounded-xl border border-slate-200 bg-white text-lg focus:ring-2 focus:ring-[var(--navy-brand)] focus:outline-none resize-none text-[var(--navy-brand)]"
                                />
                            </StepLayout>
                        )}

                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Footer / Navigation */}
            <div className="p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50">
                <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-slate-200 cursor-pointer'}`}
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>

                <button
                    onClick={() => {
                        if (currentStep === 12) {
                            // Save detailed data to context/storage (already handled by useEffect)
                            // Redirect to the "Teaser" plan to hook the user
                            window.location.href = '/teaser';
                        } else {
                            nextStep();
                        }
                    }}
                    className="flex items-center gap-2 bg-[var(--navy-brand)] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                    {currentStep === 12 ? "See My Plan" : "Next"} <ArrowRight className="w-5 h-5" />
                </button>
            </div>

        </div>
    );
}

// --- Subcomponents for Clean Layout ---

function StepLayout({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-2">
                {icon}
            </div>
            <div>
                <h2 className="text-3xl font-bold text-[var(--navy-brand)] mb-2">{title}</h2>
                <p className="text-lg text-slate-500">{description}</p>
            </div>
            <div className="mt-4 w-full">
                {children}
            </div>
        </div>
    )
}

function SelectButton({ label, subLabel, selected, onClick }: { label: string, subLabel?: string, selected: boolean, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group cursor-pointer ${selected ? 'border-[var(--navy-brand)] bg-[rgba(16,24,64,0.03)]' : 'border-slate-100 hover:border-slate-300'}`}
        >
            <div>
                <div className={`font-bold text-lg ${selected ? 'text-[var(--navy-brand)]' : 'text-slate-700'}`}>{label}</div>
                {subLabel && <div className="text-sm text-slate-400 mt-1">{subLabel}</div>}
            </div>
            {selected && <div className="bg-[var(--navy-brand)] text-white p-1 rounded-full"><Check className="w-4 h-4" /></div>}
        </div>
    )
}

function SelectCard({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className={`flex-1 p-8 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer ${selected ? 'border-[var(--navy-brand)] bg-[rgba(16,24,64,0.03)]' : 'border-slate-100 hover:border-slate-300'}`}
        >
            <div className={`text-2xl font-bold ${selected ? 'text-[var(--navy-brand)]' : 'text-slate-700'}`}>{label}</div>
            {selected && <div className="bg-[var(--navy-brand)] text-white p-1 rounded-full"><Check className="w-4 h-4" /></div>}
        </div>
    )
}
