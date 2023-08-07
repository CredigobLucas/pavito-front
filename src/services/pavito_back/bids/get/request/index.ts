import { PavitoBackApi } from "../../../PavitoBackApi";
import { GetBidResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
export const getBids = async (query: string): Promise<GetBidResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: GetBidResponse = await api.get<GetBidResponse>(
            `/licitaciones?${query}`
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
