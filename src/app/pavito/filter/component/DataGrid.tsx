"use client";
import { Bid } from "@/domain/models";
import { Grid } from "@mui/material";
import { BidCard } from "../../components/BidCard";
interface DataGridProps {
    bids: Bid[];
}

export const DataGrid = ({ bids }: DataGridProps): JSX.Element => {
    return (
        <Grid container>
            {bids.map((bid, index) => (
                <Grid className="p-3" item key={index} xs={12} md={6}>
                    <BidCard bid={bid} />
                </Grid>
            ))}
        </Grid>
    );
};
