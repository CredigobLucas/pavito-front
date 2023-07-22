"use client";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Paper, Typography, Button } from "@mui/material";
import { adminOptions, accountOptions } from "@/app/dashboard/options";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

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

export const MenuOptions = () => {
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
            <Link
                href="/dashboard"
                style={{
                    textDecoration: "none",
                    color: "inherit"
                }}
            >
                <Typography
                    variant="h4"
                    className="font-bold text-center"
                    sx={{
                        marginBottom: "32px"
                    }}
                >
                    Credigob
                </Typography>
            </Link>

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
