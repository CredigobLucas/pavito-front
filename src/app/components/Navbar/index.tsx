"use client";
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
    LightMode
} from "@mui/icons-material";
import { useGlobalContext } from "@/app/context";
import { useState } from "react";

export const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, toggleTheme, theme, sectionTitle } = useGlobalContext();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AppBar position="static">
            <Toolbar>
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
                            {user?.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            {user?.role}
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
                            onClick={() => {
                                toggleTheme();
                            }}
                        >
                            <ListItemIcon>
                                {theme.palette.mode === "dark" ? (
                                    <DarkMode fontSize="small" />
                                ) : (
                                    <LightMode fontSize="small" />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                className="capitalize"
                                primary={`${theme.palette.mode} Mode`}
                            />
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
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
