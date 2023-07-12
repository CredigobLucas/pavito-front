"use client";
import "./globals.css";
import { GlobalContextProvider } from "./context";
import { PavitoTheme } from "./components";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <head>
                <title>Pavito Digital</title>
            </head>
            <GlobalContextProvider>
                <PavitoTheme>{children}</PavitoTheme>
            </GlobalContextProvider>
        </html>
    );
}
