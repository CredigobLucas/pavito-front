import { PavitoBid } from "@/domain/models";
import { GenericStatusResponse } from "@/services/pavito_back/generic/response";

export interface GetBidDetailResponse extends GenericStatusResponse {
    body: PavitoBid;
}
