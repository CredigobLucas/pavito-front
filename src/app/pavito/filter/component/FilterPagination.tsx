"use client";

import { TablePagination } from "@mui/material";
import { usePavitoDataFilterContext } from "../context";

export const FilterPagination = (): JSX.Element => {
    const { page, pageSize, total, setQueryPagination } =
        usePavitoDataFilterContext();

    return (
        <TablePagination
            className="mt-6"
            count={total}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={(_, page: number): void => {
                setQueryPagination({
                    pageP: page
                });
            }}
            onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
                setQueryPagination({
                    pageSizeP: parseInt(event.target.value, 10)
                });
            }}
            color="primary"
            sx={{
                border: "none",
                "& .MuiToolbar-root": {
                    padding: 0
                }
            }}
            component={"div"}
            labelDisplayedRows={({ from, to, count }): string =>
                `${from}-${to} de ${count}`
            }
            labelRowsPerPage={"Licitaciones por página"}
        />
    );
};
