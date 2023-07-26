import { License } from "./License";
export interface Enterprise {
    name: string;
    id: string;
    is_active: boolean;
    licenses: License[];
}
