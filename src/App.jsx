import "./fonts.css";

import { ThemeProvider, createTheme } from "@mui/material";

import Router from "./Router/Router.jsx";

const theme = createTheme({
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
  typography: {
    fontFamily: "'Nunito', sans-serif",
    h1: {
      fontFamily: "'Comfortaa', cursive",
      fontWeight: "700",
    },
    h2: {
      fontFamily: "'Comfortaa', cursive",
      fontWeight: "700",
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
      fontWeight: "100",
      textTransform: "none",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
