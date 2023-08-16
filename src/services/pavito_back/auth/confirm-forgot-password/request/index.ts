import { PavitoBackApi } from "../../../PavitoBackApi";
import { ConfirmForgotPasswordPayload } from "../payload";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { GenericResponse } from "@/services/pavito_back/generic/response";

export const confirmForgotPassword = async (email: string, payload: ConfirmForgotPasswordPayload): Promise<GenericResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: GenericResponse = await api.put<GenericResponse>(
            `/auth/confirm-forgot-password/${email}`,
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
            if (response.status === 400) {
                if (response.data.body.message.includes("InvalidPasswordException")) {
                    throw ErrorFactory.create(
                        "La nueva contraseña no cumple con los requerimientos de seguridad.",
                        "BadRequest"
                    );
                }
                else if (response.data.body.message.includes("ExpiredCodeException")) {
                    throw ErrorFactory.create(
                        "Código expirado, por favor solicite un código nuevamente.",
                        "BadRequest"
                    );
                }
                else {
                    throw ErrorFactory.create(
                        "Error desconocido intente nuevamente.",
                        "BadRequest"
                    );
                }
            }
            if (response.status === 401) {
                throw ErrorFactory.create(
                    "Código inválido.",
                    "Unauthorized"
                );
            }
            if (response.status === 429) {
                throw ErrorFactory.create(
                    "Límite de intentos excedido, por favor inténtelo después de un tiempo",
                    "TooManyRequests"
                );
            }
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
