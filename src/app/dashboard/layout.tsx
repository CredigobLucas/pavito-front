"use client";
export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header>
                <h1>Panel</h1>
            </header>
            <main>{children}</main>
        </>
    );
}
