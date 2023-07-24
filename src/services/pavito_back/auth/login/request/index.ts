import { PavitoBackApi } from "../../../PavitoBackApi";
import { LoginPayload } from "../payload";
import { LoginResponse } from "../response";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const api = new PavitoBackApi();
    const response: LoginResponse = await api.post<LoginResponse>(
        "/auth/login",
        payload
    );
    return response;
};
