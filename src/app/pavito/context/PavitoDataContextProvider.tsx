"use client";
import { PavitoDataContext, IPavitoDataContext } from "./PavitoDataContext";
export const PavitoDataContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const value: IPavitoDataContext = {};

    return (
        <PavitoDataContext.Provider value={value}>
            {children}
        </PavitoDataContext.Provider>
    );
};
