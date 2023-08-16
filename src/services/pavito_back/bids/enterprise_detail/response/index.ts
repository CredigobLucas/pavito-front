import { PavitoEnterprise } from "@/domain/models";
import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface GetEnterpriseDetailsResponse extends GenericStatusResponse {
    body: PavitoEnterprise
}
