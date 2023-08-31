import { PavitoDataFilters } from "@/domain/interface/PavitoDataFilters";

export interface IObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const CLEAN_NULL_VALUES = (obj: IObject): IObject => {
    Object.keys(obj).forEach(
        (key) => (obj[key] === null || obj[key] === "") && delete obj[key]
    );
    return obj;
};

const ADAPT_TO_KEYS: IObject = {
    bid_min_amount: "amountFrom",
    bid_max_amount: "amountTo",
    gov_level: "govLevel",
    sector: "sector",
    department: "region",
    bid_obj: "objLicitation",
    days_ago: "daysAgo",
    initial_date: "dateFrom",
    final_date: "dateTo"
};

export const PARSE_OBJECT_TO_PAVITO_DATA_FILTERS = (obj: IObject): PavitoDataFilters => {
    Object.keys(obj).forEach((key: string) => {
        if (ADAPT_TO_KEYS[key]) {
            obj[ADAPT_TO_KEYS[key]] = obj[key];
        }
    });
    return obj as PavitoDataFilters;
};