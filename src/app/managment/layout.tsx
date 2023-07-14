"use client";
import { MenuOptions, Navbar } from "../components";
import { Box, Container, Paper } from "@mui/material";
export default function ManagmentLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Box className="flex">
            <Box
                component="aside"
                sx={{
                    width: "250px",
                    height: "100vh"
                }}
            >
                <MenuOptions />
            </Box>
            <Box
                component="div"
                sx={{
                    width: "100%"
                }}
            >
                <Navbar />
                <Container
                    component="main"
                    sx={{
                        maxWidth: {
                            lg: "100%"
                        }
                    }}
                >
                    {children}
                </Container>
            </Box>
        </Box>
    );
}
