import { Box } from "@mui/material";

interface CardsContainerProps {
    children: React.ReactNode;
    component?: React.ElementType;
    className?: string;
}

export const CardsContainer = ({
    children,
    component = "div",
    className = ""
}: CardsContainerProps): JSX.Element => {
    return (
        <Box
            component={component}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
        >
            {children}
        </Box>
    );
};
