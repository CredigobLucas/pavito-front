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

    useEffect(() => {
        const label = params.get("company_label");
        const data = params.get("company_data");
        if (label && data && user?.id) {
            setCompanyLabel(label);
            setCompanyData(data);
            setOpenLoading(true);
            getBidsByCompany(params.toString())
                .then((res) => {
                    const { licitaciones } = res.body;
                    if (licitaciones.length > 0) {
                        setRuc(licitaciones[0].ruc);
                        setBids(licitaciones);
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

    const updateUrlParams = (): void => {
        const params = `?company_label=${companyLabel}&company_data=${companyData}`;
        router.push(`${pathname}${params}`);
    };

    const value: IPavitoDataSearchContext = {
        companyLabel,
        setCompanyLabel,
        companyData,
        setCompanyData,
        updateUrlParams,
        ruc,
        bids,
        selectedBid,
        setSelectedBid
    };

    return (
        <PavitoDataSearchContext.Provider value={value}>
            {children}
        </PavitoDataSearchContext.Provider>
    );
};
