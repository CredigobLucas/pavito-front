import { Bid } from "@/domain/models";
import { createContext, useContext } from "react";

export interface IPavitoDataFilterContext {
    sectors: string[];
    queryFilter: string;
    setQueryFilter: (queryFilter: string) => void;
    queryPagination: string;
    setQueryPagination: (queryPagination: string) => void;
    resetPagination: () => void;
    page: number;
    setPage: (page: number) => void;
    pageSize: number;
    setPageSize: (pageSize: number) => void;
    total: number;
    setTotal: (total: number) => void;
    bids: Bid[];
    updateUrlParams: () => void;
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
