import { PavitoBackApi } from "../../../PavitoBackApi";
import { LoginPayload } from "../payload";
import { LoginResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: LoginResponse = await api.post<LoginResponse>(
            "/auth/login",
            payload
        );
        api.setHeader(
            "Authorization",
            `Bearer ${response.body.authentication_result.id_token} ${response.body.authentication_result.access_token}`
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
            if (response.data.body.message === "New password required") {
                throw ErrorFactory.create(
                    "Debes cambiar tu contraseña",
                    "NewPasswordRequired"
                );
            }
            if (response.status === 401) {
                throw ErrorFactory.create(
                    "Usuario o contraseña incorrectos, intente nuevamente",
                    "Unauthorized"
                );
            }
            if (response.status === 403) {
                throw ErrorFactory.create(
                    "El usuario no tiene permisos para acceder a esta aplicación",
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
