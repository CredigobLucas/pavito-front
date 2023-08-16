"use client";
import { PavitoDataSearchContextProvider } from "./context";
export default function PavitoLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <PavitoDataSearchContextProvider>
            {children}
        </PavitoDataSearchContextProvider>
    );
}
