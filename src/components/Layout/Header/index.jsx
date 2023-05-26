import { AppBar, Grid, Toolbar, Typography, useMediaQuery, useScrollTrigger } from "@mui/material";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import LogoHorizontal from "../../../assets/brand/LogoHorizontal";
import HomeIcon from "../../../assets/icons/HomeIcon";
import VenueIcon from "../../../assets/icons/VenueIcon";
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
