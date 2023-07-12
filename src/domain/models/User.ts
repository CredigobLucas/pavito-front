import { EDocumentType } from "../enum";

export interface User {
    id: string;
    name: string;
    lastName: string;
    documentType: EDocumentType;
    documentNumber: string;
    email: string;
    cellphone: string;
    password?: string;
    role?: string;
}
