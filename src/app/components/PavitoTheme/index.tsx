import { ThemeProvider, CssBaseline, Snackbar, Alert } from "@mui/material";
import { useEffect } from "react";
import { userMe } from "@/services/pavito_back/user/get";
import { Loader } from "../Loader";

import { useGlobalContext } from "@/app/context";


export const PavitoTheme = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const {
        theme,
        openAlert,
        setOpenAlert,
        alertMessage,
        setUser,
        openLoading
    } = useGlobalContext();
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
                onClose={(): void => {
                    setOpenAlert(false);
                }}
                anchorOrigin={{
                    vertical: alertMessage.vertical,
                    horizontal: alertMessage.horizontal
                }}
            >
                <Alert
                    onClose={(): void => {
                        setOpenAlert(false);
                    }}
                    severity={alertMessage.severity}
                    sx={{ width: "100%" }}
                >
                    {alertMessage.message}
                </Alert>
            </Snackbar>
            <Loader open={openLoading} />
            <body>{children}</body>
        </ThemeProvider>
    );
};
