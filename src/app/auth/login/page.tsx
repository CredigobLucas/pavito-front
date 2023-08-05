"use client";

import { Paper, Box } from "@mui/material";
import { LoginForm } from "./components";


export default function Login(): JSX.Element {
    return (
        <Box
            sx={{
                width: "70%",
                minWidth: "320px",
                maxWidth: "500px"
            }}
        >
            <Paper elevation={3}>
                <LoginForm />
            </Paper>
        </Box>
    );
}
