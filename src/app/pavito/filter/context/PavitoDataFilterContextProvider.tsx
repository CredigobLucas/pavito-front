"use client";
import {
    PavitoDataFilterContext,
    IPavitoDataFilterContext
} from "./PavitoDataFilterContext";
import { useEffect, useState } from "react";
import { getBids } from "@/services/pavito_back/bids/get";
import { Bid } from "@/domain/models";
import { useGlobalContext } from "@/app/context";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const PavitoDataContextProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const { setOpenLoading, user } = useGlobalContext();
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
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
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(100);

    const getBidsP = async (query: string): Promise<void> => {
        try {
            setOpenLoading(true);
            const response = await getBids(query);

            const paramsObj = Object.fromEntries(params);
            setPage(parseInt(paramsObj.page_number) - 1);
            setPageSize(parseInt(paramsObj.items_per_page));

            setTotal(
                response.body.numeroPaginas * parseInt(paramsObj.items_per_page)
            );
            setBids(response.body.licitaciones);
        } finally {
            setOpenLoading(false);
        }
    };

    const resetPagination = (): void => {
        setPage(1);
        setPageSize(10);
    };

    const setQueryFilterAndUpdate = (query: string): void => {
        setQueryFilter(query);
        updateUrlParams({
            filter: query,
            pagination: "page_number=1&items_per_page=10"
        });
    };

    const setQueryPaginationAndUpdate = ({
        pageP,
        pageSizeP
    }: {
        pageP?: number;
        pageSizeP?: number;
    }): void => {
        if (pageP !== undefined) {
            setPage(pageP);
        }
        if (pageSizeP) {
            setPageSize(pageSizeP);
            setPage(0);
        }
        setQueryPagination(
            `page_number=${
                pageP !== undefined ? pageP : page + 1
            }&items_per_page=${pageSizeP ? pageSizeP : pageSize}`
        );
        updateUrlParams({
            filter: queryFilter,
            pagination: `page_number=${
                pageSizeP ? 1 : pageP !== undefined ? pageP + 1 : page + 1
            }&items_per_page=${pageSizeP ? pageSizeP : pageSize}`
        });
    };

    const updateUrlParams = ({
        filter,
        pagination
    }: {
        filter: string;
        pagination: string;
    }): void => {
        const params = `${filter}&${pagination}`;
        router.push(pathname + "?" + params);
    };

    useEffect(() => {
        if (user?.id) {
            getBidsP(params.toString());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, user]);

    const value: IPavitoDataFilterContext = {
        sectors: sectors,
        queryFilter: queryFilter,
        setQueryFilter: setQueryFilterAndUpdate,
        queryPagination: queryPagination,
        setQueryPagination: setQueryPaginationAndUpdate,
        bids: bids,
        page: page,
        setPage: setPage,
        pageSize: pageSize,
        setPageSize: setPageSize,
        total: total,
        setTotal: setTotal,
        resetPagination: resetPagination,
        simpleSetQueryFilter: setQueryFilter
    };

    return (
        <PavitoDataFilterContext.Provider value={value}>
            {children}
        </PavitoDataFilterContext.Provider>
    );
};