import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface ActiveUserResponse extends GenericStatusResponse {
    body: {
        status_update: boolean;
    };
}
