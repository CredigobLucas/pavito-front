import { createContext, useContext } from "react";
import { User } from "@/domain/models";
import { Theme, createTheme } from "@mui/material";

export interface IGlobalContext {
    user?: User;
    theme: Theme;
    setUser: (user?: User) => void;
    toggleTheme: () => void;
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
