"use client";
import { Bid } from "@/domain/models";
import { Grid, Paper } from "@mui/material";
interface DataGridProps {
    bids: Bid[];
}

export const DataGrid = ({ bids }: DataGridProps): JSX.Element => {
    return (
        <Grid container>
            {bids.map((bid, index) => (
                <Grid className="p-2" item key={index} xs={12} md={6}>
                    <Paper elevation={3}>
                        <pre className="p-4 whitespace-pre-wrap">
                            {JSON.stringify(bid, null, 2)}
                        </pre>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};
