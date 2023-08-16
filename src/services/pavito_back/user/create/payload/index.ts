import { Payload } from "@/services/Payload";

export interface CreateUserPayload extends Payload {
    last_name: string;
    name: string;
    email: string;
}
