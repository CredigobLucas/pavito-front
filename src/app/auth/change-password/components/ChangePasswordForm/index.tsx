"use client";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { TError } from "@/domain/errors/ErrorFactory";
import { useGlobalContext } from "@/app/context";
import { changePassword } from "@/services/pavito_back/auth/change-password";
import { InputPasswordReveal } from "@/app/components/Password";
import { login } from "@/services/pavito_back/auth/login";
import { setCookie } from "@/app/actions";
import { userMe } from "@/services/pavito_back/user/get";
import { useRouter } from "next/navigation";


export function ChangePasswordForm(): JSX.Element {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { openAlertMessage, setUser, setOpenLoading } = useGlobalContext();

    const submitForm = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            await changePassword(email, {
                password,
                new_password: newPassword,
            });
            openAlertMessage({
                horizontal: "center",
                vertical: "top",
                severity: "success",
                message: "Contraseña cambiada con éxito"
            });
            const response = await login({
                email,
                password
            });
            await setCookie({
                name: "token",
                value: `${response.body.authentication_result.id_token} ${response.body.authentication_result.access_token}`,
                expiration: response.body.authentication_result.expires_in
            });
            const user = await userMe();
            setUser(user.body);
            router.push("/dashboard");
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
                <InputPasswordReveal 
                    placeholder="Contraseña"
                    modifyPassword={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            setPassword(e.target.value);
                        }
                    }
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
                    Cambiar contraseña
                </Button>
            </Box>
        </div>
    );
}
