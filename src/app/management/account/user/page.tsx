"use client";
import { useGlobalContext } from "@/app/context";
import { useEffect } from "react";
import { LabeledInput } from "@/app/components/LabeledInput";
import { Box, Grid } from "@mui/material";


export default function Account(): JSX.Element {
    const { setSectionTitle, user } = useGlobalContext();
    useEffect((): void => {
        setSectionTitle("Perfil");
    }, []);

    return (
        <Box className="mt-4 flex items-center justify-center w-full">
            <Grid
                container
                spacing={2}
                sx={{
                    width: "70%"
                }}
            >
                <Grid item xs={12} md={6}>
                    <LabeledInput
                        label="Nombre"
                        placeholder="Nombre"
                        initialValue={user?.name}
                        onChange={(): void => {}}
                        readonly
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <LabeledInput
                        label="Apellido"
                        placeholder="Apellido"
                        initialValue={user?.last_name}
                        onChange={(): void => {}}
                        readonly
                    />
                </Grid>
                <Grid item xs={12}>
                    <LabeledInput
                        label="Correo"
                        placeholder="Correo"
                        initialValue={user?.email}
                        onChange={(): void => {}}
                        readonly
                    />
                </Grid>
            </Grid>
        </Box>
    );
}
