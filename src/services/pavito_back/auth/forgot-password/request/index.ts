import { PavitoBackApi } from "../../../PavitoBackApi";
import { ForgotPasswordPayload } from "../payload";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { GenericResponse } from "@/services/pavito_back/generic/response";

export const forgotPassword = async (payload: ForgotPasswordPayload): Promise<GenericResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: GenericResponse = await api.post<GenericResponse>(
            "/auth/forgot-password",
            payload
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
            if (response.status === 404) {
                throw ErrorFactory.create(
                    "Usuario no encontrado.",
                    "NotFound"
                );
            }
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
