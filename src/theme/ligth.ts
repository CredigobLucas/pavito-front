import { createTheme } from "@mui/material/styles";
export const ligthTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "rgb(84, 72, 146)"
        }
    },
    // set primary color red
    // primary: {

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#f3f4f6"
                }
            }
        },
        // sett navbar background color
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#fff",
                    color: "#151d48",
                    borderRadius: "0px"
                }
            }
        },
        MuiTypography: {
            // h4
            styleOverrides: {
                h4: {
                    color: "#151d48"
                },
                h5: {
                    color: "#151d48"
                },
                h6: {
                    color: "#151d48"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "15px"
                }
            }
        }
    }
});
