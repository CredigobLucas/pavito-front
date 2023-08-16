"use client";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { TError } from "@/domain/errors/ErrorFactory";
import { useGlobalContext } from "@/app/context";
import { forgotPassword } from "@/services/pavito_back/auth/forgot-password";


export function ForgotPasswordForm(): JSX.Element {
    const [email, setEmail] = useState("");

    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            await forgotPassword({
                email
            });
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Correo enviado con éxito"
            });
        } catch (error) {
            if (error instanceof TError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: error.message
                });
            }
        } finally {
            setOpenLoading(false);
        }
    };

    return (
        <div>
            <Box
                component="form"
                onSubmit={(e: React.FormEvent<Element>): void => {
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setEmail(e.target.value);
                    }}
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    className="my-3"
                >
                    Recuperar contraseña
                </Button>
            </Box>
        </div>
    );
}
