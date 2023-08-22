"use client";
import { useGlobalContext } from "../context";
import { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { Module } from "@/domain/interface/Module";
import { Settings, Person, DataObject } from "@mui/icons-material";

import { UserBanner, ModuleCard } from "./components";
import { accountOptions, adminOptions } from "./options";

export default function Dashboard(): JSX.Element {
    const { setSectionTitle, user } = useGlobalContext();
    const modules = useMemo<Module[]>(() => {
        const m = [
            {
                title: "Administración",
                description: "Administra los usuarios y verifica tu licencia",
                icon: <Settings htmlColor="#0369A1" />,
                backgroundColor: "#BAE6FD",
                link: "/management/admin/accounts",
                menuOptions: adminOptions
            },
            {
                title: "Cuenta",
                description: "Administra tu cuenta y tus datos personales",
                icon: <Person htmlColor="#047857" />,
                backgroundColor: "#D1FAE5",
                link: "/management/account/user",
                menuOptions: accountOptions
            },
            {
                title: "Pavito",
                description: "Busqueda de prospectos de calidad",
                icon: <DataObject htmlColor="#62569A" />,
                backgroundColor: "#DDD6FE",
                link: "/pavito/filter"
            }
        ];
        if (!user?.is_admin) {
            m.splice(0, 1);
        }
        return m;
    }, [user]);

    useEffect(() => {
        setSectionTitle("logo");
    }, []);
    return (
        <>
            <Box className="mt-10" component="section">
                <UserBanner name={user?.name || ""} />
            </Box>
            <Box
                className="mt-10 flex gap-6 flex-wrap"
                component="section"
                sx={{
                    justifyContent: {
                        xs: "center",
                        sm: "start"
                    }
                }}
            >
                {modules.map((module: Module, index: number) => (
                    <ModuleCard key={index} module={module} />
                ))}
            </Box>
        </>
    );
}
