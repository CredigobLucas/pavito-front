"use client";
import { GeneralContainer } from "@/app/components";
import { PavitoTable } from "@/app/components/PavitoTable";
import { Button } from "@mui/material";

export default function Admin() {
    return (
        <GeneralContainer>
            <Button
                className="p-3 rounded-lg capitalize font-bold"
                variant="contained"
            >
                Crear Usuario
            </Button>
            <PavitoTable />
        </GeneralContainer>
    );
}
