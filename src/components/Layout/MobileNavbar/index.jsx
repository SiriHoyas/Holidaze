import { LoginOutlined, LogoutOutlined, PersonAdd } from "@mui/icons-material";
import { AppBar, Avatar, Box, Button, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Paper, Toolbar, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import LogoHorizontal from "../../../assets/brand/LogoHorizontal";
import LogoInverted from "../../../assets/brand/LogoInverted";
import CloseIcon from "../../../assets/icons/CloseIcon";
import HomeIcon from "../../../assets/icons/HomeIcon";
import MenuIcon from "../../../assets/icons/MenuIcon";
import VenueIcon from "../../../assets/icons/VenueIcon";
import useOutsideClick from "../../../hooks/useOutsideClick";
import getAuth from "../../../js/getAuth";

const slideVariants = {
  open: { x: 0, transition: { duration: 0.2 } },
  closed: { x: "100%", transition: { duration: 0.2 } },
};

function MobileNavbar({ userName, avatar }) {
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = getAuth();
  const navigate = useNavigate();

  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });
  function handleLogout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    navigate("/");
  }
  return (
    <AppBar elevation={1} sx={{ backgroundColor: isOpen ? "primary.dark" : "rgba(255, 255, 255, 0.95)", transition: "background-color 200ms ease-in-out" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid component={NavLink} to={"/"} item sx={{ width: "33%", display: "flex", justifyContent: "center" }}>
          {isOpen ? <LogoInverted /> : <LogoHorizontal />}
        </Grid>
        <IconButton
          disableRipple={true}
          sx={{ p: 0, display: "flex" }}
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
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  component={Link}
                  to="/"
                  startIcon={<HomeIcon />}
                  fullWidth
                  sx={{ fontSize: "1.3rem", borderRadius: 0, justifyContent: "start" }}
                >
                  Home
                </Button>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  component={Link}
                  to="venues"
                  startIcon={<VenueIcon />}
                  fullWidth
                  sx={{ fontSize: "1.3rem", borderRadius: 0, justifyContent: "start" }}
                >
                  Venues
                </Button>
              </Grid>
              <Divider sx={{ mt: "1.5rem", mb: "1.5rem" }} />
              <Grid>
                {isLoggedIn && (
                  <Grid container sx={{ mb: "1rem" }}>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      component={Link}
                      to="profile"
                      startIcon={<Avatar sx={{ width: "25px", height: "25px", mr: "1rem" }} alt={userName} src={avatar} />}
                      fullWidth
                      sx={{ fontSize: "1rem", borderRadius: 0, justifyContent: "start" }}
                    >
                      Profile
                    </Button>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      startIcon={<LogoutOutlined sx={{ width: "25px", height: "25px", mr: "1rem" }} />}
                      to="venues"
                      fullWidth
                      sx={{ fontSize: "1rem", borderRadius: 0, justifyContent: "start" }}
                    >
                      Log out
                    </Button>
                  </Grid>
                )}
                {!isLoggedIn && (
                  <Grid container sx={{ mb: "1rem" }}>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      component={Link}
                      to="login"
                      startIcon={<LoginOutlined />}
                      fullWidth
                      sx={{ fontSize: "1rem", borderRadius: 0, justifyContent: "start" }}
                    >
                      Log in
                    </Button>
                    <Button
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      component={Link}
                      to="register"
                      startIcon={<PersonAdd />}
                      fullWidth
                      sx={{ fontSize: "1rem", borderRadius: 0, justifyContent: "start" }}
                    >
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

export default MobileNavbar;
