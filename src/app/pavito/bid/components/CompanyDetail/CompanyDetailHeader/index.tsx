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
        <Box className="flex justify-between mt-6" component={"div"}>
            <Box className="w-3/4">
                <Typography
                    variant={"h5"}
                    className="font-bold"
                    color={"primary"}
                >
                    {enterpriseDetails.razonSocial}
                </Typography>
                <CompanyDetailHeaderItem
                    title={"RUC:"}
                    content={enterpriseDetails.ruc}
                />
                <CompanyDetailHeaderItem
                    title={"Mype:"}
                    content={enterpriseDetails.mype ? "Sí" : "No"}
                />
            </Box>
            <Box>
                <CompanyDetailHeaderItem
                    title={"Ubicación:"}
                    content={`${firstLetterToUpperCase(
                        enterpriseDetails.departamento
                    )}, ${firstLetterToUpperCase(
                        enterpriseDetails.provincia
                    )}, ${firstLetterToUpperCase(enterpriseDetails.distrito)}`}
                />
            </Box>
        </Box>
    );
};
