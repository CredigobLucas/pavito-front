import { Enterprise } from "@/domain/models/Enterprise";
export interface GetEnterpriseResponse {
    status: number;
    body: Enterprise;
}
