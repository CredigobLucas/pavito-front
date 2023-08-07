"use client";
import { Bid } from "@/domain/models";
import { PavitoTable } from "@/app/components/PavitoTable";
import { IObject } from "@/app/utils";
import { Paper } from "@mui/material";
interface DataTableProps {
    bids: Bid[];
}

export const DataTable = ({ bids }: DataTableProps): JSX.Element => {
    const gobierno: IObject = {
        GR: "Regional",
        GL: "Local",
        GN: "Nacional"
    };
    return (
        <Paper elevation={3}>
            <PavitoTable
                columns={[
                    {
                        label: "Razon Social",
                        value: (row) => row.razonSocial
                    },
                    {
                        label: "Monto",
                        value: (row) => `S/. ${row.montoAdjudicado}`
                    },
                    {
                        label: "Mype",
                        value: (row) => `${row.mype ? "Si" : "No"}`
                    },
                    {
                        label: "Entidad Publica",
                        value: (row) => row.entidadContratante
                    },
                    {
                        label: "Region",
                        value: (row) => row.departamento
                    },
                    {
                        label: "Goberno",
                        value: (row) => gobierno[row.nivelGobierno]
                    }
                ]}
                rows={bids}
            />
        </Paper>
    );
};
