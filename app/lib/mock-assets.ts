export interface AssetFile {
    id: string;
    name: string;
    type: 'pdf' | 'docx' | 'xlsx';
    url: string;
    description?: string;
}

export const ASSET_LIBRARY: AssetFile[] = [
    // Templates
    { id: 't1', name: 'Plan de Negocios Simplificado', type: 'docx', url: '/assets/business_plan_template.docx', description: 'Plantilla base para estructurar tu idea.' },
    { id: 't2', name: 'Proyección Financiera 3 Años', type: 'xlsx', url: '/assets/financial_projection.xlsx', description: 'Excel con fórmulas automáticas.' },
    { id: 't3', name: 'Carta de Presentación Bancaria', type: 'docx', url: '/assets/bank_letter.docx' },

    // Guides (PDFs)
    { id: 'g1', name: 'Guía de Requisitos Estatales', type: 'pdf', url: '/assets/state_requirements.pdf' },
    { id: 'g2', name: 'Manual de Marketing Digital', type: 'pdf', url: '/assets/marketing_guide.pdf' },
    { id: 'g3', name: 'Checklist de Apertura', type: 'pdf', url: '/assets/opening_checklist.pdf' },

    // Specific for Step 5 (ProjectionHub)
    { id: 'ph_xls', name: 'ProjectionHub Workbook (English)', type: 'xlsx', url: '/assets/projectionhub_workbook.xlsx' },
    { id: 'ph_pdf', name: 'Guía de Proyección Financiera (Español)', type: 'pdf', url: '/assets/financial_guide_es.pdf' },
];
