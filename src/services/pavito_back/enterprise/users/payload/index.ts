import { Payload } from "@/services/Payload";

export interface EnterpriseUsersPayload extends Payload {
    page_number: number;
    items_per_page: number;
    active_only: boolean;
}
