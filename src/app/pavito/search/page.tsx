"use client";
import { useGlobalContext } from "@/app/context";
import { useLayoutEffect } from "react";
import {
    Box,
    Typography,
    Select,
    MenuItem,
    TextField,
    Paper,
    Button
} from "@mui/material";

import { BidCard } from "../components/BidCard";
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
        bids
    } = usePavitoDataSearchContext();

    useLayoutEffect(() => {
        setSectionTitle("logo");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Box component={"section"} className="mt-5">
            <Box className="flex justify-between mb-6">
                <Typography
                    className="font-bold mr-6"
                    variant="h4"
                    component="h1"
                    sx={{
                        color: (theme): string => {
                            return theme.palette.mode === "dark"
                                ? "default"
                                : "primary";
                        }
                    }}
                >
                    Empresas
                </Typography>
            </Box>
            <Box
                component={"div"}
                className="flex flex-col lg:flex-row"
                sx={{
                    gap: "25px"
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
                    <Paper elevation={3} className="p-1">
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
                    <Box className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
                        {bids.map((bid, index) => {
                            return (
                                <BidCard
                                    key={"bid-" + index}
                                    bid={bid}
                                    sx={{
                                        height: "auto",
                                        my: "20px"
                                    }}
                                />
                            );
                        })}
                    </Box>
                </Box>
                <Box component="section" className="w-full">
                    <Box component={"div"}>
                        {bids.length > 0 && (
                            <CompanyDetails
                                ruc={bids[0].ruc}
                                mype={bids[0].mype}
                            />
                        )}
                    </Box>
                    <Box
                        className="mt-6"
                        component={"div"}
                        sx={{ border: "1px solid skyblue" }}
                    >
                        detalle licitacion gaaa
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
