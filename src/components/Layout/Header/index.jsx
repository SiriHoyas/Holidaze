import { LoginOutlined, LogoutOutlined, PersonAdd } from "@mui/icons-material";
import { AppBar, Avatar, Button, ButtonBase, Divider, Grid, IconButton, Paper, Slide, Toolbar, Typography, useMediaQuery, useScrollTrigger } from "@mui/material";
import { set } from "date-fns";
import { is } from "date-fns/locale";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "styled-components";

import LogoGray from "../../../assets/brand/LogoGray";
import LogoHorizontal from "../../../assets/brand/LogoHorizontal";
import LogoInverted from "../../../assets/brand/LogoInverted";
import CloseIcon from "../../../assets/icons/CloseIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import MenuIcon from "../../../assets/icons/MenuIcon";
import VenueIcon from "../../../assets/icons/VenueIcon";
import useOutsideClick from "../../../hooks/useOutsideClick";
import MobileNavbar from "../MobileNavbar";
import NavbarActions from "../NavbarActions";

function Header() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  const isMobileScreen = useMediaQuery("(max-width: 1024px)");

  const { userName, avatar } = useSelector((store) => {
    return store.user;
  });

  let isLoggedIn = false;
  if (userName !== null) {
    isLoggedIn = true;
  }

  if (isMobileScreen) {
    return <MobileNavbar isLoggedIn={isLoggedIn} userName={userName} avatar={avatar} />;
  }

  return (
    <AppBar elevation={trigger ? 1 : 0} sx={{ px: "1rem", backgroundColor: trigger ? "rgba(255, 255, 255, 0.95)" : "transparent", transition: "background-color 200ms ease-in" }}>
      <Toolbar sx={{ justifyContent: "space-between", display: "flex" }}>
        <Grid component={NavLink} to={"/"} item sx={{ width: "33%", display: "flex" }}>
          <LogoHorizontal />
        </Grid>
        <Grid container justifyContent={"center"} columnGap={4}>
          <Grid item sx={{ display: "flex", alignItems: "baseline" }}>
            <HomeIcon />
            <Typography variant="h6" sx={{ ml: ".4rem", textDecoration: "none", color: "primary.dark" }} component={NavLink} to="/">
              HOME
            </Typography>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "baseline" }}>
            <VenueIcon />
            <Typography variant="h6" sx={{ ml: ".4rem", textDecoration: "none", color: "primary.dark" }} component={NavLink} to="venues">
              VENUES
            </Typography>
          </Grid>
        </Grid>
        <NavbarActions />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
