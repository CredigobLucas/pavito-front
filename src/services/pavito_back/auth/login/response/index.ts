import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface LoginResponse extends GenericStatusResponse {
    body: {
        authentication_result: {
            access_token: string;
            expires_in: number;
            id_token: string;
            refresh_token: string;
            token_type: string;
        };
        challenge_name: null;
    };
}
