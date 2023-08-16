import { Pagination } from "@/domain/interface/Pagination";
import { User } from "@/domain/models";
import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface EnterpriseUsersResponse extends GenericStatusResponse {
    body: {
        pagination: Pagination;
        users: User[];
    };
}
