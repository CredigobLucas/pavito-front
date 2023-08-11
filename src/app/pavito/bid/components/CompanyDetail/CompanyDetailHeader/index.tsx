import { PavitoEnterprise } from "@/domain/models";
import { Box, Typography } from "@mui/material";
import { CompanyDetailHeaderItem } from "./CompanyDetailHeaderItem";

interface CompanyDetailHeaderProps {
    enterpriseDetails: PavitoEnterprise;
}

export const CompanyDetailHeader = ({
    enterpriseDetails
}: CompanyDetailHeaderProps): JSX.Element => {
    const firstLetterToUpperCase = (word: string): string => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    };
    return (
        <Box className="mt-6" component={"div"}>
            <Box className="w-full">
                <Typography
                    variant={"h5"}
                    className="font-bold"
                    color={"primary"}
                >
                    {enterpriseDetails.razonSocial}
                </Typography>
            </Box>
            <Box className="mt-2 flex w-full md:justify-between flex-col md:flex-row">
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
                        )}, ${firstLetterToUpperCase(
                            enterpriseDetails.distrito
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
                        content={enterpriseDetails.mype ? "Sí" : "No"}
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
