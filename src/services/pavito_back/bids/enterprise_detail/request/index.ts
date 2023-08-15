import { PavitoBackApi } from "../../../PavitoBackApi";
import { GetEnterpriseDetailsResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
export const getEnterpriseDetails = async (ruc: string): Promise<GetEnterpriseDetailsResponse> => {
    const api = new PavitoBackApi();
    try {
        const response : GetEnterpriseDetailsResponse = await api.get<GetEnterpriseDetailsResponse>(
            `/licitaciones/detalle/${ruc}`
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
