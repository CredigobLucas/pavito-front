export interface PavitoBid {
    ruc: string;
    razonSocial: string;
    departamento: string;
    provincia: string;
    id_licitacion: number;
    id_milestone: number;
    id_participante: number;
    id_item: number;
    seace_id: number;
    mype: boolean;
    entidadContratante: string;
    nivelGobierno: string;
    moneda: string;
    montoAdjudicado: number;
    montoEstimado: number | null;
    ubigeoContratante: string;
    sector: string;
    rucContratante: string;
    objetoLicitacion: string;
    descripcionLicitacion: string;
    nomenclatura: string;
    fechaInicioBuenapro: string;
    fechaFinBuenapro: string; 
}