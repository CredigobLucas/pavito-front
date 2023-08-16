import { Payload } from "@/services/Payload";

export interface ConfirmForgotPasswordPayload extends Payload {
  verification_code: string;
  new_password: string;
}
