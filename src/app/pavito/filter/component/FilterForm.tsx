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
    Autocomplete,
    AutocompleteRenderInputParams
} from "@mui/material";
import { useState, useLayoutEffect } from "react";
import { AccordionForm } from "@/app/components";
import { useGlobalContext } from "@/app/context";
import { usePavitoDataContext } from "@/app/pavito/context/PavitoDataContext";
import { CLEAN_NULL_VALUES, IObject, CALC_DAYS_AGO } from "@/app/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export const FilterForm = (): JSX.Element => {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();

    const { theme, avaibleRegions } = useGlobalContext();
    const { sectors, setQueryFilter } = usePavitoDataContext();
    const [amountFrom, setAmountFrom] = useState<number | null>(null);
    const [amountTo, setAmountTo] = useState<number | null>(null);
    const [govLevel, setGovLevel] = useState<string>("GL");
    const [sector, setSector] = useState<string | null>(null);
    const [region, setRegion] = useState<string>(avaibleRegions[0]);
    const [objLicitation, setObjLicitation] = useState<string>("Bien");
    const [daysAgo, setDaysAgo] = useState<string>("30");
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const [regions, setRegions] = useState<string[]>([]);

    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const adaptFilter = (): IObject => {
        const obj: IObject = CLEAN_NULL_VALUES({
            amountFrom,
            amountTo,
            govLevel,
            sector: sector === "TODOS" ? null : sector,
            region,
            objLicitation,
            daysAgo: daysAgo === "-1" ? null : daysAgo,
            dateFrom,
            dateTo
        });
        const keysToAdapt: IObject = {
            amountFrom: "bid_min_amount",
            amountTo: "bid_max_amount",
            govLevel: "gov_level",
            sector: "sector",
            region: "department",
            objLicitation: "bid_obj",
            daysAgo: "days_ago",
            dateFrom: "initial_date",
            dateTo: "final_date"
        };

        const adaptedObj: IObject = {};
        Object.keys(obj).forEach((key: string) => {
            if (obj[key]) {
                adaptedObj[keysToAdapt[key]] = obj[key];
            }
        });
        return adaptedObj;
    };

    const convertFilterToQuery = (): string => {
        const adaptedObj: IObject = adaptFilter();
        if (adaptedObj["days_ago"]) {
            const [start, end] = CALC_DAYS_AGO(adaptedObj["days_ago"]);
            adaptedObj["initial_date"] = start;
            adaptedObj["final_date"] = end;
        }
        const params = new URLSearchParams();
        Object.keys(adaptedObj).forEach((key: string) => {
            params.set(key, adaptedObj[key]);
        });
        return params.toString();
    };

    const updateUrlParams = (): void => {
        const params = convertFilterToQuery();
        router.push(pathname + "?" + params);
    };

    const toDefault = (): void => {
        setAmountFrom(null);
        setAmountTo(null);
        setGovLevel("GL");
        setSector(null);
        setRegion(regions[0]);
        setObjLicitation("Bien");
        setDaysAgo("30");
        setDateFrom("");
        setDateTo("");
    };

    useLayoutEffect(() => {
        if (avaibleRegions.length > 0) {
            setRegions(avaibleRegions);
            setRegion(avaibleRegions[0]);
            setFirstLoad(false);
        }
    }, [avaibleRegions]);
    useLayoutEffect(() => {
        if (avaibleRegions.length > 0) {
            const queryParams: string = params.toString();
            if (queryParams) {
                const queryObj: IObject = Object.fromEntries(
                    new URLSearchParams(queryParams)
                );
                Object.keys(queryObj).forEach((key: string) => {
                    switch (key) {
                        case "bid_min_amount":
                            setAmountFrom(parseInt(queryObj[key]));
                            break;
                        case "bid_max_amount":
                            setAmountTo(parseInt(queryObj[key]));
                            break;
                        case "gov_level":
                            setGovLevel(queryObj[key]);
                            break;
                        case "sector":
                            setSector(queryObj[key]);
                            break;
                        case "department":
                            setRegion(queryObj[key]);
                            break;
                        case "bid_obj":
                            setObjLicitation(queryObj[key]);
                            break;
                        case "days_ago":
                            setDaysAgo(queryObj[key]);
                            break;
                        case "initial_date":
                            setDateFrom(queryObj[key]);
                            break;
                        case "final_date":
                            setDateTo(queryObj[key]);
                            break;
                    }
                });
                if (!queryObj["days_ago"]) {
                    setDaysAgo("-1");
                } else {
                    setDateFrom("");
                    setDateTo("");
                }
            }
            setQueryFilter(queryParams);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, firstLoad]);

    return (
        <Paper
            component={"form"}
            elevation={3}
            onSubmit={(e): void => {
                e.preventDefault();
                updateUrlParams();
            }}
        >
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
                    onClick={toDefault}
                >
                    Limpiar filtros
                </Typography>
            </Box>
            <Divider />
            <Box>
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
                                    onChange={(e): void =>
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
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void =>
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
                            onChange={(
                                _e: React.ChangeEvent<HTMLInputElement>,
                                value: string
                            ): void => {
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
                            value={sector || ""}
                            onChange={(
                                _e: React.SyntheticEvent<Element, Event>,
                                value: string | null
                            ): void => {
                                setSector(value);
                            }}
                            getOptionLabel={(option: string): string => {
                                const a = option.toLowerCase();
                                return a.charAt(0).toUpperCase() + a.slice(1);
                            }}
                            renderInput={(
                                params: AutocompleteRenderInputParams
                            ): React.ReactNode => (
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
                            onChange={(_e, value): void => {
                                setRegion(value || "");
                            }}
                            options={avaibleRegions}
                            value={region || ""}
                            size="small"
                            renderInput={(params): React.ReactNode => (
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
                            onChange={(
                                _e: React.ChangeEvent<HTMLInputElement>,
                                value: string
                            ): void => {
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
                            onChange={(
                                _e: React.ChangeEvent<HTMLInputElement>,
                                value: string
                            ): void => {
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
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => setDateFrom(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    label="Inicio"
                                    sx={{
                                        "& input::-webkit-calendar-picker-indicator":
                                            {
                                                filter: `invert(${
                                                    theme.palette.mode ===
                                                    "dark"
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
                                                    theme.palette.mode ===
                                                    "dark"
                                                        ? "1"
                                                        : "0"
                                                })`
                                            }
                                    }}
                                    value={dateTo}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => setDateTo(e.target.value)}
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
                        type="button"
                    >
                        Predeterminado
                    </Button>
                    <Button
                        variant="contained"
                        className="capitalize font-semibold py-2"
                        type="submit"
                    >
                        Buscar
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};
