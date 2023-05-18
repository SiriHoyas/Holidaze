import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <Grid sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Grid sx={{ flexGrow: 1 }}>
        <Outlet />
      </Grid>
      <Footer />
    </Grid>
  );
}

export default Layout;
