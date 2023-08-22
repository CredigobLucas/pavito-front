import { Payload } from "@/services/Payload";

export interface EditUserPayload extends Payload {
    last_name: string;
    name: string;
    email: string;
    user_id: string;
}
