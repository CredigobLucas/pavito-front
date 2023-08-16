import { Bid } from "@/domain/models";
export interface GetBidResponse {
    status: number;
    body: {
        paginaVigente: number;
        numeroPaginas: number;
        licitaciones: Bid[];
    };
}
