"use client";
import { Container } from "@mui/material";
export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Container
            component="main"
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}
        >
            {children}
        </Container>
    );
}
