"use client";
import { Navbar } from "../components";
import { Container } from "@mui/material";
import { PavitoDataContextProvider } from "./context";
export default function PavitoLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Navbar />
            <PavitoDataContextProvider>
                <Container component="main">{children}</Container>
            </PavitoDataContextProvider>
        </>
    );
}
