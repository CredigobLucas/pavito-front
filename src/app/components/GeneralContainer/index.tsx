"use client";

import { Theme } from "@emotion/react";
import { Container, Paper, SxProps } from "@mui/material";

interface GeneralContainerProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

export const GeneralContainer = ({
    children,
    sx = {}
}: GeneralContainerProps) => {
    return (
        <Paper
            elevation={3}
            sx={{
                padding: "25px",
                height: "99%",
                overflowY: "auto",
                ...sx
            }}
        >
            {children}
        </Paper>
    );
};
