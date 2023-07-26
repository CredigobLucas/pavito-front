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

const rows: User[] = [
    {
        last_name: "Gonzalez",
        name: "Maria",
        email: "maria@example.com",
        phone_number: "555-123-4567",
        document_number: "12345678",
        document_type: "ID",
        id: "user123",
        is_active: true,
        groups: [],
        is_admin: false
    },
    {
        last_name: "Smith",
        name: "John",
        email: "john@example.com",
        phone_number: "555-987-6543",
        document_number: "87654321",
        document_type: "Passport",
        id: "user456",
        is_active: true,
        groups: [],
        is_admin: true
    },
    {
        last_name: "Lopez",
        name: "Carlos",
        email: "carlos@example.com",
        phone_number: "555-555-5555",
        document_number: "135790",
        document_type: "ID",
        id: "user789",
        is_active: true,
        groups: [],
        is_admin: false
    },
    {
        last_name: "Brown",
        name: "Emily",
        email: "emily@example.com",
        phone_number: "555-222-3333",
        document_number: "24681357",
        document_type: "Driver's License",
        id: "user101",
        is_active: true,
        groups: [],
        is_admin: false
    },
    {
        last_name: "Kim",
        name: "David",
        email: "david@example.com",
        phone_number: "555-444-7777",
        document_number: "864209",
        document_type: "ID",
        id: "user111",
        is_active: true,
        groups: [],
        is_admin: false
    }
];

export default function Admin() {
    return (
        <GeneralContainer>
            <Box
                component={"div"}
                className="flex flex-col justify-between md:flex-row"
                sx={{
                    marginBottom: "16px",
                    padding: "0 20px"
                }}
            >
                <Box
                    component={"div"}
                    className="flex items-center justify-start md:justify-end mb-4 md:mb-0"
                >
                    <Box component={"div"}>
                        <Typography component="div" className="font-medium">
                            Mostrar
                            <Select
                                className="mx-3 font-medium"
                                size="small"
                                defaultValue={10}
                            >
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
                    className="flex items-center justify-between md:justify-end"
                >
                    <Typography
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
                            {30}
                        </Typography>{" "}
                        usuarios disponibles
                    </Typography>
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
                    padding: "16px 8px"
                }}
            >
                <Pagination color="primary" count={3} shape="rounded" />
            </Box>
        </GeneralContainer>
    );
}
