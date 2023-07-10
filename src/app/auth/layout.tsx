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
            <body>
                <div>asfs</div>
                {children}
            </body>
        </html>
    );
}
