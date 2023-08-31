"use client";
import { Bid } from "@/domain/models";
import { Grid } from "@mui/material";
import { BidCard } from "../../components/BidCard";

interface DataGridProps {
    bids: Bid[];
    onclick?: (bid: Bid) => void;
}

export const DataGrid = ({ bids, onclick }: DataGridProps): JSX.Element => {
    return (
        <Grid container>
            {bids.map((bid, index) => (
                <Grid className="p-3" item key={index} xs={12} md={6}>
                    <BidCard
                        bid={bid}
                        onclick={onclick}
                        href={`/pavito/bid?item=${bid.id_item}&licitacion=${bid.id_licitacion}&milestone=${bid.id_milestone}&participante=${bid.id_participante}&ruc=${bid.ruc}&mype=${bid.mype}`}
                    />
                </Grid>
            ))}
        </Grid>
    );
};
