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
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
