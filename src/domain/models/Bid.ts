export interface Bid {
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
    montoEstimado: number;
}
