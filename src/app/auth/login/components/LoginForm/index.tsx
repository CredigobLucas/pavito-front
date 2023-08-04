"use client";
import { TextField, Typography, Button, Link, Box } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/app/actions";
import { TError } from "@/domain/errors/ErrorFactory";
import { login } from "@/services/pavito_back/auth/login";
import { userMe } from "@/services/pavito_back/user/get";
import { useGlobalContext } from "@/app/context";
import Password from "@/app/components/Password/password";

export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { openAlertMessage, setUser, setOpenLoading } = useGlobalContext();

    const submitForm = async () => {
        try {
            setOpenLoading(true);
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
                if (error.type === "NewPasswordRequired") {
                    router.push("/auth/new-password");
                }
            }
        } finally {
            setOpenLoading(false);
        }
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
                <>
                    <Password 
                        placeholder="Contraseña"
                        modifyPassword={(e) => {
                                setPassword(e.target.value);
                            }
                        }
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
                </>
            </Box>
        </div>
    );
}
