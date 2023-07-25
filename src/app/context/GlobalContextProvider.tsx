"use client";
import { useState } from "react";
import { User } from "@/domain/models";
import { MenuOption } from "@/domain/interface/MenuOption";
import { Theme, Snackbar, Alert } from "@mui/material";
import { GlobalContext, IGlobalContext } from "./GlobalContext";
import { AlertMessage } from "@/domain/interface/AlertMessage";
import { darkTheme, ligthTheme } from "@/theme";
export const GlobalContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
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

    const [openAlert, setOpenAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<AlertMessage>({
        horizontal: "left",
        vertical: "top",
        severity: "info",
        message: ""
    } as AlertMessage);

    const openAlertMessage = (alert: AlertMessage) => {
        setAlertMessage(alert);
        setOpenAlert(true);
    };

    const setUsr = (user?: User) => {
        setUser(user);
    };

    const toggleTheme = () => {
        if (theme === darkTheme) {
            setTheme(ligthTheme);
        } else {
            setTheme(darkTheme);
        }
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
        alertMessage: alertMessage
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
