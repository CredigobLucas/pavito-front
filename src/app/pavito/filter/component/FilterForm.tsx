"use client";
import { Typography, Paper, Box, Divider, Button } from "@mui/material";
import { AccordionForm } from "@/app/components";
import { useGlobalContext } from "@/app/context";

export const FilterForm = () => {
    const { theme } = useGlobalContext();
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
                >
                    Limpiar filtros
                </Typography>
            </Box>
            <Divider />
            <Box>
                <AccordionForm theme={theme.palette.mode} label="Monto S/.">
                    <div>ga</div>
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm
                    theme={theme.palette.mode}
                    label="Nivel de gobierno"
                >
                    <div>ga</div>
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm theme={theme.palette.mode} label="Sector">
                    <div>ga</div>
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm theme={theme.palette.mode} label="Region">
                    <div>ga</div>
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm
                    theme={theme.palette.mode}
                    label="Objeto de Licitación"
                >
                    <div>ga</div>
                </AccordionForm>
            </Box>
            <Divider />
            <Box>
                <AccordionForm theme={theme.palette.mode} label="Fechas">
                    <div>ga</div>
                </AccordionForm>
            </Box>
            <Divider />
            <Box className="p-4 w-full flex items-center justify-around">
                <Button
                    variant="outlined"
                    className="capitalize font-semibold py-2"
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
