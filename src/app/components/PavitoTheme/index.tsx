import { ThemeProvider, CssBaseline } from "@mui/material";
import { useGlobalContext } from "@/app/context";
export const PavitoTheme = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useGlobalContext();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <body>{children}</body>
        </ThemeProvider>
    );
};
