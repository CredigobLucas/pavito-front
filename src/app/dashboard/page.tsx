"use client";

import { useGlobalContext } from "../context";
import { useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
export default function Dashboard() {
    const { setSectionTitle, user } = useGlobalContext();
    useEffect(() => {
        setSectionTitle("Panel");
    }, []);
    return (
        <Box className="mt-10">
            <Paper elevation={3}>
                <div className="p-6">
                    <Typography
                        variant="h5"
                        component="div"
                        className="font-bold"
                        color="primary"
                    >
                        ¡Bienvenido/a otra vez {user?.name}!
                    </Typography>
                    <Typography variant="body1" component="p">
                        Por favor, selecciona con que modulo vamos a empezar a
                        trabajar.
                    </Typography>
                </div>
            </Paper>
        </Box>
    );
}
