"use client";
import { useState } from "react";
import { User } from "@/domain/models";
import { Theme } from "@mui/material";
import { GlobalContext, IGlobalContext } from "./GlobalContext";
import { darkTheme, ligthTheme } from "@/theme";
export const GlobalContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [sectionTitle, setSectionTitle] = useState<string>("Panel");
    const [user, setUser] = useState<User | undefined>({
        name: "John Doe",
        role: "admin"
    } as User);
    const [theme, setTheme] = useState<Theme>(darkTheme);

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
        toggleTheme: toggleTheme,
        sectionTitle: sectionTitle,
        setSectionTitle: setSectionTitle
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
