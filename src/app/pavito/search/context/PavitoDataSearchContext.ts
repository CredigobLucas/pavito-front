import { createContext, useContext } from "react";
import { Bid } from "@/domain/models";
export interface IPavitoDataSearchContext {
    companyLabel: string | undefined;
    setCompanyLabel: (companyLabel: string | undefined) => void;
    companyData: string | number | undefined;
    setCompanyData: (companyData: string | number | undefined) => void;
    updateUrlParams: () => void;
    ruc: string | undefined;
    bids: Bid[];
    selectedBid: Bid | undefined;
    setSelectedBid: (bid: Bid | undefined) => void;
}

export const PavitoDataSearchContext = createContext<
    IPavitoDataSearchContext | undefined
>(undefined);

export const usePavitoDataSearchContext: () => IPavitoDataSearchContext =
    (): IPavitoDataSearchContext => {
        const context = useContext(PavitoDataSearchContext);
        if (!context) {
            throw new Error(
                "useGlobalContext must be used within a PavitoDataProvider"
            );
        }
        return context;
    };
