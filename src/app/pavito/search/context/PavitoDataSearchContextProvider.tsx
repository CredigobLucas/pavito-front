"use client";
import {
    PavitoDataSearchContext,
    IPavitoDataSearchContext
} from "./PavitoDataSearchContext";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getBidsByCompany } from "@/services/pavito_back/bids/by_company";
import { Bid } from "@/domain/models";
import { useGlobalContext } from "@/app/context";

export const PavitoDataSearchContextProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { user, setOpenLoading } = useGlobalContext();

    const [companyLabel, setCompanyLabel] = useState<string | undefined>(
        undefined
    );
    const [companyData, setCompanyData] = useState<string | number | undefined>(
        undefined
    );
    const [ruc, setRuc] = useState<string | undefined>(undefined);
    const [bids, setBids] = useState<Bid[]>([]);
    const [selectedBid, setSelectedBid] = useState<Bid | undefined>(undefined);

    const [page, setPage] = useState<number>(0);
    const [pageSize, setPageSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(100);

    useEffect(() => {
        const label = params.get("company_label");
        const data = params.get("company_data");
        if (label && data && user?.id) {
            setCompanyLabel(label);
            setCompanyData(data);
            setOpenLoading(true);
            getBidsByCompany(params.toString())
                .then((res) => {
                    const { licitaciones, numeroPaginas } = res.body;
                    if (licitaciones.length > 0) {
                        setRuc(licitaciones[0].ruc);
                        setBids(licitaciones);
                        setTotal(numeroPaginas);
                    } else {
                        setRuc(undefined);
                        setBids([]);
                    }
                })
                .finally(() => {
                    setOpenLoading(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, user]);

    const setQueryPagination = ({
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
            filter: `company_label=${companyLabel}&company_data=${companyData}`,
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

    const updateUrlAndUpdate = (): void => {
        updateUrlParams({
            filter: `company_label=${companyLabel}&company_data=${companyData}`,
            pagination: `page_number=${page + 1}&items_per_page=${pageSize}`
        });
    };

    const value: IPavitoDataSearchContext = {
        companyLabel,
        setCompanyLabel,
        companyData,
        setCompanyData,
        updateUrlParams: updateUrlAndUpdate,
        ruc,
        bids,
        selectedBid,
        setSelectedBid,
        page,
        pageSize,
        total,
        setQueryPagination
    };

    return (
        <PavitoDataSearchContext.Provider value={value}>
            {children}
        </PavitoDataSearchContext.Provider>
    );
};
