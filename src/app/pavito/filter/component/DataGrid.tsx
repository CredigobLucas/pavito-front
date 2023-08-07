"use client";
import { Bid } from "@/domain/models";
import { Grid, Paper, Box, Typography } from "@mui/material";
import { IObject } from "@/app/utils";
interface DataGridProps {
    bids: Bid[];
}

export const DataGrid = ({ bids }: DataGridProps): JSX.Element => {
    const gobierno: IObject = {
        GR: "Regional",
        GL: "Local",
        GN: "Nacional"
    };
    return (
        <Grid container>
            {bids.map((bid, index) => (
                <Grid className="p-3" item key={index} xs={12} md={6}>
                    <Paper elevation={3}>
                        <Box
                            className="px-4 py-3"
                            sx={{
                                backgroundColor: (theme): string => {
                                    if (theme.palette.mode === "dark") {
                                        return "rgba(255, 255, 255, 0.16)";
                                    }
                                    return "#e9e7f5";
                                },
                                borderTopLeftRadius: "15px",
                                borderTopRightRadius: "15px"
                            }}
                        >
                            <Typography>Razón Social</Typography>
                            <Typography>{bid.razonSocial}</Typography>
                            <Typography>Valor de Licitación</Typography>
                            <Typography>S/. {bid.montoAdjudicado}</Typography>
                        </Box>
                        <Box className="px-4 py-3">
                            <Typography className="mb-2">
                                Mype: {bid.mype ? "Sí" : "No"}
                            </Typography>
                            <Typography className="mb-2">
                                Entidad Publica: {bid.entidadContratante}
                            </Typography>
                            <Typography className="mb-2">
                                Región: {bid.provincia}, {bid.departamento}
                            </Typography>
                            <Typography className="mb-5">
                                Nivel de gobierno: {gobierno[bid.nivelGobierno]}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};
