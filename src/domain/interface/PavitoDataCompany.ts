import { IObject } from "@/app/utils";

export interface PavitoDataCompany extends IObject {
    companyLabel: string | undefined;
    companyData: string | number | undefined;
}