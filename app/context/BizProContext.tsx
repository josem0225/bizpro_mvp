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
                        verticals: prev.admin.builder.verticals.map(v =>
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
