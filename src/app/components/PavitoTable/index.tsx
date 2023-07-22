"use client";
import {
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Box
} from "@mui/material";

interface Column<Data> {
    width?: number | string;
    align?: "right" | "left" | "center";
    label: string;
    value: (row: Data) => React.ReactNode;
}

interface PavitoTableProps<Data> {
    columns: Column<Data>[];
    rows: Data[];
    height?: number | string;
}

export function PavitoTable<Data>({
    columns = [],
    rows = [],
    height = "100%"
}: PavitoTableProps<Data>) {
    return (
        <Box sx={{ width: "100%" }}>
            <TableContainer
                sx={{ height: `${height} !important`, overflow: "auto" }}
            >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={`${column.label}-${index}`}
                                    align={column.align}
                                    style={{ minWidth: column.width }}
                                    className="font-bold"
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            return (
                                <TableRow key={`${row}-${index}`}>
                                    {columns.map((column, index) => {
                                        const value = column.value(row);
                                        return (
                                            <TableCell
                                                key={`${column.label}-${index}`}
                                                align={column.align}
                                            >
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
