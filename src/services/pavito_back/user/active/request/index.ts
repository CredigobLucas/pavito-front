import { PavitoBackApi } from "../../../PavitoBackApi";
import { ActiveUserResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";

export const activeUser = async (id: string): Promise<ActiveUserResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: ActiveUserResponse = await api.put<ActiveUserResponse>(
            `/user/enable/${id}`
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
                    "Sesion expirada, inicie sesion nuevamente",
                    "Unauthorized"
                );
            }
        }
        throw ErrorFactory.create(
            "No se pudo activar el usuario, intente nuevamente",
            "Unknown"
        );
    }
};
