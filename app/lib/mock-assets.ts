export interface Asset {
    id: string;
    name: string;
    type: "pdf" | "docx" | "xlsx" | "image";
    url: string;
}

export const ASSET_LIBRARY: Asset[] = [
    {
        id: "ph_template_en",
        name: "Steph5_Template_ProjectionHub_FinancialProjection_EN.xlsx",
        type: "xlsx",
        url: "/assets/Steph5_Template_ProjectionHub_FinancialProjection_EN.xlsx"
    },
    {
        id: "ph_guide_es",
        name: "Steph5_Guide_ProjectionHub_FinancialProjection_ES.pdf",
        type: "pdf",
        url: "/assets/Steph5_Guide_ProjectionHub_FinancialProjection_ES.pdf"
    },
    {
        id: "checklist_opening",
        name: "Opening Checklist (PDF)",
        type: "pdf",
        url: "/assets/opening_checklist.pdf"
    },
    {
        id: "bank_letter",
        name: "Bank Letter Template (DOCX)",
        type: "docx",
        url: "/assets/bank_letter.docx"
    }
];
