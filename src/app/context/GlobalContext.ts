import { createContext, useContext } from "react";
import { User } from "@/domain/models";
import { Theme } from "@mui/material";
import { MenuOption } from "@/domain/interface/MenuOption";
import { AlertMessage } from "@/domain/interface/AlertMessage";
import { Region } from "@/domain/models/Region";

export interface IGlobalContext {
    user?: User;
    theme: Theme;
    sectionTitle: string;
    menuOptions: MenuOption[];
    setMenuOptions: (options: MenuOption[]) => void;
    setSectionTitle: (title: string) => void;
    setUser: (user?: User) => void;
    toggleTheme: () => void;
    openAlertMessage: (alert: AlertMessage) => void;
    openAlert: boolean;
    alertMessage: AlertMessage;
    setOpenAlert: (open: boolean) => void;
    getAvaibleRegions: () => Region[];

    openLoading: boolean;
    setOpenLoading: (open: boolean) => void;
}

export const GlobalContext = createContext<IGlobalContext | undefined>(
    undefined
);

export const useGlobalContext: () => IGlobalContext = (): IGlobalContext => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error(
            "useGlobalContext must be used within a GlobalProvider"
        );
    }
    return context;
};
