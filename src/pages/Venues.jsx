import { Grid } from "@mui/material";
import GuestCountPicker from "../components/GuestCountPicker/GuestCountPicker";

function Venues() {
  const comingFromSearch = true;
  if (comingFromSearch) {
    console.log("wee");
  }
  return (
    <>
      <Grid container rowGap={2} direction={"row"} xs={12} sx={{ mt: "6rem" }} item={true}>
        <GuestCountPicker />
      </Grid>
    </>
  );
}

export default Venues;
