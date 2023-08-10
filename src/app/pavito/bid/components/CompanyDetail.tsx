"use client";
import { getEnterpriseDetails } from "@/services/pavito_back/bids/enterprise_detail";
import { useGlobalContext } from "@/app/context";
import { useEffect, useState } from "react";
import { PavitoEnterprise } from "@/domain/models";
import { CircularProgress } from "@mui/material";

interface CompanyDetailsProps {
    ruc: string;
}

export const CompanyDetails = ({ruc} : CompanyDetailsProps) : JSX.Element => {
    const {user} = useGlobalContext();
    const [enterpriseDetails, setEnterpriseDetails] = useState<PavitoEnterprise | undefined>(undefined);
    useEffect(() => {
        if(ruc && user && user.id) {
            getEnterpriseDetails(ruc).then((res) => {
                setEnterpriseDetails(res.body);
            });
        }
    }, [ruc, user]);
    
    return (
        <>
            {!enterpriseDetails ? (
                <CircularProgress />
            ) : (
                <pre>
                    <code lang="JSON">
                        {JSON.stringify(enterpriseDetails, null, 2)}
                    </code>
                </pre>
            )}
        </>
    )
}