"use client";

import { GridViewOutlined, TableViewOutlined } from "@mui/icons-material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

export enum DisplayMode {
    GridView = "grid-view",
    TableView = "table-view"
}

interface ToggleViewFilterProps {
    displayData: DisplayMode;
    changeDisplayMode: (displayMode: DisplayMode) => void;
}
export const ToggleViewFilter = ({
    displayData,
    changeDisplayMode
}: ToggleViewFilterProps): JSX.Element => {
    return (
        <ToggleButtonGroup
            value={displayData}
            exclusive
            onChange={(
                _event: React.MouseEvent<Element, MouseEvent>,
                value: React.SetStateAction<DisplayMode>
            ): void => {
                if (value) {
                    changeDisplayMode(value as DisplayMode);
                }
            }}
            size="small"
            sx={{
                color: (theme): string =>
                    theme.palette.mode === "dark" ? "standard" : "primary"
            }}
            aria-label="text alignment"
        >
            <ToggleButton value="grid-view" aria-label="grid view">
                <GridViewOutlined
                    sx={{
                        color: (theme): string =>
                            theme.palette.mode === "dark"
                                ? "inherit"
                                : "primary"
                    }}
                />
            </ToggleButton>
            <ToggleButton value="table-view" aria-label="table view">
                <TableViewOutlined
                    sx={{
                        color: (theme): string =>
                            theme.palette.mode === "dark"
                                ? "inherit"
                                : "primary"
                    }}
                />
            </ToggleButton>
        </ToggleButtonGroup>
    );
};
