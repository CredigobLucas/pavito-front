import { Bid } from "@/domain/models";
import { createContext, useContext } from "react";
import { PavitoDataFilters } from "@/domain/interface/PavitoDataFilters";
export interface IPavitoDataFilterContext {
    bids: Bid[];
    sectors: string[];
    setQueryFilter: () => void;
    page: number;
    pageSize: number;
    total: number;
    setQueryPagination: (data: { pageP?: number; pageSizeP?: number }) => void;
    filters: PavitoDataFilters;
    setFilters: (filters: PavitoDataFilters) => void;
    convertFilterToQuery: () => string;
}

export const PavitoDataFilterContext = createContext<
    IPavitoDataFilterContext | undefined
>(undefined);

export const usePavitoDataFilterContext: () => IPavitoDataFilterContext =
    (): IPavitoDataFilterContext => {
        const context = useContext(PavitoDataFilterContext);
        if (!context) {
            throw new Error(
                "useGlobalContext must be used within a PavitoDataProvider"
            );
        }
        return context;
    };
