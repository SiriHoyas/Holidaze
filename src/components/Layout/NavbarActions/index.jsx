import { Button, Grid, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

import LikeIcon from "../../../assets/icons/LikeIcon";
import ProfileIcon from "../../../assets/icons/ProfileIcon";

function NavbarActions() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = anchorEl;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isLoggedIn = false;

  function handleLogout() {
    localStorage.removeItem("userName");
    localStorage.removeItem("accessToken");
  }

  return (
    <Grid container columnGap={1} sx={{ justifyContent: "flex-end", width: "33%" }}>
      <IconButton>
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
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Grid>
        )}
        {!isLoggedIn && (
          <Grid>
            <MenuItem onClick={handleClose}>Log in</MenuItem>
            <MenuItem onClick={handleLogout}>Register account</MenuItem>
          </Grid>
        )}
      </Menu>
    </Grid>
  );
}

export default NavbarActions;
