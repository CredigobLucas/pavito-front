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
    const [user, setUser] = useState<User | undefined>(undefined);
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
        toggleTheme: toggleTheme
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};
