import { Typography } from "@mui/material";

interface TitleBidDetailProps {
    title: string;
    className?: string;
}

export const TitleBidDetail = ({
    title,
    className = ""
}: TitleBidDetailProps): JSX.Element => {
    return (
        <Typography
            variant={"h6"}
            className={`font-bold ${className}`}
            color={"primary"}
        >
            {title}
        </Typography>
    );
};
