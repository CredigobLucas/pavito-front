"use client";
import { TextField, Typography, Button, Link, Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/app/actions";

import { login } from "@/services/pavito_back/auth/login";
export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = async () => {
        //TODO: send data to server
        const response = await login({
            email,
            password
        });
        // response
        console.log(response);
        await setCookie({
            name: "token",
            value: "123456789"
        });
        router.push("/dashboard");
    };

    return (
        <div>
            <Box
                component="form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                }}
                sx={{
                    padding: "20px"
                }}
            >
                <TextField
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="email"
                    type="email"
                    required={true}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="password"
                    type="password"
                    required={true}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    className="my-3"
                >
                    Iniciar sesión
                </Button>
                <Typography variant="body2" align="right">
                    Te haz olvidado de tu contraseña?{" "}
                    <Link
                        underline="hover"
                        component={"button"}
                        onClick={() => {
                            router.push("/auth/forgot-password");
                        }}
                    >
                        Recuperarala
                    </Link>
                </Typography>
            </Box>
        </div>
    );
}
