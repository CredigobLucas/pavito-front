import { PavitoBackApi } from "../../../PavitoBackApi";
import { EnterpriseUsersPayload } from "../payload";
import { EnterpriseUsersResponse } from "../response";
import { isAxiosError } from "axios";
import { ErrorFactory } from "@/domain/errors/ErrorFactory";

export const getUsers = async (
    payload: EnterpriseUsersPayload
): Promise<EnterpriseUsersResponse> => {
    const api = new PavitoBackApi();

    try {
        const response: EnterpriseUsersResponse =
            await api.get<EnterpriseUsersResponse>("/enterprise/user", payload);
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
        }
        throw ErrorFactory.create(
            "Error en el servidor, intente nuevamente",
            "Unknown"
        );
    }
};
