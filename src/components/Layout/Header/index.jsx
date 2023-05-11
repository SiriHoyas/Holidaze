import { AppBar, Slide, Toolbar, useScrollTrigger } from "@mui/material";
import { set } from "date-fns";
import { useState } from "react";

import LogoHorizontal from "../../../assets/brand/LogoHorizontal";
import MenuIcon from "../../../assets/icons/MenuIcon";

function Header() {
  const trigger = useScrollTrigger();

  return (
    <AppBar elevation={trigger ? 1 : 0} sx={{ backgroundColor: trigger ? "white" : "transparent", transition: "background-color 200ms ease-in" }}>
      <Toolbar sx={{ justifyContent: "space-between", display: "flex" }}>
        <LogoHorizontal />
        <MenuIcon />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
