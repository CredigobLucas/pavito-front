"use client";
import { Bid } from "@/domain/models";
interface DataTableProps {
    bids: Bid[];
}

export const DataTable = ({ bids }: DataTableProps): JSX.Element => {
    return (
        <pre>
            tabla
            <code>{JSON.stringify(bids, null, 2)}</code>
        </pre>
    );
};
