import { Payload } from "@/services/Payload";

export interface GetBidDetailPayload extends Payload {
    item: string;
    licitacion: string;
    milestone: string;
    participante: string;
}
