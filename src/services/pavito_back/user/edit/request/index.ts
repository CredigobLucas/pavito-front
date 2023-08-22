import { PavitoBackApi } from "../../../PavitoBackApi";
import { EditUserPayload } from "../payload";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";
import { EditUserResponse } from "../response";

export const editUser = async (
    payload: EditUserPayload
): Promise<EditUserResponse> => {
    const api = new PavitoBackApi();
    try {
        const response: EditUserResponse = await api.put<EditUserResponse>(
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
