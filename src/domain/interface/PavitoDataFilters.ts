import { IObject } from "@/app/utils";

export interface PavitoDataFilters extends IObject {
    amountFrom: number | null;
    amountTo: number | null;
    govLevel: string;
    sector: string;
    region: string;
    objLicitation: string;
    daysAgo: string;
    dateFrom: string;
    dateTo: string;
}