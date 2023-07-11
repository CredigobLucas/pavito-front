"use client";
import { TextField, Typography, Button, Link } from "@mui/material";
export function LoginForm() {
    return (
        <div>
            <form>
                <TextField
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    margin="normal"
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
                        onClick={() => {
                            console.log("forgot password");
                        }}
                    >
                        Recuperarala
                    </Link>
                </Typography>
            </form>
        </div>
    );
}
