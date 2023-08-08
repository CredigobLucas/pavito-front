"use client";

import { TablePagination } from "@mui/material";
import { usePavitoDataFilterContext } from "../context";
export const FilterPagination = (): JSX.Element => {
    const { page, setPage, pageSize, total } = usePavitoDataFilterContext();
    return (
        <TablePagination
            className="mt-6"
            count={total}
            page={page}
            rowsPerPage={pageSize}
            onPageChange={(_, page: number): void => {
                setPage(page);
            }}
            color="primary"
            sx={{
                border: "none",
                "& .MuiToolbar-root": {
                    padding: 0
                }
            }}
            component={"div"}
        />
    );
};
