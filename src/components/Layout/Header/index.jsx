import { AppBar, Toolbar } from "@mui/material";

import LogoHorizontal from "../../../assets/brand/LogoHorizontal";
import MenuIcon from "../../UI/icons/MenuIcon";

function Header() {
  return (
    <AppBar color="inherit">
      <Toolbar sx={{ justifyContent: "space-between", display: "flex" }}>
        <LogoHorizontal />
        <MenuIcon />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
