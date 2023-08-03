"use client";
import { Typography } from "@mui/material";

interface LicenseCardTitleProps {
    title: string;
    sx?: any;
}

export const LicenseCardTitle = ({ title, sx = {} }: LicenseCardTitleProps) => {
    return (
        <Typography className="font-bold" sx={sx} variant="h4">
            {title}
        </Typography>
    );
};
