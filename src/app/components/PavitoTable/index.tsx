"use client";

import {
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    Box,
    Grid,
    Paper
} from "@mui/material";

interface Column<Data> {
    width?: number | string;
    align?: "right" | "left" | "center";
    label: React.ReactNode;
    value: (row: Data) => React.ReactNode;
}

interface PavitoTableProps<Data> {
    columns: Column<Data>[];
    rows: Data[];
    height?: number | string;
    convertCard?: boolean;
}

export function PavitoTable<Data>({
    columns = [],
    rows = [],
    height = "100%",
    convertCard = true
}: PavitoTableProps<Data>): JSX.Element {
    return (
        <Box sx={{ width: "100%" }}>
            <TableContainer
                sx={{
                    height: `${height} !important`,
                    overflow: "auto",
                    display: {
                        xs: `${convertCard ? "none" : "block"}`,
                        md: "block"
                    }
                }}
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
                                <TableRow key={`${index}-table`}>
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
            {convertCard && (
                <Grid
                    container
                    sx={{
                        display: {
                            md: "none"
                        }
                    }}
                >
                    {rows.map((row, index) => {
                        return (
                            <Grid
                                key={`${index}-grid`}
                                xs={12}
                                sm={6}
                                className="p-2"
                            >
                                <Paper
                                    className="p-4 overflow-x-hidden"
                                    elevation={4}
                                >
                                    {columns.map((column, index) => {
                                        const value = column.value(row);
                                        return (
                                            <Box
                                                key={`${column.label}-${index}-grid`}
                                                className="flex p-2 items-center"
                                            >
                                                <Box>{column.label}</Box>
                                                <Box className="ml-5">
                                                    {value}
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Box>
    );
}
