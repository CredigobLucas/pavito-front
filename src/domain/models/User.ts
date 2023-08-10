import { Group } from "./Group";

export interface User {
    last_name: string;
    name: string;
    email: string;
    id: string;
    is_active: boolean;
    groups: Group[];
    is_admin: boolean;
}
