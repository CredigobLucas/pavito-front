import { Box, Typography } from "@mui/material";
import { SubtitleBidDetail } from "../../SubtitleBidDetail";

interface CompanyDetailHeaderItemProps {
    title: string;
    content: string;
}

export const CompanyDetailHeaderItem = ({
    title,
    content
}: CompanyDetailHeaderItemProps): JSX.Element => {
    return (
        <Box component={"div"} className="flex my-2">
            <SubtitleBidDetail subtitle={title} />
            <Typography variant={"body1"} color={"primary"} className="ml-2">
                {content}
            </Typography>
        </Box>
    );
};
