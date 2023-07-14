"use client";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
export default function Pavito() {
    const { setSectionTitle } = useGlobalContext();
    useEffect(() => {
        setSectionTitle("Data");
    }, []);
    return (
        <>
            <Box className="mt-10" component="section">
                <Typography variant="h4" component="h1">
                    Pavito
                </Typography>
            </Box>
        </>
    );
}
