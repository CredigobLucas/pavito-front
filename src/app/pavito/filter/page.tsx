"use client";
import { useGlobalContext } from "@/app/context";
import { useEffect, useState } from "react";
import {
    FilterForm,
    DataGrid,
    DataTable,
    FilterHeader,
    ToggleViewFilter,
    DisplayMode,
    FilterPagination
} from "./component";
import { Box } from "@mui/material";

import { usePavitoDataFilterContext } from "./context";

export default function PavitoFilter(): JSX.Element {
    const { setSectionTitle } = useGlobalContext();
    const { bids } = usePavitoDataFilterContext();

    const [displayData, setDisplayData] = useState<DisplayMode>(
        DisplayMode.GridView
    );

    useEffect(() => {
        setSectionTitle("logo");
    }, []);

    return (
        <Box
            component={"div"}
            className="flex mt-5 flex-col lg:flex-row"
            sx={{
                gap: "60px"
            }}
        >
            <Box
                sx={{
                    minWidth: "300px"
                }}
            >
                <FilterForm />
            </Box>
            <Box component="section" className="w-full">
                <Box
                    component={"div"}
                    className="w-full flex items-end justify-center mt-6 flex-col"
                >
                    <FilterHeader title={"Prospectos"}/>
                    <ToggleViewFilter displayData={displayData} changeDisplayMode={setDisplayData} />
                </Box>
                <Box className="mt-6">
                    {displayData === DisplayMode.GridView && (
                        <DataGrid bids={bids} />
                    )}
                    {displayData === DisplayMode.TableView && (
                        <DataTable bids={bids} />
                    )}
                </Box>
                <FilterPagination />
            </Box>
        </Box>
    );
}
