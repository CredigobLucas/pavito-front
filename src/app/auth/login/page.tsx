"use client";

import { Paper } from "@mui/material";
import { LoginForm } from "./components";

export default function Login() {
    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    width: "50%",
                    minWidth: "400px",
                    padding: "20px"
                }}
            >
                <LoginForm />
            </Paper>
        </>
    );
}
