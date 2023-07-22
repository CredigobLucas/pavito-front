import { EDocumentType, EStatusType } from "../enum";

export interface User {
    id: string;
    name: string;
    lastName: string;
    documentType: EDocumentType;
    documentNumber: string;
    email: string;
    cellphone: string;
    status?: EStatusType;
    password?: string;
    role?: string;
}
