"use client";
import { useState } from "react";
import { User } from "@/domain/models";
import { MenuOption } from "@/domain/interface/MenuOption";
import { Theme } from "@mui/material";
import { GlobalContext, IGlobalContext } from "./GlobalContext";
import { AlertMessage } from "@/domain/interface/AlertMessage";
import { darkTheme, ligthTheme } from "@/theme";
import { Region } from "@/domain/models/Region";


export const GlobalContextProvider = ({
    children
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [sectionTitle, setSectionTitle] = useState<string>("Panel");
    const [menuOptions, setMenuOptions] = useState<MenuOption[]>([]);
    const [user, setUser] = useState<User | undefined>({
        last_name: "",
        name: "",
        email: "",
        phone_number: "",
        document_number: "",
        document_type: "",
        id: "",
        is_active: false,
        groups: [],
        is_admin: false
    } as User);
    const [theme, setTheme] = useState<Theme>(darkTheme);

    const [openLoading, setOpenLoading] = useState<boolean>(false);

    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<AlertMessage>({
        horizontal: "left",
        vertical: "top",
        severity: "info",
        message: ""
    } as AlertMessage);

    const openAlertMessage = (alert: AlertMessage): void => {
        setAlertMessage(alert);
        setOpenAlert(true);
    };

    const setUsr = (user?: User): void => {
        setUser(user);
    };

    const toggleTheme = (): void => {
        if (theme === darkTheme) {
            setTheme(ligthTheme);
        } else {
            setTheme(darkTheme);
        }
    };
    const getAvaibleRegions = (): Region[] => {
        const permissions = user?.groups.map((group) => {
            return group.permissions;
        });
        const permissionsDepartment = permissions?.reduce((acc, curr) => {
            return [
                ...acc,
                ...curr.filter((permission) => permission.key === "department")
            ];
        }, []);
        const regions = permissionsDepartment?.map((permission) => {
            return {
                id: permission.id,
                value: permission.value
            } as Region;
        });
        const regionsWithoutDuplicates = regions?.filter(
            (region, index, self) =>
                index === self.findIndex((t) => t.id === region.id)
        );
        return regionsWithoutDuplicates || [];
    };
    const value: IGlobalContext = {
        user: user,
        setUser: setUsr,
        theme: theme,
        menuOptions: menuOptions,
        setMenuOptions: setMenuOptions,
        toggleTheme: toggleTheme,
        sectionTitle: sectionTitle,
        setSectionTitle: setSectionTitle,
        openAlertMessage: openAlertMessage,
        openAlert: openAlert,
        setOpenAlert: setOpenAlert,
        alertMessage: alertMessage,
        openLoading: openLoading,
        setOpenLoading: setOpenLoading,
        getAvaibleRegions: getAvaibleRegions
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
