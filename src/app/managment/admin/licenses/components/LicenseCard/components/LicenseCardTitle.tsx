"use client";
import { Typography, SxProps } from "@mui/material";


interface LicenseCardTitleProps {
    title: string;
    sx?: SxProps;
}

export const LicenseCardTitle = ({ title, sx = {} }: LicenseCardTitleProps): JSX.Element => {
    return (
        <Typography className="font-bold" sx={sx} variant="h4">
            {title}
        </Typography>
    );
};
