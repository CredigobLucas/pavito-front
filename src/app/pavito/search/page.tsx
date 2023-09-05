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

import { BidDetail } from "../bid/components";

import { CompanyDetails } from "../bid/components";

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
import { Bid } from "@/domain/models";
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
        selectedBid,
        setSelectedBid
    } = usePavitoDataSearchContext();
    const params = useSearchParams();

    const [displayData, setDisplayData] = useState<DisplayMode>(
        DisplayMode.TableView
    );
    const alertAndSetSelectedBid = (bid: Bid): void => {
        openAlertMessage({
            horizontal: "center",
            vertical: "top",
            severity: "success",
            message: "El detalle de la licitación aparecerá más abajo"
        });
        setSelectedBid(bid);
    };

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
                        />
                    </Paper>
                    <Box component={"div"}>
                        {bids.length > 0 && (
                            <CompanyDetails
                                ruc={bids[0].ruc}
                                mype={bids[0].mype}
                                hasMargin={false}
                                mobileMode={true}
                            />
                        )}
                    </Box>
                    <Box className="mt-6" component={"div"}>
                        {selectedBid && (
                            <BidDetail
                                params={{
                                    item: selectedBid.id_item.toString(),
                                    licitacion:
                                        selectedBid.id_licitacion.toString(),
                                    milestone:
                                        selectedBid.id_milestone.toString(),
                                    participante:
                                        selectedBid.id_participante.toString()
                                }}
                                mobileMode={true}
                            />
                        )}
                    </Box>
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
                                onclick={alertAndSetSelectedBid}
                            />
                        )}
                        {displayData === DisplayMode.TableView && (
                            <DataTable
                                bids={bids}
                                onclick={alertAndSetSelectedBid}
                            />
                        )}
                    </Box>
                    <SearchPagination />
                </Box>
            </Box>
        </Box>
    );
}
