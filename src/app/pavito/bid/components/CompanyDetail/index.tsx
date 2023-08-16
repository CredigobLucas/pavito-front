"use client";
import { getEnterpriseDetails } from "@/services/pavito_back/bids/enterprise_detail";
import { useGlobalContext } from "@/app/context";
import { useEffect, useState } from "react";
import { PavitoEnterprise } from "@/domain/models";
import { CircularProgress, Box, Tooltip, Typography } from "@mui/material";
import { CompanyDetailHeader } from "./CompanyDetailHeader";
import { TitleBidDetail } from "../TitleBidDetail";
import { ItemIconCard } from "@/app/components";

import {
    PaidOutlined,
    ArticleOutlined,
    HourglassEmptyOutlined,
    InfoOutlined,
    ReportProblemOutlined
} from "@mui/icons-material";
import { CardsContainer } from "./CardsContainer";
import { CustomNumber, IObject } from "@/app/utils";

interface CompanyDetailsProps {
    ruc: string;
    mype: boolean;
    hasMargin?: boolean;
    mobileMode?: boolean;
}

export const CompanyDetails = ({
    ruc,
    mype,
    hasMargin = true,
    mobileMode = false
}: CompanyDetailsProps): JSX.Element => {
    const { user } = useGlobalContext();
    const [enterpriseDetails, setEnterpriseDetails] = useState<
        PavitoEnterprise | undefined
    >(undefined);
    const semaphoreColor: IObject = {
        Verde: "#4caf50",
        Amarillo: "#ffeb3b",
        Rojo: "#f44336",
        Naranja: "#ff9800"
    };
    useEffect(() => {
        if (ruc && user && user.id) {
            getEnterpriseDetails(ruc).then((res) => {
                setEnterpriseDetails(res.body);
            });
        }
    }, [ruc, user]);

    return (
        <>
            {!enterpriseDetails ? (
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
                    <CompanyDetailHeader
                        enterpriseDetails={enterpriseDetails}
                        mype={mype}
                        hasMargin={hasMargin}
                        mobileMode={mobileMode}
                    />
                    <TitleBidDetail className="mt-3" title="Datos históricos" />
                    <CardsContainer mobileMode={mobileMode} className="my-6">
                        <>
                            <ItemIconCard
                                title="Total de Licitaciones"
                                content={
                                    enterpriseDetails.totalContratosGobpe >= 0
                                        ? enterpriseDetails.totalContratosGobpe
                                        : "-"
                                }
                                color="#5fbbbb"
                                icon={<ArticleOutlined />}
                            />
                            <ItemIconCard
                                title="Licitaciones Vigentes"
                                content={
                                    enterpriseDetails.licitacionesVigentes >= 0
                                        ? enterpriseDetails.licitacionesVigentes
                                        : "-"
                                }
                                color="#27ae60"
                                icon={<ArticleOutlined />}
                            />
                            <ItemIconCard
                                title="Año de primera licitacion ganada"
                                content={
                                    enterpriseDetails.primeraLicitacion
                                        ? enterpriseDetails.primeraLicitacion
                                        : "-"
                                }
                                color="#9b51e0"
                                icon={<HourglassEmptyOutlined />}
                            />
                        </>
                    </CardsContainer>
                    <CardsContainer mobileMode={mobileMode} className="my-6">
                        <>
                            <ItemIconCard
                                title="Cantidad Penalidades"
                                content={
                                    enterpriseDetails.penalidadesPen +
                                    enterpriseDetails.penalidadesUsd
                                }
                                color="#f2c94c"
                                icon={<InfoOutlined />}
                            />
                            <ItemIconCard
                                title="Cantidad de sanciones"
                                content={
                                    enterpriseDetails.sancionesTemporales +
                                    enterpriseDetails.sancionesDefinitivas
                                }
                                color="#ed726b"
                                icon={
                                    <Tooltip
                                        title={
                                            (enterpriseDetails.sancionesDefinitivas !==
                                                0 ||
                                                enterpriseDetails.sancionesTemporales !==
                                                    0) && (
                                                <Box>
                                                    <Typography variant="inherit">
                                                        Sanciones temporales{" "}
                                                        {
                                                            enterpriseDetails.sancionesTemporales
                                                        }
                                                    </Typography>
                                                    <Typography variant="inherit">
                                                        Sanciones definitivas{" "}
                                                        {
                                                            enterpriseDetails.sancionesDefinitivas
                                                        }
                                                    </Typography>
                                                </Box>
                                            )
                                        }
                                    >
                                        <ReportProblemOutlined />
                                    </Tooltip>
                                }
                            />
                            {enterpriseDetails.sumaPenalidadesPen > 0 && (
                                <ItemIconCard
                                    title="Penalidades soles"
                                    content={`S/. ${enterpriseDetails.sumaPenalidadesPen}`}
                                    icon={<PaidOutlined />}
                                    color={"#2d9cdb"}
                                />
                            )}
                        </>
                    </CardsContainer>
                    <CardsContainer mobileMode={mobileMode} className="my-6">
                        <>
                            {enterpriseDetails.montoLicitacionesPen > 0 && (
                                <ItemIconCard
                                    title="Monto de Licitaciones (S/.)"
                                    content={`S/. ${new CustomNumber(
                                        enterpriseDetails.montoLicitacionesPen
                                    ).format()}`}
                                    icon={<PaidOutlined />}
                                    color={"#2d9cdb"}
                                />
                            )}
                            {enterpriseDetails.montoLicitacionesUsd > 0 && (
                                <ItemIconCard
                                    title="Monto de Licitaciones ($)"
                                    content={`$ ${enterpriseDetails.montoLicitacionesUsd}`}
                                    icon={<PaidOutlined />}
                                    color={"#2d9cdb"}
                                />
                            )}
                            {enterpriseDetails.montoLicitacionesUsd <= 0 &&
                                enterpriseDetails.montoLicitacionesPen <= 0 && (
                                    <ItemIconCard
                                        title="Monto de Licitaciones"
                                        content="Sin registros"
                                        icon={<PaidOutlined />}
                                        color={"#2d9cdb"}
                                    />
                                )}
                            {enterpriseDetails.sumaPenalidadesUsd > 0 && (
                                <ItemIconCard
                                    title="Penalidades dólares"
                                    content={`$ ${enterpriseDetails.sumaPenalidadesUsd}`}
                                    icon={<PaidOutlined />}
                                    color={"#2d9cdb"}
                                />
                            )}
                        </>
                    </CardsContainer>
                    <TitleBidDetail title="Indicadores" />
                    <CardsContainer mobileMode={mobileMode} className="my-6">
                        <>
                            <ItemIconCard
                                title="Indicador de buen comportamiento"
                                color={
                                    semaphoreColor[
                                        enterpriseDetails.colorSancion
                                    ]
                                }
                                onlyIcon
                                icon={
                                    <Box
                                        sx={{
                                            width: "55px",
                                            height: "50px !important",
                                            borderRadius: "50%",
                                            backgroundColor:
                                                semaphoreColor[
                                                    enterpriseDetails
                                                        .colorSancion
                                                ]
                                        }}
                                    ></Box>
                                }
                            />
                        </>
                    </CardsContainer>
                </Box>
            )}
        </>
    );
};
