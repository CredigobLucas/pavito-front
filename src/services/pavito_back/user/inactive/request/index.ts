import { PavitoBackApi } from "../../../PavitoBackApi";
import { InactiveUserResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";

export const inactiveUser = async (
    id: string
): Promise<InactiveUserResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: InactiveUserResponse =
            await api.put<InactiveUserResponse>(`/user/disable/${id}`);
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
