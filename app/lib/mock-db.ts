export const BIZPRO_DATA = {
    // 1. CONFIGURACIÓN
    config: {
        currentView: 'landing',
        language: 'es' as 'es' | 'en', // Type assertion for TS
        isAuthenticated: false,
        isAdmin: false,
        activeStepId: null as number | null
    },

    // 2. DATOS DE USUARIO
    user: {
        name: "Carlos Emprendedor",
        email: "carlos@example.com",
        businessName: "",
        industry: "",
        progress: {
            completedSteps: [] as number[],
            unlockedSteps: [0],
            purchasedPackage: null as string | null,
            uploadedFiles: [] as any[]
        }
    },

    // 3. LOG DE AUDITORÍA
    auditLog: [
        { id: 1, date: '2026-01-20', action: 'PRICE_CHANGE', detail: 'Admin changed Step 1 to $79', user: 'SuperAdmin' }
    ],

    // 4. PRECIOS Y REGLAS
    pricing: {
        paywallTemplates: {
            es: "Este paso cuesta ${price}. O desbloquea todo por ${packagePrice} y ahorra.",
            en: "This step costs ${price}. Or unlock all for ${packagePrice} and save."
        },
        steps: {
            0: { price: 0, status: 'active' },
            1: { price: 79, status: 'active' },
            2: { price: 129, status: 'active' },
            3: { price: 129, status: 'active' },
            4: { price: 199, status: 'dormant' },
            5: { price: 199, status: 'dormant' },
            6: { price: 0, status: 'dormant' }
        } as Record<number, { price: number; status: string }>,
        packages: {
            startup: { id: 'startup', price: 299, savings: 58, includes: [1, 2, 3] },
            readiness: { id: 'readiness', price: 899, savings: 237, includes: [1, 2, 3, 4, 5] }
        }
    },

    // 5. CONTENIDO UI
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
                title: { es: "Bienvenido a BizPro!", en: "Welcome to BizPro!" },
                subtitle: { es: "Coordina tu negocio. Sin distracciones.", en: "Coordinate your business. No distractions." },
                cta_primary: { es: "Comenzar Gratis", en: "Start Free" },
                cta_secondary: { es: "Ver Cómo Funciona", en: "See How It Works" },
                audience_bullets: {
                    es: ["Quiere iniciar un negocio", "Miedo al IRS", "Busca formalidad"],
                    en: ["Wants to start a business", "Fear of IRS", "Seeking formality"]
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
            },
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
                short_desc: { es: "Tu punto de partida.", en: "Your starting point." },
                education_html: {
                    es: "<h3>¿Qué es BizPro?</h3><p>No somos abogados. Somos coordinadores...</p>",
                    en: "<h3>What is BizPro?</h3><p>We are not lawyers. We are coordinators...</p>"
                },
                checklist: [
                    { id: 'c0_1', text: { es: "Leer guía", en: "Read guide" } },
                    { id: 'c0_2', text: { es: "Entender límites", en: "Understand limits" } }
                ],
                downloads: [
                    { name: { es: "Guía_Inicio.pdf", en: "Start_Guide.pdf" }, url: "#" }
                ],
                uploads: [
                    { id: 'u0_1', label: { es: "Sube tu confirmación (Opcional)", en: "Upload confirmation (Optional)" } }
                ],
                resources: [] as any[],
                referrals: [] as any[]
            },
            {
                id: 1,
                title: { es: "Identidad del Negocio", en: "Business Identity" },
                short_desc: { es: "Estructura y nombre.", en: "Structure and name." },
                education_html: {
                    es: "<p>El 30% de los errores ocurren aquí. Elige: LLC o Sole Prop...</p>",
                    en: "<p>30% of errors happen here. Choose: LLC or Sole Prop...</p>"
                },
                checklist: [
                    { id: 'c1_1', text: { es: "Brainstorm 5 nombres", en: "Brainstorm 5 names" } },
                    { id: 'c1_2', text: { es: "Verificar en Sunbiz", en: "Check Sunbiz" } }
                ],
                downloads: [
                    { name: { es: "Plantilla_Nombres.pdf", en: "Name_Template.pdf" }, url: "#" }
                ],
                uploads: [
                    { id: 'u1_1', label: { es: "Sube captura de Sunbiz", en: "Upload Sunbiz screenshot" } }
                ],
                resources: [
                    { name: "Sunbiz", url: "https://dos.fl.gov/sunbiz/" }
                ],
                referrals: [
                    {
                        name: "Abogado Ejemplo",
                        specialty: { es: "Formación LLC", en: "LLC Formation" },
                        location: "Miami"
                    }
                ]
            }
        ]
    },
    admin: {
        users: [
            { id: "u1", name: "Carlos Emprendedor", email: "carlos@example.com", plan: "Start", status: "Paid", lastContact: "2026-01-29", step: 1 },
            { id: "u2", name: "Ana Pizzería", email: "ana@pizza.com", plan: "Readiness", status: "Pending", lastContact: "2026-01-25", step: 3 },
            { id: "u3", name: "Luis Taller", email: "luis@taller.com", plan: "None", status: "Lead", lastContact: "2026-01-30", step: 0 },
            { id: "u4", name: "María Consultora", email: "maria@legal.com", plan: "Start", status: "Paid", lastContact: "2026-01-20", step: 2 },
            { id: "u5", name: "Jorge Tech", email: "jorge@startup.com", plan: "Readiness", status: "Paid", lastContact: "2026-01-31", step: 5 }
        ],
        transactions: [
            { id: "tx1", date: "2026-01-31", user: "Jorge Tech", amount: 899, method: "Stripe", status: "Completed", concept: "Pack Business Ready" },
            { id: "tx2", date: "2026-01-29", user: "Carlos Emprendedor", amount: 299, method: "Zelle", status: "Completed", concept: "Pack Startup" },
            { id: "tx3", date: "2026-01-20", user: "María Consultora", amount: 79, method: "Stripe", status: "Completed", concept: "Step 1: Identity" },
            { id: "tx4", date: "2026-01-15", user: "Pedro Construct", amount: 150, method: "Cash", status: "Pending", concept: "Manual Adjustment" }
        ],
        builder: {
            verticals: [
                {
                    id: "v1",
                    name: "Restaurantes / Food Service",
                    description: "Licencias de salud, alcohol y permisos municipales.",
                    status: "Active",
                    steps: [
                        {
                            id: "s1",
                            title: "Consulta Inicial & Estructura",
                            price: 0, // Hook (Free)
                            description: "Definimos si serás LLC o Corp y verificamos el nombre.",
                            files: [{ name: "Guia_Restaurantes_FL.pdf", url: "#" }],
                            formFields: [
                                { id: "f1", type: "text", label: "Nombre Propuesto del Restaurante" },
                                { id: "f2", type: "select", label: "Tipo de Servicio", options: ["Dine-in", "Takeout", "Food Truck"] }
                            ]
                        },
                        {
                            id: "s2",
                            title: "Licencias Estatales (DBPR)",
                            price: 199,
                            description: "Gestión de la licencia de Hoteles y Restaurantes de FL.",
                            files: [],
                            formFields: [
                                { id: "f3", type: "text", label: "Número de Asientos" },
                                { id: "f4", type: "textarea", label: "Descripción del Menú (para plan review)" }
                            ]
                        }
                    ]
                },
                {
                    id: "v2",
                    name: "Detailing / Car Wash Móvil",
                    description: "Permisos de agua, seguro y registro de vehículo comercial.",
                    status: "Draft",
                    steps: [
                        {
                            id: "s1",
                            title: "Registro Básico",
                            price: 0,
                            description: "Registro en Sunbiz y EIN.",
                            files: [],
                            formFields: []
                        }
                    ]
                }
            ]
        }
    }
};

// Type helper
export type BizProDataType = typeof BIZPRO_DATA;
