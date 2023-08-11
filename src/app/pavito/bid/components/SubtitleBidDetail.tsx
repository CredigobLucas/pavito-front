import { Typography } from "@mui/material";

interface SubtitleBidDetailProps {
    subtitle: string;
    className?: string;
}

export const SubtitleBidDetail = ({
    subtitle,
    className = ""
}: SubtitleBidDetailProps): JSX.Element => {
    return (
        <Typography
            variant={"body1"}
            className={`font-semibold ${className}`}
            color={"primary"}
        >
            {subtitle}
        </Typography>
    );
};
