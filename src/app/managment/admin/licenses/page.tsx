"use client";
import { useGlobalContext } from "@/app/context";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getEnterprise } from "@/services/pavito_back/enterprise/get";
import { LicenseCard } from "./components";
import { License } from "@/domain/models/License";

export default function Licenses(): JSX.Element {
    const { setSectionTitle, setOpenLoading } = useGlobalContext();
    const [licenses, setLicenses] = useState<License[]>([]);
    const getEnterpriseData = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            const response = await getEnterprise();
            setLicenses(response.body.licenses);
        } finally {
            setOpenLoading(false);
        }
    };
    useEffect(() => {
        setSectionTitle("Licencias");
        getEnterpriseData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Box component="div" className="flex flex-wrap gap-3 overflow-y-auto">
            {licenses.map((license, index) => {
                return <LicenseCard key={index} license={license} />;
            })}
        </Box>
    );
}
