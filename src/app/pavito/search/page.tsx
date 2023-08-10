"use client";
import { useGlobalContext } from "@/app/context";
import { useLayoutEffect } from "react";
import { Box } from "@mui/material";

export default function PavitoFilter(): JSX.Element {
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
            <Box
                sx={{
                    minWidth: "300px",
                    border: "1px solid red",
                }}
            >
                buscador gaaa
            </Box>
            <Box component="section" className="w-full">
                <Box
                    component={"div"}
                    sx={{border: "1px solid yellow"}}
                >
                    header gaaa
                </Box>
                <Box 
                    className="mt-6" 
                    component={"div"}
                    sx={{border: "1px solid orange"}}
                >
                    empresa gaaa
                </Box>
                <Box 
                    className="mt-6" 
                    component={"div"}
                    sx={{border: "1px solid skyblue"}}
                >
                    detalle licitacion gaaa
                </Box>
            </Box>
        </Box>
    );
}
