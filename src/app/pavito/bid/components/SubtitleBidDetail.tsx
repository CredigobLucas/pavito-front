import { Typography } from "@mui/material";

interface SubtitleBidDetailProps {
    subtitle: string;
}

export const SubtitleBidDetail = ({
    subtitle
}: SubtitleBidDetailProps): JSX.Element => {
    return (
        <Typography
            variant={"body1"}
            className="font-semibold"
            color={"primary"}
        >
            {subtitle}
        </Typography>
    );
};
