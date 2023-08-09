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
                convertCard={false}
                columns={[
                    {
                        label: "Razon Social",
                        value: (row) => row.razonSocial
                    },
                    {
                        label: "Monto",
                        value: (row) => `S/. ${row.montoAdjudicado.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 })}`
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
                        label: "Gobierno",
                        value: (row) => gobierno[row.nivelGobierno]
                    }
                ]}
                rows={bids}
            />
        </Paper>
    );
};
