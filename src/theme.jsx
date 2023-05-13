import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {},
      },
    },
  },
  palette: {
    common: {
      white: "#FCFCFC",
    },
    primary: {
      main: "#1A488E",
      light: "#385E97",
      dark: "#113264",
      contrastText: "#FCFCFC",
    },
    secondary: {
      main: "#F7B115",
      light: "#FFD169",
      dark: "#CF9515",
      contrastText: "#FCFCFC",
    },
    text: {
      primary: "#113264",
    },
    background: {
      paper: "#FCFCFC",
      default: "#FCFCFC",
    },
  },
  shadows: {
    0: "none",
    1: "0px 1px 15px -11px rgba(0,0,0,0.51);",
  },
  typography: {
    fontFamily: "'Nunito', sans-serif",
    h1: {
      fontFamily: "'Comfortaa', cursive",
      fontWeight: "700",
      fontSize: "2rem",
    },
    h2: {
      fontFamily: "'Comfortaa', cursive",
      fontWeight: "700",
      fontSize: "1rem",
    },
    h3: {
      fontFamily: "'Comfortaa', cursive",
      fontWeight: "500",
    },
    body1: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: "500",
    },
    button: {
      fontFamily: "'Comfortaa', cursive",
      fontWeight: "500",
      textTransform: "none",
    },
  },
});
