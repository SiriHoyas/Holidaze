import { Grid } from "@mui/material";
import VenueCard from "../components/VenueCard";

function Venues() {
  return (
    <>
      <Grid container rowGap={2} direction={"row"} xs={12} sx={{ mt: "6rem" }}>
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
        <VenueCard />
      </Grid>
    </>
  );
}

export default Venues;
