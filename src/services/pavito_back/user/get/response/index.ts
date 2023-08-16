import { User } from "@/domain/models";
import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface UserMeResponse extends GenericStatusResponse {
    body: User;
}
