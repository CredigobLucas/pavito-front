"use client";
import { useGlobalContext } from "@/app/context";
import { useLayoutEffect } from "react";
import { Box } from "@mui/material";

export default function PavitoBid(): JSX.Element {
    const { setSectionTitle } = useGlobalContext();


    useLayoutEffect(() => {
        setSectionTitle("logo");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box
            component={"div"}
            className="flex mt-5 flex-col lg:flex-row"
            sx={{
                gap: "25px"
            }}
        >
            soy el buscador exacto lalala
        </Box>
    );
}
