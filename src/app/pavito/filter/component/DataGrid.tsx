"use client";
import { Bid } from "@/domain/models";
interface DataGridProps {
    bids: Bid[];
}

export const DataGrid = ({ bids }: DataGridProps): JSX.Element => {
    return (
        <pre>
            grilla
            <code>{JSON.stringify(bids, null, 2)}</code>
        </pre>
    );
};
