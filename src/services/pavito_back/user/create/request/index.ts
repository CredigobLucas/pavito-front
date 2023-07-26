import { PavitoBackApi } from "../../../PavitoBackApi";
import { CreateUserPayload } from "../payload";
import { CreateUserResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
export const createUser = async (
    payload: CreateUserPayload
): Promise<CreateUserResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: CreateUserResponse = await api.post<CreateUserResponse>(
            "/user",
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
            if (response.status === 401) {
                throw ErrorFactory.create(
                    "Token expirado, inicie sesión nuevamente",
                    "Unauthorized"
                );
            }
            if (response.status === 409) {
                throw ErrorFactory.create(
                    "El correo o el documento de identidad ya fueron registrados",
                    "Conflict"
                );
            }
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
