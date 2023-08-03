"use client";
import { Theme } from "@emotion/react";
import { Box, Paper, SxProps, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useGlobalContext } from "@/app/context";

interface ItemIconCardProps {
    title: string;
    content: string;
    color?: string;
    backgroundIcon?: string;
    sx?: SxProps<Theme>;
    icon: React.ReactNode;
}
export const ItemIconCard = ({
    title,
    content,
    color = "inherit",
    backgroundIcon = "transparent",
    sx = {},
    icon
}: ItemIconCardProps) => {
    const { theme } = useGlobalContext();
    return (
        <Box sx={sx}>
            <Paper className="p-4 flex w-full flex-row items-center">
                <Box
                    className="rounded-full p-4 z-0 flex items-center justify-center"
                    sx={{
                        color: color,
                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? "rgba(0,0,0,0.2)"
                                : backgroundIcon,
                        width: "50px",
                        height: "50px"
                    }}
                >
                    {icon}
                </Box>
                <Box className="ml-4">
                    <Typography
                        className="font-semibold"
                        variant="body1"
                        color={color}
                    >
                        {title}
                    </Typography>
                    <Typography variant="h6">{content}</Typography>
                </Box>
            </Paper>
        </Box>
    );
};
