"use client";
import {
    PavitoDataSearchContext,
    IPavitoDataSearchContext
} from "./PavitoDataFilterContext";

export const PavitoDataContextProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {

    const value: IPavitoDataSearchContext = {
    };

    return (
        <PavitoDataSearchContext.Provider value={value}>
            {children}
        </PavitoDataSearchContext.Provider>
    );
};
