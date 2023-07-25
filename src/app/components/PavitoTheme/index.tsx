import { ThemeProvider, CssBaseline, Snackbar, Alert } from "@mui/material";
import { useGlobalContext } from "@/app/context";
export const PavitoTheme = ({ children }: { children: React.ReactNode }) => {
    const { theme, openAlert, setOpenAlert, alertMessage } = useGlobalContext();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={() => {
                    setOpenAlert(false);
                }}
                anchorOrigin={{
                    vertical: alertMessage.vertical,
                    horizontal: alertMessage.horizontal
                }}
            >
                <Alert
                    onClose={() => {
                        setOpenAlert(false);
                    }}
                    severity={alertMessage.severity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage.message}
                </Alert>
            </Snackbar>
            <body>{children}</body>
        </ThemeProvider>
    );
};
