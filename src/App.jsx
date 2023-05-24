import "./fonts.css";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { ACCESS_TOKEN, API_ROOT, USER_NAME } from "./js/constants";
import getAuth from "./js/getAuth";
import Router from "./Router/Router.jsx";
import { setUserInfo } from "./store/UserSlice";
import { theme } from "./theme";

function App() {
  /**
   * eererer
   */
  const hasLoggedIn = getAuth();
  const isReloading = (() => {
    const isReload = performance.getEntriesByType("navigation")[0].type === "reload";
    if (isReload) {
      return true;
    } else {
      return false;
    }
  })();

  useEffect(() => {
    if (hasLoggedIn) {
      handleRefresh();
    }
  }, [isReloading]);

  const dispatch = useDispatch();

  async function getUserInfo() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    try {
      const response = await fetch(`${API_ROOT}/profiles/${USER_NAME}`, options);

      if (response.ok) {
        const json = await response.json();

        const userInfo = {
          userName: USER_NAME,
          email: json.email,
          avatar: json.avatar,
          venueManager: json.venueManager,
        };
        dispatch(setUserInfo(userInfo));
      }
    } catch (error) {}
  }

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
