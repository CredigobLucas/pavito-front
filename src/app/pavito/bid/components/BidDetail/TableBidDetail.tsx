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
}

export const TableBidDetail = ({
    data,
    rows,
    className = ""
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
                        className="flex w-full flex-col md:flex-row py-2"
                    >
                        <SubtitleBidDetail
                            className="w-full md:w-1/2"
                            subtitle={row.title}
                        />
                        <Box
                            className="w-full md:w-1/2 mt-1 md:mt-0"
                            component={"span"}
                        >
                            {row.key === "nivelGobierno"
                                ? nivelesGobierno[data[row.key]]
                                : row.key === "montoAdjudicado" 
                                ? new CustomNumber(data[row.key]).format() 
                                : data[row.key]
                            }
                        </Box>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};
