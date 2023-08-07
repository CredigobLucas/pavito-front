"use client";
import { Box, Paper, Grid } from "@mui/material";
import { TRANSFORM_STRING_DATE_TO_FORMAT } from "@/app/utils";
import { License } from "@/domain/models/License";
import { LicenseCardTitle } from "./components";
import { ItemIconCard } from "@/app/components";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import { useGlobalContext } from "@/app/context";

interface LicenseProps {
    license: License;
}

export const LicenseCard = ({ license }: LicenseProps): JSX.Element => {
    const { avaibleRegions } = useGlobalContext();

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
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6}>
                            <ItemIconCard
                                color="rgb(5, 150, 105)"
                                backgroundIcon="rgb(209, 250, 229)"
                                title="Admins"
                                content={`${license.assigned_admin_quantity} de ${license.license_admin_quantity}`}
                                icon={<GroupIcon />}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                    <LicenseCardTitle title="Regiones Disponibles" />
                    <Paper
                        className="px-4 py-2 mt-2 overflow-y-auto"
                        sx={{ height: "260px" }}
                    >
                        <Grid container component="div" className="mt-2">
                            {avaibleRegions.map((region, index) => (
                                <Grid
                                    key={index}
                                    item
                                    xs={12}
                                    md={6}
                                    component="div"
                                >
                                    <Box
                                        className="p-3"
                                        component={"div"}
                                        sx={{
                                            width: "100%",
                                            textTransform: "none"
                                        }}
                                    >
                                        - {region}
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
