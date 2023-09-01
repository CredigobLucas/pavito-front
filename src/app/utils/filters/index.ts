import { PavitoDataFilters } from "@/domain/interface/PavitoDataFilters";

export const DEFAULT_PAVITO_DATA_FILTERS: PavitoDataFilters = {
    amountFrom: null,
    amountTo: null,
    govLevel: "GL",
    sector: "Todos",
    region: "Todos",
    objLicitation: "Bien",
    daysAgo: "60",
    dateFrom: "",
    dateTo: ""
}