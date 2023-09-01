"use client";
import {
    Typography,
    Paper,
    Box,
    Divider,
    TextField,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    Autocomplete,
    AutocompleteRenderInputParams,
    Tabs,
    Tab
} from "@mui/material";
import { useLayoutEffect } from "react";
import { AccordionForm } from "@/app/components";
import { useGlobalContext } from "@/app/context";
import { usePavitoDataFilterContext } from "@/app/pavito/filter/context";
import { IObject, PARSE_OBJECT_TO_PAVITO_DATA_FILTERS } from "@/app/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Buttons } from "./Buttons";
import { FILTROS_PROSPECTOS, SAVE_FILTERS_AS_PRESET } from "@/app/utils/storage";
import { DEFAULT_PAVITO_DATA_FILTERS } from "@/app/utils/filters";

export const FilterForm = (): JSX.Element => {
    const params = useSearchParams();
    const { theme, availableRegions, openAlertMessage } = useGlobalContext();
    const router = useRouter();

    const { sectors, setQueryFilter, filters, setFilters } =
        usePavitoDataFilterContext();

    const toDefault = (): void => {
        openAlertMessage({
            horizontal: "center",
            vertical: "top",
            severity: "success",
            message: "Filtros limpiados correctamente"
        })
        setFilters(DEFAULT_PAVITO_DATA_FILTERS);
    };
    
    useLayoutEffect((): void => {
        if (availableRegions.length > 0) {
            const queryParams: string = params.toString();
            if (queryParams) {
                const queryObj: IObject = Object.fromEntries(
                    new URLSearchParams(queryParams)
                );
                const copyFilters = PARSE_OBJECT_TO_PAVITO_DATA_FILTERS(queryObj);
                if (!queryObj["days_ago"]) {
                    copyFilters["daysAgo"] = "-1";
                } else {
                    copyFilters["dateFrom"] = "";
                    copyFilters["dateTo"] = "";
                }
                if (!queryObj["department"]) {
                    copyFilters["region"] = availableRegions[0];
                }
                if (!queryObj["sector"]) {
                    copyFilters["sector"] = "TODOS";
                }
                setFilters(copyFilters);
            }
            else {
                const prospectFilters: string | null = localStorage.getItem(FILTROS_PROSPECTOS);            
                if (prospectFilters) {
                    const copyFilters = PARSE_OBJECT_TO_PAVITO_DATA_FILTERS(JSON.parse(prospectFilters));
                    setFilters(copyFilters);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, availableRegions]);

    return (
        <Paper
            component={"form"}
            elevation={3}
            onSubmit={(e): void => {
                e.preventDefault();
                setQueryFilter();
            }}
        >
            <Tabs
                value={0}
                variant="fullWidth"
                onChange={(_, value): void => {
                    if (value === 1) {
                        router.push("/pavito/search");
                    }
                }}
            >
                <Tab label="Prospectos" className="capitalize" />
                <Tab label="Empresas" className="capitalize" />
            </Tabs>
            <Box className="w-full flex items-center justify-between p-4">
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
                                    value={filters.amountFrom || ""}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                        setFilters({
                                            ...filters,
                                            amountFrom: parseInt(e.target.value)
                                        })
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
                                    value={filters.amountTo}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => {
                                        setFilters({
                                            ...filters,
                                            amountTo: parseInt(e.target.value)
                                        });
                                    }}
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
                            value={filters.govLevel}
                            onClick={(e: React.MouseEvent<HTMLInputElement>): void => {
                                const value: string | undefined = (e.target as HTMLInputElement).value;
                                if (value !== undefined && value !== filters.govLevel) {
                                    setFilters({
                                        ...filters,
                                        govLevel: value
                                    });
                                }
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
                            value={filters.sector}
                            onChange={(_e: React.SyntheticEvent<Element, Event>, 
                                value: string | null): void => {
                                setFilters({
                                    ...filters,
                                    sector: value || "TODOS"
                                });
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
                            onChange={(_e: React.SyntheticEvent<Element, Event>, 
                                value: string | null): void => {
                                setFilters({
                                    ...filters,
                                    region: value || "Todos"
                                });
                            }}
                            options={availableRegions}
                            value={filters.region}
                            size="small"
                            renderInput={(
                                params: AutocompleteRenderInputParams
                            ): React.ReactNode => (
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
                            value={filters.objLicitation}
                            onClick={(e: React.MouseEvent<HTMLInputElement>): void => {
                                const value: string | undefined = (e.target as HTMLInputElement).value;
                                if (value !== undefined && value !== filters.objLicitation) {
                                    setFilters({
                                        ...filters,
                                        objLicitation: value
                                    });
                                }
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
                            value={filters.daysAgo}
                            onClick={(
                                e: React.MouseEvent<HTMLInputElement>,
                            ): void => {
                                const value: string | undefined = (e.target as HTMLInputElement).value;
                                if (value !== undefined && value !== filters.daysAgo) {
                                    setFilters({
                                        ...filters,
                                        daysAgo: value,
                                        dateFrom: "",
                                        dateTo: ""
                                    });
                                }
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
                        {filters.daysAgo === "-1" && (
                            <Box className="mt-2 flex">
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    type="date"
                                    className="w-1/2 mr-3"
                                    value={filters.dateFrom}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => {
                                        setFilters({
                                            ...filters,
                                            dateFrom: e.target.value
                                        });
                                    }}
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
                                    value={filters.dateTo}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ): void => {
                                        setFilters({
                                            ...filters,
                                            dateTo: e.target.value
                                        });
                                    }}
                                />
                            </Box>
                        )}
                    </AccordionForm>
                </Box>
                <Divider />
                <Buttons saveFiltersAsPreset={(): void => {
                    SAVE_FILTERS_AS_PRESET(FILTROS_PROSPECTOS, filters, openAlertMessage)
                }}/>
            </Box>
        </Paper>
    );
};
