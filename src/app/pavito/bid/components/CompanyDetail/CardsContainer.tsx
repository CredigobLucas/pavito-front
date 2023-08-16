import { Box } from "@mui/material";

interface CardsContainerProps {
    children: React.ReactNode;
    component?: React.ElementType;
    className?: string;
    mobileMode?: boolean;
}

export const CardsContainer = ({
    children,
    component = "div",
    className = "",
    mobileMode = false
}: CardsContainerProps): JSX.Element => {
    return (
        <Box
            component={component}
            className={`grid gap-4 ${
                mobileMode
                    ? "grid-cols-1"
                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            } ${className}`}
        >
            {children}
        </Box>
    );
};
