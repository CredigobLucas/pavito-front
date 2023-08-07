"use client";
import { PavitoDataContext, IPavitoDataContext } from "./PavitoDataContext";
import { useState, useEffect } from "react";
import { getBids } from "@/services/pavito_back/bids/get";
import { Bid } from "@/domain/models";
import { useGlobalContext } from "@/app/context";

export const PavitoDataContextProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const { setOpenLoading } = useGlobalContext();
    const sectors: string[] = [
        "TODOS",
        "SALUD",
        "AGRICULTURA",
        "INTERIOR",
        "EDUCACION",
        "SEDE ADMINISTRATIVA",
        "VIVIENDA CONSTRUCCION Y SANEAMIENTO"
    ];
    const [queryFilter, setQueryFilter] = useState<string>("");
    const [queryPagination, setQueryPagination] = useState<string>(
        "page_number=1&items_per_page=10"
    );
    const [bids, setBids] = useState<Bid[]>([]);

    const getBidsP = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            const response = await getBids(`${queryFilter}&${queryPagination}`);
            setBids(response.body.licitaciones);
        } finally {
            setOpenLoading(false);
        }
    };

    useEffect(() => {
        if (queryFilter !== "" && queryPagination !== "") {
            getBidsP();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryFilter, queryPagination]);

    const value: IPavitoDataContext = {
        sectors: sectors,
        queryFilter: queryFilter,
        setQueryFilter: setQueryFilter,
        queryPagination: queryPagination,
        setQueryPagination: setQueryPagination,
        bids: bids
    };

    return (
        <PavitoDataContext.Provider value={value}>
            {children}
        </PavitoDataContext.Provider>
    );
};
