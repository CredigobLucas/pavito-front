import { PavitoBid } from "@/domain/models";

export interface GetBidDetailResponse {
    status: number;
    body: PavitoBid;
}
