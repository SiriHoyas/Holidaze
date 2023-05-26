import { LogoutOutlined } from "@mui/icons-material";
import { Avatar, Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import LikeIcon from "../../../assets/icons/LikeIcon";
import ProfileIcon from "../../../assets/icons/ProfileIcon";
import getAuth from "../../../js/getAuth";

function NavbarActions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = getAuth();

  const { userName, avatar } = useSelector((store) => {
    return store.user;
  });

  function handleLogout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
    navigate("/");
  }

  return (
    <Grid container columnGap={1} sx={{ justifyContent: "flex-end", width: "33%" }}>
      <IconButton component={Link} to="/profile?favourites=true">
        <LikeIcon />
      </IconButton>
      <IconButton id="basic-button" aria-controls={open ? "basic-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
        <ProfileIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {isLoggedIn && (
          <Grid>
            <MenuItem component={Link} to={"profile"} onClick={handleClose}>
              <Avatar sx={{ width: "25px", height: "25px", mr: "1rem" }} alt={userName} src={avatar} /> Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutOutlined sx={{ width: "25px", height: "25px", mr: "1rem" }} /> Log out
            </MenuItem>
          </Grid>
        )}
        {!isLoggedIn && (
          <Grid>
            <MenuItem component={Link} to={"login"} onClick={handleClose}>
              Log in
            </MenuItem>
            <MenuItem component={Link} to={"register"} onClick={handleClose}>
              Register account
            </MenuItem>
          </Grid>
        )}
      </Menu>
    </Grid>
  );
}

export default NavbarActions;
