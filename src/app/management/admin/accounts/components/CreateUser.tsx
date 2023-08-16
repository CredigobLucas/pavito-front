"use client";
import { LabeledInput } from "@/app/components/LabeledInput";
import { TError } from "@/domain/errors/ErrorFactory";
import { useState } from "react";
import { createUser } from "@/services/pavito_back/user/create";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context";
import {
    Modal,
    Typography,
    Box,
    Paper,
    Button,
} from "@mui/material";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "350px"
};

interface CreateUserProps {
    open: boolean;
    close: (reload: boolean) => void;
}

enum CloseReason {
    BackdropClick = "backdropClick",
    EscapeKeyDown = "escapeKeyDown",
}

export const CreateUser = ({ open, close }: CreateUserProps): JSX.Element => {
    const { openAlertMessage } = useGlobalContext();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const create = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await createUser({
                last_name: lastName,
                name: firstName,
                email
            });
            if (response.status === 201) {
                openAlertMessage({
                    message: "Usuario creado correctamente",
                    severity: "success",
                    horizontal: "center",
                    vertical: "top"
                });
                close(true);
            } else {
                openAlertMessage({
                    message: "Error al crear el usuario",
                    severity: "error",
                    horizontal: "center",
                    vertical: "top"
                });
            }
        } catch (e) {
            if (e instanceof TError) {
                openAlertMessage({
                    message: e.message,
                    severity: "error",
                    horizontal: "center",
                    vertical: "top"
                });
                if (e.type === "Unauthorized") {
                    router.push("/auth/login");
                }
            }
        }
    };
    return (
        <Modal
            disableEscapeKeyDown
            open={open}
            onClose={(_event, reason: CloseReason): void => {
                if (reason === CloseReason.BackdropClick) {
                    return;
                }
                close(false);
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box component="div" sx={style}>
                <Paper className="p-6">
                    <Box component="div" className="mb-4">
                        <Typography
                            component="h3"
                            className="text-3xl font-bold"
                        >
                            Añadir nuevo usuario
                        </Typography>
                        <Typography component="h6" className="text-sm">
                            Ingrese los datos del nuevo usuario
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        className="flex flex-wrap"
                        sx={{
                            rowGap: "20px",
                            columnGap: "10px"
                        }}
                        onSubmit={create}
                    >
                        <LabeledInput
                            label="Nombre*"
                            placeholder="Ingrese el nombre"
                            required
                            width="calc(50% - 5px)"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <LabeledInput
                            label="Apellido*"
                            placeholder="Ingrese el apellido"
                            required
                            width="calc(50% - 5px)"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setLastName(e.target.value);
                            }}
                        />
                        <LabeledInput
                            label="Correo*"
                            placeholder="Ingrese el correo"
                            required
                            width="100%"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                        />
                        <Box
                            component="div"
                            className="w-full flex justify-end"
                        >
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                className="capitalize font-bold mr-3"
                                type="button"
                                onClick={(): void => {
                                    close(false);
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className="capitalize font-bold"
                                type="submit"
                            >
                                Crear
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Modal>
    );
};
