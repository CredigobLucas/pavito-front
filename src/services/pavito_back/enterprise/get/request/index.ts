import { PavitoBackApi } from "../../../PavitoBackApi";
import { GetEnterpriseResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
export const getEnterprise = async (): Promise<GetEnterpriseResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: GetEnterpriseResponse =
            await api.get<GetEnterpriseResponse>("/enterprise");
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
