import { Bid } from "@/domain/models";
import { createContext, useContext } from "react";

export interface IPavitoDataContext {
    sectors: string[];
    queryFilter: string;
    setQueryFilter: (queryFilter: string) => void;
    queryPagination: string;
    setQueryPagination: (queryPagination: string) => void;
    bids: Bid[];
}

export const PavitoDataContext = createContext<IPavitoDataContext | undefined>(
    undefined
);

export const usePavitoDataContext: () => IPavitoDataContext =
    (): IPavitoDataContext => {
        const context = useContext(PavitoDataContext);
        if (!context) {
            throw new Error(
                "useGlobalContext must be used within a PavitoDataProvider"
            );
        }
        return context;
    };
