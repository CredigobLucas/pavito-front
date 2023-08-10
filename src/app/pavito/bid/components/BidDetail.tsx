"use client";
import { CircularProgress } from "@mui/material";

import { getBidDetail } from "@/services/pavito_back/bids/bid_detail";
import { useEffect, useState } from "react";
import { useGlobalContext } from "@/app/context";
import { PavitoBid } from "@/domain/models";

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
                <CircularProgress />
            ) : (
                <pre>
                    <code lang="JSON">
                        {JSON.stringify(bidDetail, null, 2)}
                    </code>
                </pre>
            )}
        </>
    );
};
