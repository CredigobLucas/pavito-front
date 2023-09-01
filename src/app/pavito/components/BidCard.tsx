import { Paper, Box, Typography, Button, SxProps } from "@mui/material";
import { Bid } from "@/domain/models";
import { CustomNumber, IObject } from "@/app/utils";
import { Theme } from "@emotion/react";
import Link from "next/link";

interface BidCardProps {
    bid: Bid;
    href?: string;
    onclick?: (bid: Bid) => void;
    sx?: SxProps<Theme>;
}

export const BidCard = ({
    bid,
    href = "",
    onclick,
    sx = {}
}: BidCardProps): JSX.Element => {
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
                ...sx
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
                <Box 
                    component={"div"}
                    hidden={onclick !== undefined}
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
                </Box>
                <Typography color={"#777"} fontSize={"13px"}>
                    {bid.montoAdjudicado === 0
                        ? "Monto estimado"
                        : "Monto adjudicado"}
                </Typography>
                <Typography
                    color={"primary"}
                    fontWeight={500}
                    fontSize={"20px"}
                    className="mb-2"
                    sx={{
                        fontStyle:
                            bid.montoAdjudicado === 0 ? "italic" : "normal"
                    }}
                >
                    S/.{" "}
                    {new CustomNumber(
                        bid.montoAdjudicado === 0
                            ? bid.montoEstimado
                            : bid.montoAdjudicado
                    ).format()}
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
                {onclick ? (
                    <Button
                        onClick={(e): void => {
                            e.preventDefault();
                            if (onclick) onclick(bid);
                        }}
                        variant="contained"
                        className="p-2"
                        fullWidth
                        color="primary"
                    >
                        Más información
                    </Button>
                ) : (
                    <Link href={href}>
                        <Button
                            variant="contained"
                            className="p-2"
                            fullWidth
                            color="primary"
                        >
                            Más información
                        </Button>
                    </Link>
                )}
            </Box>
        </Paper>
    );
};
