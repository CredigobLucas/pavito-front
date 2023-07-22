import { createTheme } from "@mui/material/styles";
export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "rgb(84, 72, 146)"
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    borderRadius: "0px"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "15px"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "15px",
                    padding: "15px 20px"
                }
            }
        }
    }
});
