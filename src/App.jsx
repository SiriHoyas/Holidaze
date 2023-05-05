import "./fonts.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { API_ROOT } from "./js/constants";
import Router from "./Router/Router.jsx";
import { setUserInfo } from "./store/UserSlice";
import { theme } from "./theme";

function App() {
  useEffect(() => {
    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  });

  const dispatch = useDispatch();

  const userName = localStorage.getItem("userName");
  const accessToken = localStorage.getItem("accessToken");
  console.log(userName);

  async function getUserInfo() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      const response = await fetch(`${API_ROOT}/profiles/${userName}`, options);

      if (response.ok) {
        const json = await response.json();

        const userInfo = {
          userName: userName,
          email: json.email,
          avatar: json.avatar,
          venueManager: json.venueManager,
        };
        dispatch(setUserInfo(userInfo));
      }
    } catch (error) {}
  }

  getUserInfo();

  function handleRefresh() {
    getUserInfo();
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
