import { PavitoBackApi } from "../../../PavitoBackApi";
import { ChangePasswordPayload } from "../payload";
import { ChangePasswordResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";

export const changePassword = async (email: string, payload: ChangePasswordPayload): Promise<ChangePasswordResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: ChangePasswordResponse = await api.put<ChangePasswordResponse>(
            `/auth/change-password/${email}`,
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
            else if (response.status === 401) {
                throw ErrorFactory.create(
                    "Usuario o contraseña incorrectos, intente nuevamente",
                    "Unauthorized"
                );
            }
            else if (response.status === 400) {
                throw ErrorFactory.create(
                    "La nueva contraseña no cumple con los requerimientos de seguridad",
                    "BadRequest"
                )
            }
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
