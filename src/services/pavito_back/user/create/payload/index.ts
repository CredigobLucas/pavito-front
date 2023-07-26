import { Payload } from "@/services/Payload";

export interface CreateUserPayload extends Payload {
    last_name: string;
    name: string;
    email: string;
    phone_number: string;
    document_type: string;
    document_number: string;
    password: string;
}
