import { Paper, Box, Typography, Button } from "@mui/material";
import { Bid } from "@/domain/models";
import { IObject } from "@/app/utils";
import Link from "next/link";

interface BidCardProps {
    bid: Bid;
    isLink?: boolean;
    href?: string;
    onclick?: (bid: Bid) => void;
}

export const BidCard = ({ bid, isLink=false, href="", onclick }: BidCardProps): JSX.Element => {
    const gobierno: IObject = {
        GR: "Regional",
        GL: "Local",
        GN: "Nacional"
    };
    return (
        <Paper
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            elevation={3}
        >
            <Box
                className="px-4 py-3"
                sx={{
                    backgroundColor: (theme): string => {
                        if (theme.palette.mode === "dark") {
                            return "#050506";
                        }
                        return "#e9e7f5";
                    },
                    borderTopLeftRadius: "15px",
                    borderTopRightRadius: "15px"
                }}
            >
                <Typography color={"#777"} fontSize={"13px"}>
                    Razón Social
                </Typography>
                <Typography
                    color={"primary"}
                    fontWeight={500}
                    fontSize={"20px"}
                    className="mb-2"
                >
                    {bid.razonSocial}
                </Typography>
                <Typography color={"#777"} fontSize={"13px"}>
                    Valor de Licitación
                </Typography>
                <Typography
                    color={"primary"}
                    fontWeight={500}
                    fontSize={"20px"}
                    className="mb-2"
                >
                    S/. {bid.montoAdjudicado.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 })}
                </Typography>
            </Box>
            <Box
                className="px-4 py-3"
                sx={{
                    "& p": {
                        fontSize: "14px"
                    }
                }}
            >
                <Typography className="mb-2" component={"p"}>
                    Mype: {bid.mype ? "Sí" : "No"}
                </Typography>
                <Typography className="mb-2" component={"p"}>
                    Entidad Publica: {bid.entidadContratante}
                </Typography>
                <Typography className="mb-2" component={"p"}>
                    Región: {bid.provincia}, {bid.departamento}
                </Typography>
                <Typography component={"p"}>
                    Nivel de gobierno: {gobierno[bid.nivelGobierno]}
                </Typography>
            </Box>
            <Box className="px-4 pb-3">
                {isLink ? (
                    <Link href={href}>
                        <Button variant="contained" className="p-2" fullWidth color="primary">
                            Más información
                        </Button>
                    </Link>
                ) : (
                    <Button 
                        onClick={() : void => {
                            if(onclick) onclick(bid);
                        }} 
                        variant="contained" 
                        className="p-2" 
                        fullWidth 
                        color="primary"
                    >
                        Más información
                    </Button>
                )}
                
            </Box>
        </Paper>
    );
};
