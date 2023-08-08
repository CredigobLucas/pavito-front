"use client";
import { IconButton } from "@mui/material";
import { FileDownloadOutlined } from "@mui/icons-material";

export const DownloadBids = (): JSX.Element => {
    return (
        <IconButton
            sx={{
                color: (theme): string =>
                    theme.palette.mode === "dark" ? "default" : "primary"
            }}
            className="mx-2"
        >
            <FileDownloadOutlined />
        </IconButton>
    );
};
