import { Grid } from "@mui/material";
import GuestCountPicker from "../components/GuestCountPicker/GuestCountPicker";
import VenueCard from "../components/VenueCard";

function Venues() {
  return (
    <>
      <Grid container rowGap={2} direction={"row"} xs={12} sx={{ mt: "6rem" }} item={true}>
        <GuestCountPicker />
      </Grid>
    </>
  );
}

export default Venues;
