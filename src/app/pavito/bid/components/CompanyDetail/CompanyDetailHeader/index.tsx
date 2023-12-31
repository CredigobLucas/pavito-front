import { PavitoEnterprise } from "@/domain/models";
import { Box, Typography } from "@mui/material";
import { CompanyDetailHeaderItem } from "./CompanyDetailHeaderItem";

interface CompanyDetailHeaderProps {
    enterpriseDetails: PavitoEnterprise;
    mype: boolean;
    hasMargin?: boolean;
    mobileMode?: boolean;
}

export const CompanyDetailHeader = ({
    enterpriseDetails,
    mype,
    hasMargin = true,
    mobileMode = false
}: CompanyDetailHeaderProps): JSX.Element => {
    const firstLetterToUpperCase = (word: string): string => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };
    return (
        <Box className={hasMargin ? "mt-6" : ""} component={"div"}>
            <Box className="w-full">
                <Typography
                    variant={"h5"}
                    className="font-bold"
                    color={"primary"}
                >
                    {enterpriseDetails.razonSocial}
                </Typography>
            </Box>
            <Box
                className={`mt-2 flex w-full ${
                    mobileMode
                        ? "flex-col"
                        : "md:justify-between flex-col md:flex-row"
                }`}
            >
                <Box>
                    <CompanyDetailHeaderItem
                        title={"RUC:"}
                        content={enterpriseDetails.ruc}
                    />

                    <CompanyDetailHeaderItem
                        title={"Correo:"}
                        content={enterpriseDetails.correos}
                    />
                    <CompanyDetailHeaderItem
                        title={"Teléfono:"}
                        content={enterpriseDetails.telefono}
                    />
                </Box>
                <Box>
                    <CompanyDetailHeaderItem
                        title={"Ubicación:"}
                        content={`${firstLetterToUpperCase(
                            enterpriseDetails.departamento
                        )}, ${firstLetterToUpperCase(
                            enterpriseDetails.provincia
                        )}`}
                    />
                    <CompanyDetailHeaderItem
                        title={"Ubigeo:"}
                        content={enterpriseDetails.ubigeo}
                    />
                </Box>
                <Box>
                    <CompanyDetailHeaderItem
                        title={"Mype:"}
                        content={mype ? "Sí" : "No"}
                    />
                    <CompanyDetailHeaderItem
                        title={"Estado:"}
                        content={enterpriseDetails.estado}
                    />
                </Box>
            </Box>
        </Box>
    );
};
