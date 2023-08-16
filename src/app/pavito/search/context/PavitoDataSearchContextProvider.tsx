"use client";
import {
    PavitoDataSearchContext,
    IPavitoDataSearchContext
} from "./PavitoDataSearchContext";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { getBidsByCompany } from "@/services/pavito_back/bids/by_company";
import { Bid } from "@/domain/models";

export const PavitoDataSearchContextProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [companyLabel, setCompanyLabel] = useState<string | undefined>(
        undefined
    );
    const [companyData, setCompanyData] = useState<string | number | undefined>(
        undefined
    );
    const [ruc, setRuc] = useState<string | undefined>(undefined);
    const [bids, setBids] = useState<Bid[]>([]);

    useEffect(() => {
        const label = params.get("company_label");
        const data = params.get("company_data");
        if (label && data) {
            setCompanyLabel(label);
            setCompanyData(data);
            getBidsByCompany(params.toString()).then((res) => {
                const { licitaciones } = res.body;
                setRuc(licitaciones[0].ruc);
                setBids(licitaciones);
            });
        }
    }, [params]);

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
        bids
    };

    return (
        <PavitoDataSearchContext.Provider value={value}>
            {children}
        </PavitoDataSearchContext.Provider>
    );
};
