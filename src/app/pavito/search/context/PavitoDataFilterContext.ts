import { createContext, useContext } from "react";
export interface IPavitoDataSearchContext {}

export const PavitoDataSearchContext = createContext<IPavitoDataSearchContext | undefined>(undefined);

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
