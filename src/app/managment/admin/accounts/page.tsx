"use client";
import { GeneralContainer } from "@/app/components";
import { PavitoTable } from "@/app/components/PavitoTable";
import { Box, Button, Typography, Pagination } from "@mui/material";
import { User } from "@/domain/models";
import { EDocumentType, EStatusType } from "@/domain/enum";
import { MoreVert, Add } from "@mui/icons-material";

const rows: User[] = [
    {
        id: "1",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "juan@perez.com",
        cellphone: "123456789",
        status: EStatusType.ACTIVE
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    },
    {
        id: "2",
        name: "Juan",
        lastName: "Perez",
        documentType: EDocumentType.CC,
        documentNumber: "123456789",
        email: "aaa@aasd.dasd",
        cellphone: "123456789",
        status: EStatusType.SUSPENDED
    }
];

export default function Admin() {
    return (
        <GeneralContainer>
            <Box
                component={"div"}
                className="flex items-center justify-between"
                sx={{
                    marginBottom: "16px",
                    padding: "0 20px"
                }}
            >
                <Box component={"div"} className="flex items-center">
                    gaa
                </Box>
                <Box component={"div"} className="flex items-center">
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
                            fontSize={"14px"}
                            color={"#544892"}
                        >
                            {20}
                        </Typography>{" "}
                        de{" "}
                        <Typography
                            component="span"
                            fontWeight="bold"
                            fontSize={"14px"}
                            // set primary color
                            color={"#544892"}
                        >
                            {30}
                        </Typography>{" "}
                        usuarios disponibles
                    </Typography>
                    <Button
                        className="rounded-lg capitalize font-bold"
                        variant="contained"
                        sx={{
                            padding: "8px 12px ",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Add
                            sx={{
                                marginRight: "8px"
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
                        value: (user) => `${user.name} ${user.lastName}`
                    },
                    {
                        label: "Correo",
                        value: (user) => user.email
                    },
                    {
                        label: "Celular",
                        value: (user) => user.cellphone
                    },
                    {
                        label: "Estado",
                        value: (user) => user.status
                    },
                    {
                        label: "Acciones",
                        align: "center",
                        value: (user) => (
                            <div className="flex justify-center">
                                <MoreVert color="primary" />
                            </div>
                        )
                    }
                ]}
                height={"58vh"}
            />
            <Box
                component={"div"}
                className="flex items-end justify-end"
                sx={{
                    padding: "16px 8px"
                }}
            >
                <Pagination color="primary" count={10} shape="rounded" />
            </Box>
        </GeneralContainer>
    );
}
