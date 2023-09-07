import { Box, Button } from "@mui/material"

interface ButtonsProps {
    saveFiltersAsPreset: () => void
    setTotal: (total: number | undefined) => void
}

export const Buttons = ({
    saveFiltersAsPreset,
    setTotal
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
                onClick={(): void => {
                    setTotal(undefined)
                }}
            >
                Buscar
            </Button>
        </Box>
    )
}