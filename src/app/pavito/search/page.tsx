"use client";
import { useGlobalContext } from "@/app/context";
import { useLayoutEffect } from "react";
import {
    Box,
    Select,
    MenuItem,
    TextField,
    Paper,
    Button,
    Grid,
    Typography,
    Tabs,
    Tab
} from "@mui/material";

import { BidCard } from "../components/BidCard";
import { BidDetail } from "../bid/components";

import { CompanyDetails } from "../bid/components";

import { AccordionForm } from "@/app/components";

import { usePavitoDataSearchContext } from "./context";

export default function PavitoFilter(): JSX.Element {
    const { setSectionTitle, theme } = useGlobalContext();

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

    useLayoutEffect(() => {
        setSectionTitle("logo");
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
                    <Paper elevation={3} className="p-1 mb-3">
                        <Tabs value={1} variant="fullWidth">
                            <Tab label="Prospectos" className="capitalize" />
                            <Tab label="Empresas" className="capitalize" />
                        </Tabs>
                        <AccordionForm
                            theme={theme.palette.mode}
                            label="Buscar por"
                        >
                            <Box
                                component={"form"}
                                onSubmit={(e): void => {
                                    e.preventDefault();
                                    updateUrlParams();
                                }}
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
                                    onChange={(e): void => {
                                        setCompanyData(e.target.value);
                                    }}
                                    required
                                    type={
                                        companyLabel === "ruc"
                                            ? "number"
                                            : "text"
                                    }
                                />
                                <Box className="w-full flex items-center mt-4">
                                    <Button
                                        variant="contained"
                                        className="capitalize font-semibold py-2"
                                        type="submit"
                                        fullWidth
                                    >
                                        Buscar
                                    </Button>
                                </Box>
                            </Box>
                        </AccordionForm>
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
                    <Typography
                        className="font-bold mb-6"
                        variant="h4"
                        component="h1"
                        sx={{
                            color: (theme): string =>
                                theme.palette.mode === "dark"
                                    ? "default"
                                    : "primary"
                        }}
                    >
                        Contratos
                    </Typography>
                    <Grid container>
                        {bids.map((bid, index) => (
                            <Grid
                                className="p-3"
                                item
                                key={index}
                                xs={12}
                                md={6}
                            >
                                <BidCard
                                    bid={bid}
                                    onclick={(bid): void => {
                                        setSelectedBid(bid);
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
