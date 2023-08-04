"use client";
import "./layout.css";
import { MenuOptions, Navbar } from "../components";
import { Box, Container, Paper, Drawer } from "@mui/material";
import { useState } from "react";
export default function ManagmentLayout({
    children
}: {
    children: React.ReactNode;
}) {
    const [openSubmenu, setOpenSubmenu] = useState<boolean>(false);
    return (
        <Box className="flex">
            <Box
                component="aside"
                className="boxMenu"
                sx={{
                    width: "250px",
                    height: "100vh"
                }}
            >
                <MenuOptions />
            </Box>
            <Drawer
                anchor="left"
                open={openSubmenu}
                onClose={() => setOpenSubmenu(false)}
            >
                <Box
                    component="aside"
                    sx={{
                        width: "250px",
                        height: "100vh"
                    }}
                >
                    <MenuOptions
                        onMenuClick={() => {
                            setOpenSubmenu(false);
                        }}
                    />
                </Box>
            </Drawer>
            <Box
                component="div"
                sx={{
                    width: "100%"
                }}
            >
                <Navbar
                    hasMenu={true}
                    onMenuClick={() => {
                        setOpenSubmenu(true);
                    }}
                />
                <Container
                    component="main"
                    sx={{
                        maxWidth: {
                            lg: "100%"
                        },
                        padding: "25px",
                        paddingBottom: "0px",
                        minHeight: "calc(87vh - 10px)"
                    }}
                >
                    {children}
                </Container>
            </Box>
        </Box>
    );
}
