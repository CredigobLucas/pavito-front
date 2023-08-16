import { Pagination } from "@/domain/interface/Pagination";
import { User } from "@/domain/models";

export interface EnterpriseUsersResponse {
    status: number;
    body: {
        pagination: Pagination;
        users: User[];
    };
}
