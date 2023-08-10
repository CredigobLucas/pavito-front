"use client";
import { useGlobalContext } from "@/app/context";
import { useLayoutEffect, useState } from "react";
import { Box } from "@mui/material";
import { CompanyDetails, BidDetail, BidDetailParams } from "./components";
import { useSearchParams } from "next/navigation";

export default function PavitoBid(): JSX.Element {
    const { setSectionTitle } = useGlobalContext();
    const params = useSearchParams();
    const [ruc, setRuc] = useState<string>("");
    const [bidDetailParams, setBidDetailParams] = useState<BidDetailParams | null>(null);


    useLayoutEffect(() => {
        setSectionTitle("logo");
        setRuc(params.get("ruc") || "");

        const item = params.get("item") || "";
        const licitacion = params.get("licitacion") || "";
        const milestone = params.get("milestone") || "";
        const participante = params.get("participante") || "";

        setBidDetailParams({
            item,
            licitacion,
            milestone,
            participante
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            component={"div"}
            className="flex flex-col"
        >
            <CompanyDetails ruc={ruc} />
            <BidDetail params={bidDetailParams} />
        </Box>
    );
}
