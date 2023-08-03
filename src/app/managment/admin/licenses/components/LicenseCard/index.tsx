"use client";
import { Box, Paper, Grid, Button } from "@mui/material";
import { TRANSFORM_STRING_DATE_TO_FORMAT } from "@/app/utils";
import { License } from "@/domain/models/License";
import { LicenseCardTitle } from "./components";
import { ItemIconCard } from "@/app/components";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import { useGlobalContext } from "@/app/context";
import { Region } from "@/domain/models/Region";
import { useEffect, useState } from "react";

interface LicenseProps {
    license: License;
}

export const LicenseCard = ({ license }: LicenseProps) => {
    const { getAvaibleRegions } = useGlobalContext();
    const [regions, setRegions] = useState<Region[]>([]);
    useEffect(() => {
        setRegions(getAvaibleRegions());
    }, [getAvaibleRegions]);
    return (
        <Box component="div" className="p-4" sx={{ width: "100%" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <LicenseCardTitle
                        sx={{
                            mb: "5px"
                        }}
                        title="Contrato"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ItemIconCard
                                color="rgb(80, 135, 170)"
                                backgroundIcon="rgb(235, 244, 253)"
                                title="Fecha Inicio"
                                content={TRANSFORM_STRING_DATE_TO_FORMAT(
                                    license.start_date,
                                    "DD/MM/YYYY"
                                )}
                                icon={<CalendarTodayIcon />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ItemIconCard
                                color="rgb(80, 135, 170)"
                                backgroundIcon="rgb(235, 244, 253)"
                                title="Fecha Fin"
                                content={TRANSFORM_STRING_DATE_TO_FORMAT(
                                    license.end_date,
                                    "DD/MM/YYYY"
                                )}
                                icon={<CalendarTodayIcon />}
                            />
                        </Grid>
                    </Grid>
                    <LicenseCardTitle
                        sx={{
                            mt: "35px",
                            mb: "5px"
                        }}
                        title="Usuarios"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ItemIconCard
                                color="rgb(5, 150, 105)"
                                backgroundIcon="rgb(209, 250, 229)"
                                title="Admins"
                                content={`${license.assigned_admin_quantity} de ${license.license_admin_quantity}`}
                                icon={<GroupIcon />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <ItemIconCard
                                color="rgb(5, 150, 105)"
                                backgroundIcon="rgb(209, 250, 229)"
                                title="Users"
                                content={`${license.assigned_user_quantity} de ${license.license_user_quantity}`}
                                icon={<GroupIcon />}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper className="p-4" sx={{ height: "305px" }}>
                        <LicenseCardTitle title="Regiones Disponibles" />
                        <Grid
                            container
                            spacing={2}
                            component="div"
                            sx={{ height: "210px" }}
                            className="overflow-y-auto mt-2"
                        >
                            {regions.map((region, index) => (
                                <Grid
                                    key={index}
                                    item
                                    xs={12}
                                    md={6}
                                    component="div"
                                >
                                    <Box
                                        component={"div"}
                                        sx={{
                                            width: "100%",
                                            textTransform: "none"
                                        }}
                                    >
                                        - {region.value}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
