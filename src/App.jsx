import "./fonts.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Router from "./Router/Router.jsx";
import { useEffect } from "react";

const theme = createTheme({
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
  useEffect(() => {
    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  });

  const dispatch = useDispatch();
  const { userName } = useSelector((store) => store.user);

  function updateUserInfo(user) {
    dispatch(setUserInfo(user));
  }

  function handleRefresh() {
    localStorage.setItem("Wee", "weee");
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
