"use client";

export default function RootLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex items-center justify-center w-screen h-screen">
            {children}
        </main>
    );
}
