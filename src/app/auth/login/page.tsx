"use client";

import { Paper, Box } from "@mui/material";
import { LoginForm } from "./components";

export default function Login() {
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
