import { Payload } from "@/services/Payload";

export interface ForgotPasswordPayload extends Payload {
  email: string;
}
