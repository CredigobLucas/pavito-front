"use client";
import { PavitoDataContextProvider } from "./context";
export default function PavitoLayout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return <PavitoDataContextProvider>{children}</PavitoDataContextProvider>;
}
