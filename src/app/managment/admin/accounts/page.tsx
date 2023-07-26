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
    MenuItem,
    IconButton
} from "@mui/material";
import { User } from "@/domain/models";
import { MoreVert, Add } from "@mui/icons-material";
import { useState, useEffect, useMemo } from "react";
import { getUsers } from "@/services/pavito_back/enterprise/users";
import { useGlobalContext } from "@/app/context";
import { TError } from "@/domain/errors/ErrorFactory";
import { useRouter } from "next/navigation";

export default function Admin() {
    const [rows, setRows] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [onlyActive, setOnlyActive] = useState<boolean>(false);
    const { openAlertMessage, setOpenLoading } = useGlobalContext();
    const router = useRouter();

    const getAllUsers = async () => {
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
        getAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useMemo(() => {
        getAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, rowsPerPage, onlyActive]);
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
                                onChange={(e) => {
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
                    {/*<Typography
                        sx={{
                            marginRight: "30px"
                        }}
                        component="span"
                        fontSize={"12px"}
                        color={"#9E9E9E"}
                    >
                        <Typography
                            component="span"
                            fontWeight="bold"
                            color={"#544892"}
                        >
                            {20}
                        </Typography>{" "}
                        de{" "}
                        <Typography
                            component="span"
                            fontWeight="bold"
                            // set primary color
                            color={"#544892"}
                        >
                            {totalRows}
                        </Typography>{" "}
                        usuarios disponibles
                    </Typography>*/}
                    <Button
                        className="capitalize font-bold text-sm"
                        variant="contained"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                        size="small"
                    >
                        <Add
                            sx={{
                                marginRight: "2px"
                            }}
                            fontSize="small"
                        />
                        Crear Usuario
                    </Button>
                </Box>
            </Box>
            <PavitoTable<User>
                rows={rows}
                columns={[
                    {
                        label: "Usuario",
                        value: (user) => `${user.name} ${user.last_name}`
                    },
                    {
                        label: "Correo",
                        value: (user) => user.email
                    },
                    {
                        label: "Celular",
                        value: (user) => user.phone_number
                    },
                    {
                        label: "Estado",
                        value: (user) => (
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
                                <IconButton>
                                    <MoreVert color="primary" />
                                </IconButton>
                            </Box>
                        )
                    }
                ]}
                height={"52vh"}
            />
            <Box
                component={"div"}
                className="flex items-end justify-end"
                sx={{
                    padding: "0 8px"
                }}
            >
                <Pagination
                    color="primary"
                    count={totalPages}
                    page={page}
                    shape="rounded"
                    onChange={(_e, page) => {
                        setPage(page);
                    }}
                />
            </Box>
        </GeneralContainer>
    );
}
