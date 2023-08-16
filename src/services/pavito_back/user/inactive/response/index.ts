import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface InactiveUserResponse extends GenericStatusResponse {
    body: {
        status_update: boolean;
    };
}
