"use client";
import {
    PavitoDataFilterContext,
    IPavitoDataFilterContext
} from "./PavitoDataFilterContext";
import { useEffect, useState } from "react";
import { getBids } from "@/services/pavito_back/bids/get";
import { Bid } from "@/domain/models";
import { useGlobalContext } from "@/app/context";

import { PavitoDataFilters } from "@/domain/interface/PavitoDataFilters";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CALC_DAYS_AGO, CLEAN_NULL_VALUES, IObject } from "@/app/utils";

const keysToAdapt: IObject = {
    amountFrom: "bid_min_amount",
    amountTo: "bid_max_amount",
    govLevel: "gov_level",
    sector: "sector",
    region: "department",
    objLicitation: "bid_obj",
    daysAgo: "days_ago",
    dateFrom: "initial_date",
    dateTo: "final_date"
};

export const PavitoDataContextProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const { setOpenLoading, openAlertMessage, avaibleRegions } = useGlobalContext();
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
    const [bids, setBids] = useState<Bid[]>([]);
    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(100);

    const [filters, setFilters] = useState<PavitoDataFilters>({
        amountFrom: null,
        amountTo: null,
        govLevel: "GL",
        sector: null,
        region: "",
        objLicitation: "Bien",
        daysAgo: "30",
        dateFrom: "",
        dateTo: ""
    });

    const getBidsP = async (query: string): Promise<void> => {
        try {
            setOpenLoading(true);
            const response = await getBids(query);
            
            const paramsObj: IObject = {};
            const paramsArray = query.split("&");
            paramsArray.forEach((param: string) => {
                const [key, value] = param.split("=");
                paramsObj[key] = value;
            });
            setPage(response.body.paginaVigente - 1);
            setPageSize(parseInt(paramsObj["items_per_page"]));
            // numeroPaginas es numeroRows
            setTotal(
                response.body.numeroPaginas
            );
            setBids(response.body.licitaciones);
        } catch(e) {
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "error",
                message: "Error al obtener las licitaciones"
            });
        }finally {
            setOpenLoading(false);
        }
    };

    const setQueryFilterAndUpdate = (): void => {
        updateUrlParams({
            filter: convertFilterToQuery(),
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
        updateUrlParams({
            filter: convertFilterToQuery(),
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
        if (avaibleRegions.length > 0) {
            const queryParams = params.toString()
            if(queryParams !== "") getBidsP(params.toString());
            else {
                const filter = convertFilterToQuery();
                const pagination = `page_number=1&items_per_page=10`;
                getBidsP(`${filter}&${pagination}`);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, avaibleRegions]);

    const adaptFilter = (): IObject => {
        const obj: IObject = CLEAN_NULL_VALUES({
            ...filters,
            sector: filters.sector === "TODOS" ? null : filters.sector,
            daysAgo: filters.daysAgo === "-1" ? null : filters.daysAgo,
            region: filters.region ? filters.region : avaibleRegions[0]
            
        });

        const adaptedObj: IObject = {};
        Object.keys(obj).forEach((key: string) => {
            if (obj[key]) {
                adaptedObj[keysToAdapt[key]] = obj[key];
            }
        });
        return adaptedObj;
    };

    const convertFilterToQuery = (): string => {
        const adaptedObj: IObject = adaptFilter();
        if (adaptedObj["days_ago"]) {
            const [start, end] = CALC_DAYS_AGO(adaptedObj["days_ago"]);
            adaptedObj["initial_date"] = start;
            adaptedObj["final_date"] = end;
        }
        const params = new URLSearchParams();
        Object.keys(adaptedObj).forEach((key: string) => {
            params.set(key, adaptedObj[key]);
        });
        return params.toString();
    };

    const value: IPavitoDataFilterContext = {
        bids: bids,
        sectors: sectors,
        setQueryFilter: setQueryFilterAndUpdate,
        page: page,
        pageSize: pageSize,
        total: total,
        setQueryPagination: setQueryPaginationAndUpdate,
        filters: filters,
        setFilters: setFilters,
        convertFilterToQuery: convertFilterToQuery
    };

    return (
        <PavitoDataFilterContext.Provider value={value}>
            {children}
        </PavitoDataFilterContext.Provider>
    );
};
