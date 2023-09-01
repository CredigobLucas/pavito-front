"use client";
import { LabeledInput } from "@/app/components/LabeledInput";
import { TError } from "@/domain/errors/ErrorFactory";
import { useState, useLayoutEffect } from "react";
import { editUser } from "@/services/pavito_back/user/edit";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context";
import { Modal, Typography, Box, Paper, Button } from "@mui/material";
import { User } from "@/domain/models";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "350px"
};

interface EditUserProps {
    open: boolean;
    close: (reload: boolean) => void;
    selectedUser: User | null;
}

enum CloseReason {
    BackdropClick = "backdropClick",
    EscapeKeyDown = "escapeKeyDown"
}

export const EditUser = ({
    open,
    close,
    selectedUser
}: EditUserProps): JSX.Element => {
    const { openAlertMessage, user, setUser } = useGlobalContext();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    useLayoutEffect((): void => {
        if (selectedUser) {
            setFirstName(selectedUser.name);
            setLastName(selectedUser.last_name);
            setEmail(selectedUser.email);
        }
    }, [selectedUser]);

    const edit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await editUser({
                last_name: lastName,
                name: firstName,
                email: email,
                user_id: selectedUser?.id || ""
            });
            if (response.status === 200) {
                openAlertMessage({
                    message: "Usuario editado correctamente",
                    severity: "success",
                    horizontal: "center",
                    vertical: "top"
                });
                if (response.body.id === user?.id) {
                    const editUser: User = user;
                    editUser.name = response.body.name;
                    editUser.last_name = response.body.last_name;
                    editUser.email = response.body.email;
                    setUser(editUser);
                }
                close(true);
            } else {
                openAlertMessage({
                    message: "Error al editar el usuario",
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
                            Editar usuario
                        </Typography>
                        <Typography component="h6" className="text-sm">
                            Modifica los datos del usuario
                        </Typography>
                    </Box>
                    <Box
                        component="form"
                        className="flex flex-wrap"
                        sx={{
                            rowGap: "20px",
                            columnGap: "10px"
                        }}
                        onSubmit={edit}
                    >
                        <LabeledInput
                            label="Nombre*"
                            placeholder="Ingrese el nombre"
                            required
                            width="calc(50% - 5px)"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void => {
                                setFirstName(e.target.value);
                            }}
                            initialValue={firstName || ""}
                        />
                        <LabeledInput
                            label="Apellido*"
                            placeholder="Ingrese el apellido"
                            required
                            width="calc(50% - 5px)"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void => {
                                setLastName(e.target.value);
                            }}
                            initialValue={lastName || ""}
                        />
                        <LabeledInput
                            label="Correo*"
                            placeholder="Ingrese el correo"
                            required
                            width="100%"
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ): void => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                            initialValue={email || ""}
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
                                Editar
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Modal>
    );
};
