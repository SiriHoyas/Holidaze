import { LoginOutlined, LogoutOutlined, PersonAdd } from "@mui/icons-material";
import { AppBar, Avatar, Button, ButtonBase, Divider, Grid, IconButton, Paper, Slide, Toolbar, Typography, useMediaQuery, useScrollTrigger } from "@mui/material";
import { set } from "date-fns";
import { is } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
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
import NavbarActions from "../NavbarActions";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });

  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });
  const theme = useTheme();

  const isMobileScreen = useMediaQuery("(max-width: 1024px)");

  const { userName, avatar } = useSelector((store) => {
    return store.user;
  });

  let isLoggedIn = false;
  if (userName !== null) {
    isLoggedIn = true;
  }
  function handleLogout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    navigate("/");
  }

  const slideVariants = {
    open: { x: 0, transition: { duration: 0.2 } },
    closed: { x: "100%", transition: { duration: 0.2 } },
  };

  if (isMobileScreen) {
    return (
      <AppBar elevation={1} sx={{ backgroundColor: isOpen ? "primary.dark" : "rgba(255, 255, 255, 0.95)", transition: "background-color 200ms ease-in-out" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid component={NavLink} to={"/"} item sx={{ width: "33%", display: "flex", justifyContent: "center" }}>
            {isOpen ? <LogoInverted /> : <LogoHorizontal />}
          </Grid>
          <IconButton
            disableRipple={true}
            sx={{ width: "40px" }}
            onClick={() => {
              setIsOpen((prev) => !prev);
            }}
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={slideVariants}
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                zIndex: 1,
              }}
            >
              <Paper
                elevation={4}
                square
                ref={ref}
                sx={{
                  p: "1rem",
                  backgroundColor: "white",
                  position: "relative",
                  top: "100%",
                  width: "100%",
                }}
              >
                <Grid container rowGap={1} component={"nav"}>
                  <Button component={Link} to="/" startIcon={<HomeIcon />} fullWidth sx={{ fontSize: "1.3rem", borderRadius: 0, justifyContent: "start" }}>
                    Home
                  </Button>
                  <Button component={Link} to="venues" startIcon={<VenueIcon />} fullWidth sx={{ fontSize: "1.3rem", borderRadius: 0, justifyContent: "start" }}>
                    Venues
                  </Button>
                </Grid>
                <Divider sx={{ mt: "1.5rem", mb: "1.5rem" }} />
                <Grid>
                  {isLoggedIn && (
                    <Grid container sx={{ mb: "1rem" }}>
                      <Button component={Link} to="venues" startIcon={<Avatar sx={{ width: "25px", height: "25px", mr: "1rem" }} alt={userName} src={avatar} />} fullWidth sx={{ fontSize: "1rem", borderRadius: 0, justifyContent: "start" }}>
                        Profile
                      </Button>
                      <Button onClick={handleLogout} startIcon={<LogoutOutlined sx={{ width: "25px", height: "25px", mr: "1rem" }} />} to="venues" fullWidth sx={{ fontSize: "1rem", borderRadius: 0, justifyContent: "start" }}>
                        Log out
                      </Button>
                    </Grid>
                  )}
                  {!isLoggedIn && (
                    <Grid container sx={{ mb: "1rem" }}>
                      <Button component={Link} to="login" startIcon={<LoginOutlined />} fullWidth sx={{ fontSize: "1rem", borderRadius: 0, justifyContent: "start" }}>
                        Log in
                      </Button>
                      <Button component={Link} to="register" startIcon={<PersonAdd />} fullWidth sx={{ fontSize: "1rem", borderRadius: 0, justifyContent: "start" }}>
                        Register account
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </AppBar>
    );
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
{
  /* <Avatar sx={{ width: "30px", height: "30px" }} alt={`profile picture of ${userName}`} src={avatar} /> */
}
