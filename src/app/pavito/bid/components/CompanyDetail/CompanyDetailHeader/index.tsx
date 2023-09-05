import { PavitoEnterprise } from "@/domain/models";
import { Box, Paper } from "@mui/material";
import { CompanyDetailDetail } from "./CompanyDetailDetail";

interface CompanyDetailHeaderProps {
    enterpriseDetails: PavitoEnterprise;
    mype: boolean;
    hasMargin?: boolean;
    mobileMode?: boolean;
}

export const CompanyDetailHeader = ({
    enterpriseDetails,
    mype,
    hasMargin = true,
    mobileMode = false
}: CompanyDetailHeaderProps): JSX.Element => {
    return (
        <>
            {mobileMode ? (
                <Paper
                    className={hasMargin ? "mt-6 p-6" : "p-6"}
                    elevation={3}
                    component={"div"}
                >
                    <CompanyDetailDetail
                        enterpriseDetails={enterpriseDetails}
                        mype={mype}
                        mobileMode={mobileMode}
                    />
                </Paper>
            ) : (
                <Box className={hasMargin ? "mt-6" : ""} component={"div"}>
                    <CompanyDetailDetail
                        enterpriseDetails={enterpriseDetails}
                        mype={mype}
                        mobileMode={mobileMode}
                    />
                </Box>
            )}
        </>
    );
};
