import { GroupPermission } from "./GroupPermission";
export interface Group {
    name: string;
    user_limit: number;
    id: string;
    is_active: boolean;
    permissions: GroupPermission[];
}
