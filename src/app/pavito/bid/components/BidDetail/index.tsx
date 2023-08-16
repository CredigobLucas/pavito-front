"use client";
import { CircularProgress, Box } from "@mui/material";

import { getBidDetail } from "@/services/pavito_back/bids/bid_detail";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context";
import { PavitoBid } from "@/domain/models";
import { TitleBidDetail } from "../TitleBidDetail";
import { TableBidDetail } from "./TableBidDetail";

export interface BidDetailParams {
    item: string;
    licitacion: string;
    milestone: string;
    participante: string;
}

interface BidDetailProps {
    params: BidDetailParams | null;
}

export const BidDetail = ({ params }: BidDetailProps): JSX.Element => {
    const { user } = useGlobalContext();
    const [bidDetail, setBidDetail] = useState<PavitoBid | undefined>(
        undefined
    );

    useEffect(() => {
        if (params && user && user.id) {
            setBidDetail(undefined);
            getBidDetail({
                item: params.item,
                licitacion: params.licitacion,
                milestone: params.milestone,
                participante: params.participante
            }).then((res) => {
                setBidDetail(res.body);
            });
        }
    }, [params, user]);
    return (
        <>
            {!bidDetail ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "30vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box component={"section"}>
                    <TitleBidDetail title="Detalles de licitación" />
                    <TableBidDetail
                        className="my-6"
                        data={bidDetail}
                        rows={[
                            {
                                title: "Monto Adjudicado en Soles",
                                key: "montoAdjudicado"
                            },
                            {
                                title: "Descripción de Licitación",
                                key: "descripcionLicitacion"
                            },
                            {
                                title: "Inicio Buena Pro",
                                key: "fechaInicioBuenapro"
                            },
                            {
                                title: "Objeto",
                                key: "objetoLicitacion"
                            },
                            {
                                title: "Entidad Contratante",
                                key: "entidadContratante"
                            },
                            {
                                title: "Nivel",
                                key: "nivelGobierno"
                            },
                            {
                                title: "Sector",
                                key: "sector"
                            }
                        ]}
                    />
                </Box>
            )}
        </>
    );
};
