import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

function ErrorPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid container item xs={11} lg={6} direction={"column"} alignItems={"center"} sx={{ m: "0 auto", mt: "10rem" }}>
      <Typography variant="h1" sx={{ mb: "2rem" }}>
        Oops!{" "}
      </Typography>
      <Typography gutterBottom variant="h2">
        This page seems to have gone on vacation.
      </Typography>
      <Typography sx={{ mb: "2rem" }} variant="h2">
        We couldn't find what you were looking for.
      </Typography>
      {/* <BrokenHouse size={isMobileScreen ? 100 : 400} /> */}
      <Grid container direction={{ xs: "column", md: "row" }} sx={{ mt: "2rem", mb: "3rem" }} justifyContent={"center"} columnGap={3} rowGap={1} item={true}>
        <Button sx={{ width: { xs: "100%", md: "30%" } }} label={"Go back"} onClick={() => navigate(-1)} shape={"square"} />
        <Button link="/venues" sx={{ width: { xs: "100%", md: "30%" } }} label={"Browse venues"} onClick={() => navigate(-1)} shape={"square"} />
      </Grid>
    </Grid>
  );
}

export default ErrorPage;
