"use client";
import "./globals.css";
import { darkTheme, ligthTheme } from "@/theme";
import { ThemeProvider, CssBaseline, Theme } from "@mui/material";
import { useState } from "react";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [theme, setTheme] = useState<Theme>(darkTheme);

    return (
        <html lang="es">
            <head>
                <title>Pavito Digital</title>
            </head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <body>{children}</body>
            </ThemeProvider>
        </html>
    );
}
