import { Bid } from "@/domain/models";
import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface GetBidResponse extends GenericStatusResponse {
    body: {
        paginaVigente: number;
        numeroPaginas: number;
        licitaciones: Bid[];
    };
}
