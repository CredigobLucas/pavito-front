import { ThemeProvider, CssBaseline, Snackbar, Alert } from "@mui/material";
import { useLayoutEffect } from "react";
import { userMe } from "@/services/pavito_back/user/get";
import { Loader } from "../Loader";
import { useState } from "react";

import { useGlobalContext } from "@/app/context";

export const PavitoTheme = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const {
        theme,
        openAlert,
        setOpenAlert,
        alertMessage,
        setUser,
        openLoading
    } = useGlobalContext();
    const [loading, setLoading] = useState<boolean>(false);
    useLayoutEffect(() => {
        setLoading(true);
        userMe()
            .then((res) => {
                setUser(res.body);
            })
            .finally(() => {
                setLoading(false);
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
            <Loader open={openLoading || loading} />
            <body>{children}</body>
        </ThemeProvider>
    );
};
