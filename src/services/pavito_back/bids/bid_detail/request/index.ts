import { PavitoBackApi } from "../../../PavitoBackApi";
import { GetBidDetailResponse } from "../response";
import { GetBidDetailPayload } from "../payload";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
export const getBidDetail = async (payload: GetBidDetailPayload): Promise<GetBidDetailResponse> => {
    const api = new PavitoBackApi();
    try {
        const response : GetBidDetailResponse  = await api.get<GetBidDetailResponse>(
            `/licitacion/${payload.licitacion}/${payload.milestone}/${payload.participante}/${payload.item}`
        );
        return response;
    } catch (error) {
        if (isAxiosError(error)) {
            const { response } = error;
            if (!response) {
                throw ErrorFactory.create(
                    "Error en el servidor, intente nuevamente",
                    "Unknown"
                );
            }
            if (response.status === 401) {
                throw ErrorFactory.create(
                    "Token expirado, inicie sesión nuevamente",
                    "Unauthorized"
                );
            }
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
