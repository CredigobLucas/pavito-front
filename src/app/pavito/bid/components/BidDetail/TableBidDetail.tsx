import { PavitoBid } from "@/domain/models";
import { Box, Paper } from "@mui/material";
import { SubtitleBidDetail } from "../SubtitleBidDetail";
import { CustomNumber, IObject } from "@/app/utils";

interface TableBidRow {
    title: string;
    key: string;
}
interface TableBidDetailProps {
    data: PavitoBid;
    rows: TableBidRow[];
    className?: string;
    mobileMode?: boolean;
}

export const TableBidDetail = ({
    data,
    rows,
    className = "",
    mobileMode = false
}: TableBidDetailProps): JSX.Element => {
    const nivelesGobierno: IObject = {
        GL: "Local",
        GR: "Regional",
        GN: "Nacional"
    };
    return (
        <Box component={"div"} className={`${className}`}>
            <Paper elevation={3} className="p-4">
                {rows.map((row, index) => (
                    <Box
                        key={`${row.key}-${index}-bid-detail`}
                        component={"div"}
                        className={`flex w-full py-2 flex-col ${
                            mobileMode ? "" : "md:flex-row"
                        }`}
                    >
                        <SubtitleBidDetail
                            className={`w-full ${mobileMode ? "" : "md:w-1/2"}`}
                            subtitle={row.title}
                        />
                        <Box
                            className={`w-full mt-1 ${
                                mobileMode ? "" : "md:w-1/2 md:mt-0"
                            }`}
                            component={"span"}
                        >
                            {row.key === "nivelGobierno"
                                ? nivelesGobierno[data[row.key]]
                                : row.key === "montoAdjudicado"
                                ? new CustomNumber(data[row.key]).format()
                                : data[row.key]}
                        </Box>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};
