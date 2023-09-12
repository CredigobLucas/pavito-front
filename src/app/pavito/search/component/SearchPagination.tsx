"use client";

import { TablePagination } from "@mui/material";
import { usePavitoDataSearchContext } from "../context";

export const SearchPagination = (): JSX.Element => {
    const { page, pageSize, total, setQueryPagination } =
        usePavitoDataSearchContext();

    return (
        <TablePagination
            className="mt-6"
            count={total ? total : 0}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={(_, page: number): void => {
                setQueryPagination({
                    pageP: page
                });
            }}
            onRowsPerPageChange={(
                event: React.ChangeEvent<HTMLInputElement>
            ): void => {
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
