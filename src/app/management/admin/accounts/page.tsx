"use client";
import { GeneralContainer } from "@/app/components";
import { PavitoTable } from "@/app/components/PavitoTable";
import {
    Box,
    Button,
    Typography,
    Pagination,
    Chip,
    Select,
    Switch,
    Menu,
    MenuItem,
    IconButton,
    FormControlLabel,
    SelectChangeEvent
} from "@mui/material";
import { User } from "@/domain/models";
import { MoreVert, Add } from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { getUsers } from "@/services/pavito_back/enterprise/users";
import { useGlobalContext } from "@/app/context";
import { TError } from "@/domain/errors/ErrorFactory";
import { useRouter } from "next/navigation";
import { inactiveUser } from "@/services/pavito_back/user/inactive";
import { activeUser } from "@/services/pavito_back/user/active";
import { CreateUser } from "./components/CreateUser";

export default function Admin(): JSX.Element {
    const [rows, setRows] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [onlyActive, setOnlyActive] = useState<boolean>(false);
    const [openCreateUser, setOpenCreateUser] = useState<boolean>(false);

    const {
        user: userLogged,
        openAlertMessage,
        setOpenLoading,
        setSectionTitle,
    } = useGlobalContext();

    const [anchorActions, setAnchorActions] = useState<null | HTMLElement>(
        null
    );
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const openActions = Boolean(anchorActions);

    const router = useRouter();

    const getAllUsers = async (): Promise<void> => {
        try {
            setOpenLoading(true);
            const response = await getUsers({
                items_per_page: rowsPerPage,
                page_number: page,
                active_only: onlyActive
            });
            setRows(response.body.users);
            setPage(response.body.pagination.page_number);
            setRowsPerPage(response.body.pagination.items_per_page);
            setTotalPages(response.body.pagination.total_num_pages);
        } catch (error) {
            if (error instanceof TError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: error.message
                });
                if (error.type === "Unauthorized") {
                    router.push("/auth/login");
                }
            }
        } finally {
            setOpenLoading(false);
        }
    };
    useEffect(() => {
        setSectionTitle("Usuarios");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useMemo(() => {
        if(userLogged?.id) {
            getAllUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, onlyActive, userLogged]);

    const inactive = async (id: string): Promise<void> => {
        try {
            setOpenLoading(true);
            const response = await inactiveUser(id);
            if (response.body.status_update === false) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: "No se pudo desactivar el usuario"
                });
            } else {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "success",
                    message: "Usuario desactivado con éxito"
                });
                await getAllUsers();
                setAnchorActions(null);
            }
        } catch (error) {
            if (error instanceof TError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: error.message
                });
                if (error.type === "Unauthorized") {
                    router.push("/auth/login");
                }
            }
        } finally {
            setOpenLoading(false);
        }
    };

    const active = async (id: string): Promise<void> => {
        try {
            setOpenLoading(true);
            const response = await activeUser(id);
            if (response.body.status_update === false) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: "No se pudo activar el usuario"
                });
            } else {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "success",
                    message: "Usuario desactivado con éxito"
                });
                await getAllUsers();
                setAnchorActions(null);
            }
        } catch (error) {
            if (error instanceof TError) {
                openAlertMessage({
                    horizontal: "center",
                    vertical: "top",
                    severity: "error",
                    message: error.message
                });
                if (error.type === "Unauthorized") {
                    router.push("/auth/login");
                }
            }
        } finally {
            setOpenLoading(false);
        }
    };

    return (
        <GeneralContainer
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                paddingBottom: "15px"
            }}
        >
            <Box
                component={"div"}
                className="flex flex-col-reverse justify-between md:flex-row"
                sx={{
                    marginBottom: "16px",
                    padding: "0 20px"
                }}
            >
                <Box
                    component={"div"}
                    className="flex items-center justify-end md:justify-end mt-4 md:mt-0"
                >
                    <Box component={"div"}>
                        <Typography component="div" className="font-medium">
                            Mostrar
                            <Select
                                className="mx-3 font-medium"
                                size="small"
                                value={rowsPerPage}
                                onChange={(
                                    e: SelectChangeEvent<number>
                                ): void => {
                                    setPage(1);
                                    setRowsPerPage(e.target.value as number);
                                }}
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                            usuarios
                        </Typography>
                    </Box>
                </Box>
                <Box
                    component={"div"}
                    className="flex items-center justify-end md:justify-end"
                >
                    <Button
                        className="capitalize font-bold text-sm"
                        variant="contained"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        size="small"
                        onClick={(): void => {
                            setOpenCreateUser(true);
                        }}
                    >
                        <Add
                            sx={{
                                marginRight: "2px"
                            }}
                            fontSize="small"
                        />
                        Usuario
                    </Button>
                </Box>
            </Box>
            <Box className="flex w-full items-center justify-end mb-2">
                <FormControlLabel
                    className="mr-5"
                    control={
                        <Switch
                            size="small"
                            checked={onlyActive}
                            onChange={(): void => {
                                setOnlyActive(!onlyActive);
                            }}
                        />
                    }
                    label={onlyActive ? "Todos" : "Solo activos"}
                />
            </Box>
            <PavitoTable<User>
                rows={rows}
                columns={[
                    {
                        label: "Usuario",
                        value: (user: User): React.ReactNode =>
                            `${user.name} ${user.last_name}`
                    },
                    {
                        label: "Correo",
                        value: (user: User): React.ReactNode => user.email
                    },
                    {
                        label: "Estado",
                        value: (user: User): React.ReactNode => (
                            <Chip
                                color={user.is_active ? "success" : "error"}
                                label={user.is_active ? "Activo" : "Inactivo"}
                            />
                        )
                    },
                    {
                        label: "Acciones",
                        align: "center",
                        value: (user) => (
                            <Box
                                component="div"
                                className="flex justify-center"
                            >
                                {user.id !== userLogged?.id && (
                                    <IconButton
                                        onClick={(
                                            e: React.MouseEvent<
                                                HTMLButtonElement,
                                                MouseEvent
                                            >
                                        ): void => {
                                            setSelectedUser(user);
                                            setAnchorActions(e.currentTarget);
                                        }}
                                    >
                                        <MoreVert color="primary" />
                                    </IconButton>
                                )}
                            </Box>
                        )
                    }
                ]}
                height={"52vh"}
            />
            <Box
                component={"div"}
                className="flex items-end justify-end mt-6"
                sx={{
                    padding: "0 8px"
                }}
            >
                <Pagination
                    color="primary"
                    count={totalPages}
                    page={page}
                    shape="rounded"
                    
                    onChange={(
                        _e: React.ChangeEvent<unknown>,
                        page: number
                    ): void => {
                        setPage(page);
                    }}
                />
            </Box>
            <Menu
                anchorEl={anchorActions}
                open={openActions}
                onClose={(): void => {
                    setAnchorActions(null);
                }}
            >
                <MenuItem
                    onClick={(): void => {
                        if (selectedUser) {
                            if (selectedUser.is_active) {
                                inactive(selectedUser.id);
                            } else {
                                active(selectedUser.id);
                            }
                            return;
                        }
                        setAnchorActions(null);
                    }}
                >
                    {selectedUser?.is_active ? "Desactivar" : "Activar"}
                </MenuItem>
            </Menu>
            <CreateUser
                open={openCreateUser}
                close={(reload: boolean): void => {
                    setOpenCreateUser(false);
                    if (reload) {
                        getAllUsers();
                    }
                }}
            />
        </GeneralContainer>
    );
}
