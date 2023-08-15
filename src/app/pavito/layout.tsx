"use client";
import { Navbar } from "../components";
import { Container } from "@mui/material";
export default function PavitoLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <>
            <Navbar />
            <Container component="main">{children}</Container>
        </>
    );
}
