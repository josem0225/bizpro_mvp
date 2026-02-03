export type Language = "es" | "en";

export interface StepDetail {
    id: number;
    title: { [key in Language]: string };
    short_desc: { [key in Language]: string };
    education_html: { [key in Language]: string };
    checklist: { id: string; text: { [key in Language]: string } }[];
    downloads?: { name: { [key in Language]: string }; url: string }[];
    resources?: { name: string; url: string }[];
    referrals?: { name: string; specialty: { [key in Language]: string }; location: string }[];
}

export interface BizProDataType {
    config: {
        language: Language;
        isAuthenticated: boolean;
        activeStepId: number;
    };
    user: {
        name: string;
        email: string;
        businessName: string;
        progress: {
            completedSteps: number[];
            unlockedSteps: number[];
        };
    };
    content: {
        ui: {
            nav: {
                login: { [key in Language]: string };
                start: { [key in Language]: string };
                dashboard: { [key in Language]: string };
                howItWorks: { [key in Language]: string };
                pricing: { [key in Language]: string };
                about: { [key in Language]: string };
            };
            admin: {
                title: { [key in Language]: string };
                save: { [key in Language]: string };
            };
            footer: {
                disclaimer: { [key in Language]: string };
            };
        };
        landing: {
            hero: any;
            features: any;
            comparison: any;
            pricing: any;
            [key: string]: any;
        };
        intakeQuestions: {
            id: string;
            type: string;
            label: { [key in Language]: string };
            placeholder?: { [key in Language]: string };
            options?: { value: string; label: string }[];
        }[];
        stepsDetail: StepDetail[];
    };
    pricing: any;
    admin: any;
}

export const BIZPRO_DATA: BizProDataType = {
    config: {
        language: 'es',
        isAuthenticated: true,
        activeStepId: 1
    },
    user: {
        name: "José Miguel",
        email: "jose@bizpro.com",
        businessName: "Mi Empresa LLC",
        progress: {
            completedSteps: [0, 1],
            unlockedSteps: [0, 1, 2, 3, 4, 5, 6] // Unlocking all for MVP testing
        }
    },
    content: {
        ui: {
            nav: {
                login: { es: "Iniciar Sesión", en: "Sign In" },
                start: { es: "Comenzar Gratis", en: "Start Free" },
                dashboard: { es: "Mi Progreso", en: "My Dashboard" },
                howItWorks: { es: "Cómo Funciona", en: "How it Works" },
                pricing: { es: "Precios", en: "Pricing" },
                about: { es: "Nosotros", en: "About Us" }
            },
            admin: {
                title: { es: "Panel de Control", en: "Admin Dashboard" },
                save: { es: "Guardar Cambios", en: "Save Changes" }
            },
            footer: {
                disclaimer: {
                    es: "BizPro no ofrece asesoría legal. Consulte a un abogado.",
                    en: "BizPro does not provide legal advice. Consult an attorney."
                }
            }
        },
        landing: {
            hero: {
                title: { es: "Tu Negocio en USA, Sin Fronteras", en: "Your US Business, Without Borders" },
                subtitle: { es: "La plataforma todo-en-uno para emprendedores latinos.", en: "The all-in-one platform for Latino entrepreneurs." },
                cta_primary: { es: "Comenzar Ahora", en: "Start Now" },
                cta_secondary: { es: "Cómo Funciona", en: "How It Works" },
                audience_bullets: {
                    es: ["Sin viajar a USA", "Sin SSN/ITIN", "100% Online"],
                    en: ["No US travel needed", "No SSN/ITIN", "100% Online"]
                }
            },
            features: {
                title: { es: "¿Es BizPro para ti?", en: "Is BizPro for you?" },
                subtitle: { es: "Diseñado para la realidad latina.", en: "Designed for the Latino reality." },
                cards: [
                    {
                        icon: "🌎",
                        title: { es: "Hablas Español", en: "You Speak Spanish" },
                        desc: { es: "Plataforma en español, documentos en inglés legal.", en: "Platform in Spanish, docs in legal English." }
                    },
                    {
                        icon: "🚀",
                        title: { es: "Socios, no Gestores", en: "Partners, not Agents" },
                        desc: { es: "Te enseñamos a manejar tu negocio.", en: "We teach you to manage your business." },
                        wide: true
                    },
                    {
                        icon: "🏦",
                        title: { es: "Estética Bancaria", en: "Bank Aesthetics" },
                        desc: { es: "Seguridad de grado institucional.", en: "Institutional grade security." }
                    }
                ]
            },
            comparison: {
                title: { es: "Lo que HACE vs NO HACE", en: "What it DOES vs DOES NOT" },
                bizpro: { es: ["Guía paso a paso", "Borradores legales", "En Español"], en: ["Step-by-step guide", "Legal drafts", "In Spanish"] },
                others: { es: ["Cobra por duda", "Solo llena formas", "Inglés complicado"], en: ["Charges per question", "Just fills forms", "Complicated English"] }
            },
            pricing: {
                title: { es: "Inversión Transparente", en: "Transparent Investment" },
                stepByStep: {
                    title: { es: "Paso a Paso", en: "Step by Step" },
                    desc: { es: "Paga a tu ritmo", en: "Pay as you go" },
                    cta: { es: "Elegir Esto", en: "Choose This" }
                },
                startup: {
                    title: { es: "Startup Pack", en: "Startup Pack" },
                    desc: { es: "Todo lo esencial", en: "All essentials" },
                    cta: { es: "Comenzar Ahora", en: "Start Now" },
                    badge: { es: "Recomendado", en: "Recommended" },
                    save: { es: "Ahorras", en: "Save" }
                },
                readiness: {
                    title: { es: "Business Ready", en: "Business Ready" },
                    desc: { es: "Llave en mano", en: "Turnkey solution" },
                    cta: { es: "Ver Detalles", en: "View Details" }
                }
            }
        },
        intakeQuestions: [
            {
                id: 'q1',
                type: 'text',
                label: { es: "¿Cuál es el nombre de tu negocio?", en: "What is your proposed business name?" },
                placeholder: { es: "Ej: Mi Consultoría LLC", en: "E.g., My Consulting LLC" }
            },
            {
                id: 'q2',
                type: 'select',
                label: { es: "¿En cuál condado operarás?", en: "In which Florida county will you operate?" },
                options: [
                    { value: "miami", label: "Miami-Dade" },
                    { value: "broward", label: "Broward" }
                ]
            },
            {
                id: 'q3',
                type: 'email',
                label: { es: "¿A dónde enviamos tu plan?", en: "Where should we send your plan?" },
                placeholder: { es: "tu@email.com", en: "you@email.com" }
            }
        ],
        stepsDetail: [
            {
                id: 0,
                title: { es: "Orientación Inicial", en: "Initial Orientation" },
                short_desc: { es: "Entiende el camino antes de empezar.", en: "Understand the path before starting." },
                education_html: {
                    es: "<p>Bienvenido a BizPro. Este camino está diseñado para llevarte de cero a una empresa operativa en USA.</p>",
                    en: "<p>Welcome to BizPro. This path is designed to take you from zero to an operating US company.</p>"
                },
                checklist: [
                    { id: "c0_1", text: { es: "Ver video de bienvenida", en: "Watch welcome video" } },
                    { id: "c0_2", text: { es: "Unirse a la comunidad de WhatsApp", en: "Join WhatsApp community" } }
                ]
            },
            {
                id: 1,
                title: { es: "Identidad & Estructura", en: "Identity & Structure" },
                short_desc: { es: "Define el nombre y tipo de entidad legal.", en: "Define name and legal entity type." },
                education_html: {
                    es: "<p>Elegir el nombre correcto es crucial. Verifica disponibilidad y evita marcas registradas.</p>",
                    en: "<p>Choosing the right name is crucial. Check availability and avoid trademarks.</p>"
                },
                checklist: [
                    { id: "c1_1", text: { es: "Verificar disponibilidad de nombre", en: "Check name availability" } },
                    { id: "c1_2", text: { es: "Definir tipo de entidad (LLC vs Corp)", en: "Define entity type (LLC vs Corp)" } }
                ],
                downloads: [
                    { name: { es: "Guía de Nombres", en: "Naming Guide" }, url: "/assets/state_requirements.pdf" }
                ],
                resources: [
                    { name: "Sunbiz Search", url: "https://sunbiz.org" }
                ]
            },
            {
                id: 2,
                title: { es: "Registro Estatal", en: "State Registration" },
                short_desc: { es: "Formaliza tu empresa ante el estado.", en: "Formalize your company with the state." },
                education_html: {
                    es: "<p>Es hora de presentar los Artículos de Organización ante la División de Corporaciones.</p>",
                    en: "<p>Time to file Articles of Organization with the Division of Corporations.</p>"
                },
                checklist: [
                    { id: "c2_1", text: { es: "Llenar formulario de registro", en: "Fill registration form" } },
                    { id: "c2_2", text: { es: "Pagar tasas estatales", en: "Pay state fees" } }
                ],
                downloads: [
                    { name: { es: "Checklist de Apertura", en: "Opening Checklist" }, url: "/assets/opening_checklist.pdf" }
                ]
            },
            {
                id: 3,
                title: { es: "Obtención de EIN", en: "EIN Obtainment" },
                short_desc: { es: "Consigue tu número de identificación fiscal.", en: "Get your tax ID number." },
                education_html: {
                    es: "<p>El EIN es como el seguro social de tu empresa. Lo necesitas para abrir cuentas bancarias.</p>",
                    en: "<p>The EIN is like your company's social security number. You need it to open bank accounts.</p>"
                },
                checklist: [
                    { id: "c3_1", text: { es: "Solicitar EIN online (SS-4)", en: "Apply for EIN online (SS-4)" } }
                ],
                resources: [
                    { name: "IRS Website", url: "https://irs.gov" }
                ]
            },
            {
                id: 4,
                title: { es: "Cuenta Bancaria", en: "Bank Account" },
                short_desc: { es: "Abre tu cuenta de negocios en USA.", en: "Open your US business bank account." },
                education_html: {
                    es: "<p>Separa tus finanzas personales de las del negocio.</p>",
                    en: "<p>Separate your personal finances from business ones.</p>"
                },
                checklist: [
                    { id: "c4_1", text: { es: "Reunir documentos (Artículos + EIN)", en: "Gather docs (Articles + EIN)" } },
                    { id: "c4_2", text: { es: "Aplicar a Mercury/Relay", en: "Apply to Mercury/Relay" } }
                ],
                downloads: [
                    { name: { es: "Carta de Presentación Bancaria", en: "Bank Letter" }, url: "/assets/bank_letter.docx" }
                ]
            },
            {
                id: 5,
                title: { es: "Finanzas & Proyección", en: "Finance & Projection" },
                short_desc: { es: "Planifica el futuro financiero con ProjectionHub.", en: "Plan financial future with ProjectionHub." },
                education_html: {
                    es: "<p>Usa nuestras herramientas exclusivas de ProjectionHub para modelar tus ingresos.</p>",
                    en: "<p>Use our exclusive ProjectionHub tools to model your revenue.</p>"
                },
                checklist: [
                    { id: "c5_1", text: { es: "Descargar Workbook Financiero", en: "Download Financial Workbook" } },
                    { id: "c5_2", text: { es: "Completar hoja de ingresos", en: "Complete revenue sheet" } }
                ]
                // Downloads handled by special layout logic
            },
            {
                id: 6,
                title: { es: "Lanzamiento", en: "Launch" },
                short_desc: { es: "Todo listo para operar.", en: "Ready to operate." },
                education_html: {
                    es: "<p>¡Felicidades! Tu empresa está lista.</p>",
                    en: "<p>Congratulations! Your company is ready.</p>"
                },
                checklist: [
                    { id: "c6_1", text: { es: "Celebrar", en: "Celebrate" } }
                ]
            }
        ]
    },
    pricing: {
        steps: {
            0: { price: 0, status: "unlocked" },
            1: { price: 79, status: "active" },
            2: { price: 129, status: "locked" },
            3: { price: 199, status: "locked" },
            4: { price: 0, status: "locked" }, // Bank account usually free/referral
            5: { price: 199, status: "locked" }, // Assumed matched check for step 5
            6: { price: 0, status: "locked" }
        },
        packages: {
            startup: { id: 'startup', price: 299, savings: 108, includes: [1, 2, 3] }, // 79+129+199 = 407. 407-299 = 108 savings
            readiness: { id: 'readiness', price: 899, savings: 237, includes: [1, 2, 3, 4, 5] } // Custom value prop
        },
        paywallTemplates: {
            es: "<h1>Desbloquea este paso</h1><p>Paga ahora.</p>",
            en: "<h1>Unlock this step</h1><p>Pay now.</p>"
        }
    },
    admin: {
        users: [
            { id: 1, name: "Carlos Mendoza", email: "carlos@techmiami.com", plan: "Readiness", status: "Paid", lastContact: "Hoy, 9:20 AM", step: 3 },
            { id: 2, name: "Ana Rodriguez", email: "ana.r@bakery.com", plan: "Startup", status: "Pending", lastContact: "Ayer, 4:15 PM", step: 1 },
            { id: 3, name: "Luis Fernandez", email: "luis@importsexport.com", plan: "None", status: "Lead", lastContact: "Hace 2 días", step: 0 },
            { id: 4, name: "Sofia Gaviria", email: "sofia@designstudio.io", plan: "Readiness", status: "Paid", lastContact: "Hace 3 días", step: 5 },
            { id: 5, name: "Jorge Trejo", email: "jorge@constructora.com", plan: "Startup", status: "Paid", lastContact: "Hace 1 semana", step: 2 }
        ],
        transactions: [
            { id: "tx_1", date: "Oct 24, 2025", user: "Carlos Mendoza", concept: "Business Readiness Pack", method: "Stripe", amount: 899, status: "Completed" },
            { id: "tx_2", date: "Oct 24, 2025", user: "Ana Rodriguez", concept: "Startup Pack (Deposit)", method: "Zelle", amount: 150, status: "Pending" },
            { id: "tx_3", date: "Oct 23, 2025", user: "Sofia Gaviria", concept: "Business Readiness Pack", method: "Stripe", amount: 899, status: "Completed" },
            { id: "tx_4", date: "Oct 22, 2025", user: "Jorge Trejo", concept: "Startup Pack", method: "Stripe", amount: 299, status: "Completed" },
            { id: "tx_5", date: "Oct 21, 2025", user: "Miguel Ángel", concept: "Consultoría Hora", method: "Cash", amount: 100, status: "Completed" }
        ],
        builder: {
            verticals: [
                {
                    id: "1",
                    name: "Florida LLC Formation",
                    status: "Active",
                    steps: [
                        { id: "s1", title: "Identidad del Negocio", price: 0, description: "Definición de nombre y estructura.", formFields: [], files: [] },
                        { id: "s2", title: "Registro Estatal", price: 150, description: "Presentación oficial ante Sunbiz.", formFields: [], files: [] },
                        { id: "s3", title: "Obtención de EIN", price: 50, description: "Número fiscal federal.", formFields: [], files: [] },
                        { id: "s4", title: "Acuerdo Operativo", price: 100, description: "Reglas internas de la empresa.", formFields: [], files: [] }
                    ]
                },
                {
                    id: "2",
                    name: "Delaware Corp (Tech)",
                    status: "Draft",
                    steps: [
                        { id: "s1", title: "Name Reservation", price: 50, formFields: [], files: [] }
                    ]
                }
            ]
        }
    }
};
