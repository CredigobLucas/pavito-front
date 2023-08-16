import { Enterprise } from "@/domain/models/Enterprise";
import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface GetEnterpriseResponse extends GenericStatusResponse {
    body: Enterprise;
}
