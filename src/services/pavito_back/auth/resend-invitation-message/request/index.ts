import { PavitoBackApi } from "../../../PavitoBackApi";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { GenericResponse } from "@/services/pavito_back/generic/response";
import { ForgotPasswordPayload } from "../../forgot-password";

export const resendInvitationMessage = async (payload: ForgotPasswordPayload): Promise<GenericResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: GenericResponse = await api.post<GenericResponse>(
            "/auth/resend-invitation-message",
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
            if (response.status === 403) {
                throw ErrorFactory.create(
                    "El usuario ya confirmó su cuenta y no se le puede reenviar el correo de bienvenida",
                    "Forbidden"
                );
            }
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
