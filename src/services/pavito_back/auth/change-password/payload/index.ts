import { Payload } from "@/services/Payload";

export interface ChangePasswordPayload extends Payload {
  password: string;
  new_password: string;
}
