import { ThemeProvider, CssBaseline, Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";
import { userMe } from "@/services/pavito_back/user/get";

import { useGlobalContext } from "@/app/context";
export const PavitoTheme = ({ children }: { children: React.ReactNode }) => {
    const { theme, openAlert, setOpenAlert, alertMessage, setUser } =
        useGlobalContext();
    useEffect(() => {
        userMe().then((res) => {
            setUser(res.body);
        });
    }, []);
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
