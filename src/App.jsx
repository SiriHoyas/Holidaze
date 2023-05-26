import "./fonts.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { API_ROOT } from "./js/constants";
import getAuth from "./js/getAuth";
import getLocalStorage from "./js/getLocalStorage";
import Router from "./Router/Router.jsx";
import { setUserInfo } from "./store/UserSlice";
import { theme } from "./theme";

function App() {
  const isLoggedIn = getAuth();
  const dispatch = useDispatch();

  const { accessToken, userName } = getLocalStorage();
  /**
   * Checks if page is being reloaded.
   * App.jsx has a useEffect hook that listens for isReloading in dependancy array.
   * If the page is reloading, it fires a function (handleRefresh), that calls API to get user info.
   * The response from the API is being dispatched to the user slice in Redux Toolkit, and can be accessed sitewide.
   * @returns {boolean} Returns true if page is being reloaded
   */
  function isReloading() {
    performance.getEntriesByType("navigation")[0].type === "reload";
    if (isReload) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      handleRefresh();
    }
  }, [isReloading]);

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
