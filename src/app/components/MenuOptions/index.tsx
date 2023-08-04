"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Paper, Typography, Button, Box } from "@mui/material";
import { adminOptions, accountOptions } from "@/app/dashboard/options";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CredigobLogo } from "../CredigobLogo";

interface MenuOtionsProps {
    onMenuClick?: () => void;
}
const modules = [
    {
        rootPath: "/managment/admin",
        options: adminOptions
    },
    {
        rootPath: "/managment/account",
        options: accountOptions
    }
];

export const MenuOptions = ({ onMenuClick = undefined }: MenuOtionsProps) => {
    const { menuOptions, setMenuOptions } = useGlobalContext();
    const path = usePathname();
    useEffect(() => {
        const menuOption = modules.find((module) =>
            path.startsWith(module.rootPath)
        );
        if (menuOption) {
            setMenuOptions(menuOption.options);
        }
    }, [setMenuOptions, path]);
    return (
        <Paper
            elevation={3}
            className="p-6"
            sx={{
                borderRadius: "0px",
                height: "100%",
                boxShadow: "none"
            }}
        >
            <Box
                component="div"
                className="mb-6 flex items-center justify-center"
            >
                <CredigobLogo />
            </Box>

            {menuOptions.map((option, index) => (
                <Link
                    key={index}
                    href={option.path}
                    style={{
                        textDecoration: "none"
                    }}
                >
                    <Button
                        variant={path === option.path ? "contained" : "text"}
                        color="primary"
                        fullWidth
                        className="mb-4 flex justify-start items-center"
                        onClick={() => {
                            if (onMenuClick) {
                                onMenuClick();
                            }
                        }}
                    >
                        {option.icon}
                        <Typography
                            variant="body1"
                            component="span"
                            className="capitalize font-bold"
                            sx={{
                                marginLeft: "24px"
                            }}
                        >
                            {option.title}
                        </Typography>
                    </Button>
                </Link>
            ))}
        </Paper>
    );
};
