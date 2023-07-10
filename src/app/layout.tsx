import "./globals.css";

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
            <body>{children}</body>
        </html>
    );
}
