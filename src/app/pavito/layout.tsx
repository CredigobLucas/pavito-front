"use client";
import { Navbar } from "../components";
import { Container } from "@mui/material";
import { PavitoDataSearchContextProvider } from "./search/context";
export default function PavitoLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <PavitoDataSearchContextProvider>
            <Navbar />
            <Container component="main">{children}</Container>
        </PavitoDataSearchContextProvider>
    );
}
