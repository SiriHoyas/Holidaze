import { Button, Grid } from "@mui/material";
import { is } from "date-fns/locale";

import GuestCountPicker from "../components/GuestCountPicker/GuestCountPicker";
import Search from "../components/Search";
import VenueCard from "../components/VenueCard";
import UseApi from "../hooks/useApi";
import { API_ROOT } from "../js/constants";

function Venues() {
  const isFromSearch = false;

  const { data } = UseApi(`${API_ROOT}/venues`, { method: "GET" });
  console.log(data);

  if (isFromSearch) {
    return (
      <Grid container item={true}>
        <Grid container item={true}>
          <Search />
        </Grid>
        <Grid container direction="column" item={true}>
          <Button variant="outlined">68 results</Button>
          VENUES
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container item={true} xs={11} md={10}>
      <Grid container item={true}>
        <Search />
      </Grid>
      <Grid container direction="column" item={true}>
        {data.map((venue) => {
          return <VenueCard id={venue.id} img={venue.media[0]} name={venue.name} description={venue.description} />;
        })}
      </Grid>
    </Grid>
  );
}

export default Venues;
