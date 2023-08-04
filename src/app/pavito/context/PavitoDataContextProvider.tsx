"use client";
import { PavitoDataContext, IPavitoDataContext } from "./PavitoDataContext";
export const PavitoDataContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const sectors: string[] = [
        "TODOS",
        "SALUD",
        "AGRICULTURA",
        "INTERIOR",
        "EDUCACION",
        "SEDE ADMINISTRATIVA",
        "VIVIENDA CONSTRUCCION Y SANEAMIENTO"
    ];
    const value: IPavitoDataContext = {
        sectors: sectors
    };

    return (
        <PavitoDataContext.Provider value={value}>
            {children}
        </PavitoDataContext.Provider>
    );
};
