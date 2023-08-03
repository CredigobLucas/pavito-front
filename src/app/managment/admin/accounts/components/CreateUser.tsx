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
    FormControlLabel,
    Select,
    TextField,
    MenuItem,
    Button
} from "@mui/material";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "350px"
};

interface CreateUserProps {
    open: boolean;
    close: (reload: boolean) => void;
}

export const CreateUser = ({ open, close }: CreateUserProps) => {
    const { openAlertMessage, setOpenLoading } = useGlobalContext();
    const router = useRouter();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [documentType, setDocumentType] = useState("DNI");
    const [document, setDocument] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const create = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await createUser({
                last_name: lastName,
                name: firstName,
                email,
                phone_number: phone,
                document_type: documentType,
                document_number: document,
                password
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
                    router.push("/login");
                }
            }
        }
    };
    return (
        <Modal
            disableEscapeKeyDown
            open={open}
            onClose={(event, reason) => {
                if (reason === "backdropClick") {
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
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                        />
                        <LabeledInput
                            label="Apellido*"
                            placeholder="Ingrese el apellido"
                            required
                            width="calc(50% - 5px)"
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                        />
                        <LabeledInput
                            label="Correo*"
                            placeholder="Ingrese el correo"
                            required
                            width="calc(50% - 5px)"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            type="email"
                        />
                        <LabeledInput
                            label="Celular*"
                            placeholder="Ingrese el celular"
                            required
                            width="calc(50% - 5px)"
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={
                                <div className="flex w-full mt-2">
                                    <Select
                                        size="small"
                                        sx={{
                                            width: "30%",
                                            borderTopRightRadius: "0",
                                            borderBottomRightRadius: "0"
                                        }}
                                        required
                                        value={documentType}
                                        onChange={(e) => {
                                            setDocumentType(
                                                e.target.value as string
                                            );
                                        }}
                                    >
                                        <MenuItem value="DNI">DNI</MenuItem>
                                        <MenuItem value="RESIDENT_ID">
                                            CE
                                        </MenuItem>
                                        <MenuItem value="PASSPORT">
                                            PASAPORTE
                                        </MenuItem>
                                    </Select>
                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        placeholder="Ingrese el documento"
                                        required
                                        sx={{
                                            width: "70%",
                                            "& .MuiOutlinedInput-root": {
                                                borderTopLeftRadius: "0",
                                                borderBottomLeftRadius: "0",
                                                borderLeft: "0"
                                            }
                                        }}
                                        onChange={(e) => {
                                            setDocument(e.target.value);
                                        }}
                                    />
                                </div>
                            }
                            label={"Documento*"}
                            labelPlacement="top"
                            sx={{
                                ".MuiFormControlLabel-label": {
                                    textAlign: "left",
                                    width: "100%"
                                },
                                ".MuiFormControlLabel-asterisk": {
                                    display: "none"
                                },
                                margin: "0 !important",
                                width: "100%"
                            }}
                        />
                        <LabeledInput
                            label="Contraseña*"
                            placeholder="Ingrese la contraseña"
                            required
                            width="100%"
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <LabeledInput
                            label="Repetir Contraseña*"
                            placeholder="Repita la contraseña"
                            type="password"
                            required
                            width="100%"
                            onChange={(e) => {
                                setRepeatPassword(e.target.value);
                            }}
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
                                onClick={() => {
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
                                disabled={password !== repeatPassword}
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
