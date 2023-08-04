"use client";
import {
    Typography,
    Paper,
    Box,
    Divider,
    Button,
    TextField,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    Autocomplete
} from "@mui/material";
import { useState } from "react";
import { AccordionForm } from "@/app/components";
import { useGlobalContext } from "@/app/context";
import { usePavitoDataContext } from "@/app/pavito/context/PavitoDataContext";
import { Region } from "@/domain/models/Region";

export const FilterForm = () => {
    const { theme, getAvaibleRegions } = useGlobalContext();
    const { sectors } = usePavitoDataContext();
    const regions = getAvaibleRegions();

    const [amountFrom, setAmountFrom] = useState<number | null>(null);
    const [amountTo, setAmountTo] = useState<number | null>(null);
    const [govLevel, setGovLevel] = useState<string>("GL");
    const [sector, setSector] = useState<string | null>(null);
    const [region, setRegion] = useState<Region | null>(regions[0]);
    const [objLicitation, setObjLicitation] = useState<string>("Bien");
    const [daysAgo, setDaysAgo] = useState<string>("30");
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");

    return (
        <Paper elevation={3}>
            <Box className="w-full flex items-center justify-between p-4">
                <Typography
                    variant="body1"
                    className="font-semibold"
                    component="p"
                    sx={{
                        fontFamily: `'Nunito Sans', sans-serif !important`
                    }}
                >
                    Filtros
                </Typography>
                <Typography
                    variant="body2"
                    component="p"
                    className="cursor-pointer"
                    sx={{
                        fontFamily: `'Nunito Sans', sans-serif !important`
                    }}
                    color={"primary"}
                    onClick={() => {
                        //set default values
                        setAmountFrom(null);
                        setAmountTo(null);
                        setGovLevel("GL");
                        setSector(null);
                        setRegion(regions[0]);
                        setObjLicitation("Bien");
                        setDaysAgo("30");
                        setDateFrom("");
                        setDateTo("");
                    }}
                >
                    Limpiar filtros
                </Typography>
            </Box>
            <Divider />
            <Box>
                <AccordionForm theme={theme.palette.mode} label="Monto S/.">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Deste"
                                variant="outlined"
                                size="small"
                                type="number"
                                value={amountFrom}
                                onChange={(e) =>
                                    setAmountFrom(parseInt(e.target.value))
                                }
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-basic"
                                label="Hasta"
                                variant="outlined"
                                size="small"
                                type="number"
                                value={amountTo}
                                onChange={(e) =>
                                    setAmountTo(parseInt(e.target.value))
                                }
                            />
                        </Grid>
                    </Grid>
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm
                    theme={theme.palette.mode}
                    label="Nivel de gobierno"
                >
                    <RadioGroup
                        value={govLevel}
                        onChange={(_e, value) => {
                            setGovLevel(value);
                        }}
                    >
                        <FormControlLabel
                            value="GL"
                            control={<Radio />}
                            label="Local"
                        />
                        <FormControlLabel
                            value="GR"
                            control={<Radio />}
                            label="Regional"
                        />
                        <FormControlLabel
                            value="GN"
                            control={<Radio />}
                            label="Nacional"
                        />
                    </RadioGroup>
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm theme={theme.palette.mode} label="Sector">
                    <Autocomplete
                        disablePortal
                        options={sectors}
                        size="small"
                        value={sector}
                        onChange={(_e, value) => {
                            setSector(value);
                        }}
                        getOptionLabel={(option) => {
                            const a = option.toLowerCase();
                            return a.charAt(0).toUpperCase() + a.slice(1);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Sectores" />
                        )}
                    />
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm theme={theme.palette.mode} label="Region">
                    <Autocomplete
                        disablePortal
                        options={regions}
                        isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                        }
                        value={region}
                        onChange={(_e, value) => {
                            setRegion(value);
                        }}
                        getOptionLabel={(option) => option.value}
                        size="small"
                        renderInput={(params) => (
                            <TextField {...params} label="Regiones" />
                        )}
                    />
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm
                    theme={theme.palette.mode}
                    label="Objeto de Licitación"
                >
                    <RadioGroup
                        value={objLicitation}
                        onChange={(e, value) => {
                            setObjLicitation(value);
                        }}
                    >
                        <FormControlLabel
                            value="Bien"
                            control={<Radio />}
                            label="Bien"
                        />
                        <FormControlLabel
                            value="Servicio"
                            control={<Radio />}
                            label="Servicio"
                        />
                    </RadioGroup>
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm theme={theme.palette.mode} label="Fechas">
                    <RadioGroup
                        value={daysAgo}
                        onChange={(e, value) => {
                            setDaysAgo(value);
                            setDateFrom("");
                            setDateTo("");
                        }}
                    >
                        <FormControlLabel
                            value="15"
                            control={<Radio />}
                            label="hace 15 días"
                        />
                        <FormControlLabel
                            value="30"
                            control={<Radio />}
                            label="hace 30 días"
                        />
                        <FormControlLabel
                            value="60"
                            control={<Radio />}
                            label="hace 60 días"
                        />
                        <FormControlLabel
                            value="-1"
                            control={<Radio />}
                            label="Personalizado"
                        />
                    </RadioGroup>
                    {daysAgo === "-1" && (
                        <Box className="mt-2 flex">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                type="date"
                                className="w-1/2 mr-3"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                label="Inicio"
                                sx={{
                                    "& input::-webkit-calendar-picker-indicator":
                                        {
                                            filter: `invert(${
                                                theme.palette.mode === "dark"
                                                    ? "1"
                                                    : "0"
                                            })`
                                        }
                                }}
                            />
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="small"
                                type="date"
                                className="w-1/2"
                                InputLabelProps={{
                                    shrink: true
                                }}
                                label="Fin"
                                sx={{
                                    "& input::-webkit-calendar-picker-indicator":
                                        {
                                            filter: `invert(${
                                                theme.palette.mode === "dark"
                                                    ? "1"
                                                    : "0"
                                            })`
                                        }
                                }}
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </Box>
                    )}
                </AccordionForm>
            </Box>
            <Divider />
            <Box className="p-4 w-full flex items-center justify-end">
                <Button
                    variant="outlined"
                    className="capitalize font-semibold py-2 mr-4"
                >
                    Predeterminado
                </Button>
                <Button
                    variant="contained"
                    className="capitalize font-semibold py-2"
                >
                    Buscar
                </Button>
            </Box>
        </Paper>
    );
};