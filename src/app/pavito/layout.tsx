"use client";
import { Navbar } from "../components";
import { Box } from "@mui/material";
export default function PavitoLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <>
            <Navbar />
            <Box className="px-10" component="main">
                {children}
            </Box>
        </>
    );
}
