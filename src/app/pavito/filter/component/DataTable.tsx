"use client";
import { Bid } from "@/domain/models";
import { PavitoTable } from "@/app/components/PavitoTable";
import { CustomNumber, IObject } from "@/app/utils";
import { IconButton, Paper, Tooltip } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';

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
                        value: (row) => `S/. ${new CustomNumber(row.montoAdjudicado).format()}`
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
                    },
                    {
                        label: "",
                        value: (row) => <Tooltip title="Ver detalle">
                        <IconButton
                            style={
                                {
                                    color: '#544892',
                                }
                            } 
                            href={`/pavito/bid?item=${row.id_item}&licitacion=${row.id_licitacion}&milestone=${row.id_milestone}&participante=${row.id_participante}&ruc=${row.ruc}&mype=${row.mype}`}
                        >
                            <LinkIcon/>
                        </IconButton>
                    </Tooltip>
                    },
                ]}
                rows={bids}
            />
        </Paper>
    );
};
