"use client";
import { useGlobalContext } from "@/app/context";
import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import { FilterForm } from "./component/FilterForm";
import { IconButton, TablePagination } from "@mui/material";
import {
    ShareOutlined,
    FileDownloadOutlined,
    SortByAlphaOutlined,
    GridViewOutlined,
    TableViewOutlined
} from "@mui/icons-material";

enum DisplayMode {
    GridView = "grid-view",
    TableView = "table-view"
}

export default function PavitoFilter(): JSX.Element {
    const { setSectionTitle, theme, openAlertMessage } = useGlobalContext();
    const [displayData, setDisplayData] = useState<DisplayMode>(
        DisplayMode.GridView
    );

    useEffect(() => {
        setSectionTitle("logo");
    }, []);

    return (
        <Box
            component={"div"}
            className="flex mt-5 flex-col lg:flex-row"
            sx={{
                gap: "60px"
            }}
        >
            <Box
                sx={{
                    minWidth: "300px"
                }}
            >
                <FilterForm />
            </Box>
            <Box component="section" className="w-full">
                <Box
                    component={"div"}
                    className="w-full flex items-center justify-between"
                >
                    <Typography
                        className="font-bold"
                        variant="h4"
                        component="h1"
                        color={
                            theme.palette.mode === "dark"
                                ? "default"
                                : "primary"
                        }
                    >
                        Prospectos
                    </Typography>
                    <Box>
                        <IconButton
                            color={
                                theme.palette.mode === "dark"
                                    ? "default"
                                    : "primary"
                            }
                            onClick={(): void => {
                                navigator.clipboard.writeText(
                                    `${window.location}`
                                );
                                openAlertMessage({
                                    horizontal: "center",
                                    vertical: "top",
                                    severity: "success",
                                    message: "Copiado al portapapeles"
                                });
                            }}
                        >
                            <ShareOutlined />
                        </IconButton>
                        <IconButton
                            color={
                                theme.palette.mode === "dark"
                                    ? "default"
                                    : "primary"
                            }
                            className="mx-2"
                        >
                            <FileDownloadOutlined />
                        </IconButton>
                        <IconButton
                            color={
                                theme.palette.mode === "dark"
                                    ? "default"
                                    : "primary"
                            }
                        >
                            <SortByAlphaOutlined />
                        </IconButton>
                    </Box>
                </Box>
                <Box
                    component={"div"}
                    className="w-full flex items-center justify-end mt-6"
                >
                    <ToggleButtonGroup
                        value={displayData}
                        exclusive
                        onChange={(
                            _event: React.MouseEvent<Element, MouseEvent>,
                            value: React.SetStateAction<DisplayMode>
                        ): void => {
                            if (value) {
                                setDisplayData(value);
                            }
                        }}
                        size="small"
                        color={
                            theme.palette.mode === "dark"
                                ? "standard"
                                : "primary"
                        }
                        aria-label="text alignment"
                    >
                        <ToggleButton value="grid-view" aria-label="grid view">
                            <GridViewOutlined
                                color={
                                    theme.palette.mode === "dark"
                                        ? "inherit"
                                        : "primary"
                                }
                            />
                        </ToggleButton>
                        <ToggleButton
                            value="table-view"
                            aria-label="table view"
                        >
                            <TableViewOutlined
                                color={
                                    theme.palette.mode === "dark"
                                        ? "inherit"
                                        : "primary"
                                }
                            />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Box className="mt-6">gaa</Box>
                <TablePagination
                    className="mt-6"
                    count={100}
                    page={1}
                    rowsPerPage={10}
                    onPageChange={(): void => {}}
                    color="primary"
                    sx={{
                        border: "none",
                        "& .MuiToolbar-root": {
                            padding: 0
                        }
                    }}
                    component={"div"}
                />
            </Box>
        </Box>
    );
}
