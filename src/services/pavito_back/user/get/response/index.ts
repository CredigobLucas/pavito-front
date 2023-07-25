import { User } from "@/domain/models";
export interface UserMeResponse {
    status: number;
    body: User;
}
