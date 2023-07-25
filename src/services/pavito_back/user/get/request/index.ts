import { PavitoBackApi } from "../../../PavitoBackApi";
import { UserMeResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
export const userMe = async (): Promise<UserMeResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: UserMeResponse = await api.get<UserMeResponse>("/user");
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
