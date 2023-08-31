import { Box, Button } from "@mui/material"

interface ButtonsProps {
    saveFiltersAsPreset: () => void
}

export const Buttons = ({
    saveFiltersAsPreset
}: ButtonsProps): JSX.Element => {
    return (
        <Box className="p-4 w-full flex items-center justify-end">
            <Button
                variant="outlined"
                className="capitalize font-semibold py-2 mr-4"
                type="button"
                onClick={saveFiltersAsPreset}
            >
                Predeterminado
            </Button>
            <Button
                variant="contained"
                className="capitalize font-semibold py-2"
                type="submit"
            >
                Buscar
            </Button>
        </Box>
    )
}