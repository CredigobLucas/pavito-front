"use client";
import { useGlobalContext } from "@/app/context";
import { useLayoutEffect, useState } from "react";
import {
    Box,
    Select,
    MenuItem,
    TextField,
    Paper,
    Tabs,
    Tab,
    Divider
} from "@mui/material";


import { AccordionForm } from "@/app/components";

import { usePavitoDataSearchContext } from "./context";
import { useRouter, useSearchParams } from "next/navigation";
import { DataGrid } from "../filter/component/DataGrid";
import {
    DataTable,
    DisplayMode,
    FilterHeader,
    ToggleViewFilter
} from "../filter/component";
import { Buttons } from "../filter/component/Buttons";
import { FILTROS_CONTRATOS, SAVE_FILTERS_AS_PRESET } from "@/app/utils/storage";
import { SearchPagination } from "./component/SearchPagination";

export default function PavitoSearch(): JSX.Element {
    const { setSectionTitle, theme, openAlertMessage } = useGlobalContext();
    const router = useRouter();
    const {
        companyLabel,
        companyData,
        setCompanyData,
        setCompanyLabel,
        updateUrlParams,
        bids,
        setTotal,
    } = usePavitoDataSearchContext();
    const params = useSearchParams();

    const [displayData, setDisplayData] = useState<DisplayMode>(
        DisplayMode.TableView
    );

    useLayoutEffect((): void => {
        setSectionTitle("logo");
        const queryParams: string = params.toString();
        if (!queryParams) {
            const contractFilters: string | null =
                localStorage.getItem(FILTROS_CONTRATOS);
            if (contractFilters) {
                const { companyLabel, companyData } =
                    JSON.parse(contractFilters);
                setCompanyLabel(companyLabel);
                setCompanyData(companyData);
                router.push(
                    `/pavito/search?company_label=${companyLabel}&company_data=${companyData}`
                );
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box component={"section"} className="mt-5">
            <Box
                component={"div"}
                className="flex flex-col lg:flex-row"
                sx={{
                    columnGap: "50px"
                }}
            >
                <Box
                    sx={{
                        width: {
                            xs: "100%",
                            lg: "500px"
                        }
                    }}
                >
                    <Paper
                        elevation={3}
                        className="p-1 mb-3"
                        component={"form"}
                        onSubmit={(e): void => {
                            e.preventDefault();
                            updateUrlParams();
                        }}
                    >
                        <Tabs
                            value={1}
                            variant="fullWidth"
                            onChange={(_, value): void => {
                                if (value === 0) {
                                    router.push("/pavito/filter");
                                }
                            }}
                        >
                            <Tab label="Prospectos" className="capitalize" />
                            <Tab label="Empresas" className="capitalize" />
                        </Tabs>
                        <Box>
                            <AccordionForm
                                theme={theme.palette.mode}
                                label="Buscar por"
                                defaultExpanded={true}
                            >
                                <Select
                                    id="demo-simple-select"
                                    value={companyLabel || ""}
                                    onChange={(e): void => {
                                        setCompanyData("");
                                        setCompanyLabel(e.target.value);
                                    }}
                                    size="small"
                                    fullWidth
                                    className="mb-2"
                                    required
                                >
                                    <MenuItem value={"razon_social"}>
                                        Razón Social
                                    </MenuItem>
                                    <MenuItem value={"ruc"}>RUC</MenuItem>
                                </Select>
                                <TextField
                                    fullWidth
                                    size="small"
                                    value={companyData || ""}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => {
                                        setCompanyData(e.target.value);
                                    }}
                                    required
                                    type={
                                        companyLabel === "ruc"
                                            ? "number"
                                            : "text"
                                    }
                                />
                            </AccordionForm>
                        </Box>
                        <Divider />
                        <Buttons
                            saveFiltersAsPreset={(): void => {
                                SAVE_FILTERS_AS_PRESET(
                                    FILTROS_CONTRATOS,
                                    {
                                        companyLabel,
                                        companyData
                                    },
                                    openAlertMessage
                                );
                            }}
                            setTotal={setTotal}
                        />
                    </Paper>
                </Box>
                <Box className="w-full">
                    <Box
                        component={"div"}
                        className="w-full flex items-end justify-center mt-6 flex-col"
                    >
                        <FilterHeader title={"Contratos"} />
                        <ToggleViewFilter
                            displayData={displayData}
                            changeDisplayMode={setDisplayData}
                        />
                    </Box>
                    <Box className="mt-6">
                        {displayData === DisplayMode.GridView && (
                            <DataGrid
                                bids={bids}
                            />
                        )}
                        {displayData === DisplayMode.TableView && (
                            <DataTable
                                bids={bids}
                            />
                        )}
                    </Box>
                    <SearchPagination />
                </Box>
            </Box>
        </Box>
    );
}
