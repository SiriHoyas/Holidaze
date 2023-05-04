import "./fonts.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Router from "./Router/Router.jsx";
import { theme } from "./theme";
import { useEffect } from "react";

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
