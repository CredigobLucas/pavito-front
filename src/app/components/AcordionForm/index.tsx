import {
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface AccordionFormProps {
    children: React.ReactNode;
    label: string;
    theme: string;
}
export const AccordionForm = ({
    children,
    label,
    theme
}: AccordionFormProps) => {
    return (
        <Accordion
            elevation={3}
            sx={{
                boxShadow: "none"
            }}
            className="w-full"
        >
            <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography
                    className="font-semibold"
                    color={theme === "dark" ? "#cdc9c9" : "#444"}
                >
                    {label}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};
