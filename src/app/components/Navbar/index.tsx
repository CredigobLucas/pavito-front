"use client";
import "./navbar.css";
import {
    AppBar,
    Toolbar,
    Typography,
    MenuItem,
    Menu,
    IconButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import {
    ExpandMore,
    ExpandLess,
    Person,
    Logout,
    DarkMode,
    LightMode,
    Menu as MenuIcon
} from "@mui/icons-material";

import { useGlobalContext } from "@/app/context";
import { useState } from "react";
import { removeCookie } from "@/app/actions";

interface NavbarProps {
    hasMenu?: boolean;
    onMenuClick?: () => void;
}

export const Navbar = ({
    hasMenu = false,
    onMenuClick = undefined
}: NavbarProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, toggleTheme, theme, sectionTitle } = useGlobalContext();

    const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const logout = async (event: React.MouseEvent<HTMLElement>): Promise<void> => {
        await removeCookie("token");
    };

    const handleClose = (): void => {
        setAnchorEl(null);
    };
    return (
        <AppBar
            elevation={3}
            position="sticky"
            className="p-4"
            sx={{
                boxShadow: "none"
            }}
        >
            <Toolbar>
                {hasMenu && onMenuClick !== undefined && (
                    <IconButton
                        className="buttonMenu"
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 1 }}
                        onClick={() => {
                            onMenuClick();
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography
                    className="font-bold"
                    variant="h4"
                    component="div"
                    sx={{ flexGrow: 1 }}
                >
                    {sectionTitle}
                </Typography>

                <div className="flex items-center justify-center">
                    <div className="flex flex-col items-end justify-center mr-2">
                        <Typography
                            variant="body1"
                            component="div"
                            sx={{ flexGrow: 1, fontWeight: "bold" }}
                        >
                            {`${user?.name} ${user?.last_name}`}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {user?.is_admin ? "Administrador" : "Usuario"}
                        </Typography>
                    </div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {anchorEl ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Person fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Mi Perfil" />
                        </MenuItem>
                        <MenuItem
                            onClick={(): void => {
                                toggleTheme();
                            }}
                        >
                            <ListItemIcon>
                                {theme.palette.mode === "dark" ? (
                                    <LightMode fontSize="small" />
                                ) : (
                                    <DarkMode fontSize="small" />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                className="capitalize"
                                primary={`Modo ${
                                    theme.palette.mode === "dark"
                                        ? "Claro"
                                        : "Oscuro"
                                }`}
                            />
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar Sesión" />
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};
