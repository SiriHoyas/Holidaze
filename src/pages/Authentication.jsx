import Button from "../components/UI/Button";
import { Grid } from "@mui/material";
import LogoVertical from "../components/UI/brand/LogoVertical";
import { Outlet } from "react-router-dom";

function Authentication() {
  return (
    <>
      <Grid container xs={11} direction={{ xs: "column", md: "row" }} sx={{ mt: "4rem" }}>
        <Grid item md={6}>
          <LogoVertical />
        </Grid>
        <Grid item md={6}>
          <Button label="Login" fullWidth sx={{ mb: ".5rem" }} link={"/login"} />
          <Button label="Register Account" fullWidth link={"/register"} />
        </Grid>
      </Grid>
    </>
  );
}

export default Authentication;
