"use client";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { TError } from "@/domain/errors/ErrorFactory";
import { useGlobalContext } from "@/app/context";
import { confirmForgotPassword } from "@/services/pavito_back/auth/confirm-forgot-password";
import { InputPasswordReveal } from "@/app/components/Password";


export function ConfirmForgotPasswordForm(): JSX.Element {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { openAlertMessage, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            await confirmForgotPassword(
                email, {
                    verification_code: verificationCode,
                    new_password: newPassword
                }
            );
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Contraseña cambiada con éxito"
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
                <TextField
                    label="Código de verificación"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="verificationCode"
                    type="text"
                    required={true}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setVerificationCode(e.target.value);
                    }}
                />
                <InputPasswordReveal
                    placeholder="Nueva contraseña"
                    modifyPassword={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setNewPassword(e.target.value);
                        }
                    }
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
