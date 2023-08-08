"use client";

import { useGlobalContext } from "@/app/context";
import {
    ShareOutlined,
    FileDownloadOutlined,
    SortByAlphaOutlined
} from "@mui/icons-material";
import { Box, Typography, IconButton } from "@mui/material";

export const FilterHeader = (): JSX.Element => {
    const { openAlertMessage } = useGlobalContext();

    return (
        <Box
            component={"div"}
            className="w-full flex items-center justify-between mb-2"
        >
            <Typography
                className="font-bold"
                variant="h4"
                component="h1"
                sx={{
                    color: (theme): string =>
                        theme.palette.mode === "dark" ? "default" : "primary"
                }}
            >
                Prospectos
            </Typography>
            <Box>
                <IconButton
                    sx={{
                        color: (theme): string =>
                            theme.palette.mode === "dark"
                                ? "default"
                                : "primary"
                    }}
                    onClick={(): void => {
                        navigator.clipboard.writeText(`${window.location}`);
                        openAlertMessage({
                            horizontal: "center",
                            vertical: "top",
                            severity: "success",
                            message: "Copiado al portapapeles"
                        });
                    }}
                >
                    <ShareOutlined />
                </IconButton>
                <IconButton
                    sx={{
                        color: (theme): string =>
                            theme.palette.mode === "dark"
                                ? "default"
                                : "primary"
                    }}
                    className="mx-2"
                >
                    <FileDownloadOutlined />
                </IconButton>
                <IconButton
                    sx={{
                        color: (theme): string =>
                            theme.palette.mode === "dark"
                                ? "default"
                                : "primary"
                    }}
                >
                    <SortByAlphaOutlined />
                </IconButton>
            </Box>
        </Box>
    );
};
