"use client";
import { Navbar } from "../components";
import { Box } from "@mui/material";
import { PavitoDataSearchContextProvider } from "./search/context";
export default function PavitoLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <PavitoDataSearchContextProvider>
            <Navbar />
            <Box className="px-10" component="main">
                {children}
            </Box>
        </PavitoDataSearchContextProvider>
    );
}
