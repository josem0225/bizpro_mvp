"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BIZPRO_DATA, BizProDataType } from "@/app/lib/mock-db";

type Language = "es" | "en";

interface BizProContextType {
    data: BizProDataType;
    language: Language;
    toggleLanguage: () => void;
    updatePrice: (stepId: number, newPrice: number) => void;
    updateStepStatus: (stepId: number, status: string) => void;
    updatePaywallTemplate: (lang: Language, template: string) => void;
    updateVertical: (vertical: any) => void; // New method
    login: (name: string) => void;
    logout: () => void;
    setBusinessName: (name: string) => void;
    setActiveStep: (stepId: number) => void;
    isAdminMode: boolean;
}

const BizProContext = createContext<BizProContextType | undefined>(undefined);

export function BizProProvider({ children }: { children: React.ReactNode }) {
    // We initialize state with the static data, allowing us to mutate it in memory
    const [data, setData] = useState<BizProDataType>(BIZPRO_DATA);
    const [isAdminMode, setIsAdminMode] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Hydrate User
        const storedUser = localStorage.getItem('bizpro_user');
        if (storedUser) {
            login(JSON.parse(storedUser).name);
        }

        // Logic for Language from URL or LocalStorage
        const params = new URLSearchParams(window.location.search);
        const langParam = params.get('lang') || params.get('locale');

        let targetLang: Language | null = null;
        if (langParam === 'en' || langParam === 'es') {
            targetLang = langParam;
            // Persist preference
            localStorage.setItem('bizpro_lang', targetLang);
        } else {
            const storedLang = localStorage.getItem('bizpro_lang');
            if (storedLang === 'en' || storedLang === 'es') {
                targetLang = storedLang;
            }
        }

        if (targetLang) {
            setData(prev => ({
                ...prev,
                config: {
                    ...prev.config,
                    language: targetLang as Language
                }
            }));
        }
    }, []);

    const toggleLanguage = () => {
        setData(prev => ({
            ...prev,
            config: {
                ...prev.config,
                language: prev.config.language === 'es' ? 'en' : 'es'
            }
        }));
    };

    const updateVertical = (updatedVertical: any) => {
        setData(prev => {
            if (!prev.admin?.builder) return prev;
            return {
                ...prev,
                admin: {
                    ...prev.admin,
                    builder: {
                        ...prev.admin.builder,
                        verticals: prev.admin.builder.verticals.map((v: any) =>
                            v.id === updatedVertical.id ? updatedVertical : v
                        )
                    }
                }
            };
        });
    };

    const updatePrice = (stepId: number, newPrice: number) => {
        setData(prev => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                steps: {
                    ...prev.pricing.steps,
                    [stepId]: { ...prev.pricing.steps[stepId], price: newPrice }
                }
            }
        }));
    };

    const updateStepStatus = (stepId: number, status: string) => {
        setData(prev => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                steps: {
                    ...prev.pricing.steps,
                    [stepId]: { ...prev.pricing.steps[stepId], status: status }
                }
            }
        }));
    };

    const updatePaywallTemplate = (lang: Language, template: string) => {
        setData(prev => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                paywallTemplates: {
                    ...prev.pricing.paywallTemplates,
                    [lang]: template
                }
            }
        }));
    };


    const login = (name: string) => {
        setData(prev => ({
            ...prev,
            user: {
                ...prev.user,
                name: name,
                email: `${name.toLowerCase().replace(/\s/g, '')}@example.com`
            },
            config: {
                ...prev.config,
                isAuthenticated: true
            }
        }));
    };

    const logout = () => {
        setData(prev => ({
            ...prev,
            config: {
                ...prev.config,
                isAuthenticated: false
            }
        }));
    };

    const setBusinessName = (name: string) => {
        setData(prev => ({
            ...prev,
            user: {
                ...prev.user,
                businessName: name
            }
        }));
    };

    const setActiveStep = (stepId: number) => {
        setData(prev => ({
            ...prev,
            config: {
                ...prev.config,
                activeStepId: stepId
            }
        }));
    };

    return (
        <BizProContext.Provider
            value={{
                data,
                language: data.config.language,
                toggleLanguage,
                updatePrice,
                updateStepStatus,
                updatePaywallTemplate,
                updateVertical,
                login,
                logout,
                setBusinessName,
                setActiveStep,
                isAdminMode
            }}
        >
            {children}
        </BizProContext.Provider>
    );
}

export function useBizPro() {
    const context = useContext(BizProContext);
    if (context === undefined) {
        throw new Error("useBizPro must be used within a BizProProvider");
    }
    return context;
}
