import { PavitoEnterprise } from "@/domain/models";

export interface GetEnterpriseDetailsResponse {
    status: number;
    body: PavitoEnterprise
}
