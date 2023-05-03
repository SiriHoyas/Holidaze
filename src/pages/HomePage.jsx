import { CircularProgress, Grid, Skeleton, Typography, useMediaQuery } from "@mui/material";

import CardGallery from "../components/CardGallery";
import HorizontalCardList from "../components/HorizontalCardList/HorizontalCardList";
import Search from "../components/Search";
import UseApi from "../hooks/UseApi";
import VenueCard from "../components/VenueCard";
import { useTheme } from "@mui/material/styles";

function HomePage() {
  const { data, isLoading, isError } = UseApi("https://api.noroff.dev/api/v1/holidaze/venues", { method: "GET" });

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));

  let recommendedData = [];
  let allowPetsData = [];

  const filterByMedia = data.filter((item) => {
    if (item.media.length > 0) {
      return item;
    }
  });

  for (let i = 0; i < filterByMedia.length; i++) {
    if (i <= 3 && smScreen) {
      recommendedData.push(filterByMedia[i]);
    }
    if (i <= 9 && !smScreen) {
      recommendedData.push(filterByMedia[i]);
    }
  }

  const filterByPets = data.filter((item) => {
    if (item.meta.pets) {
      return item;
    }
  });

  for (let i = 0; i < filterByPets.length; i++) {
    if (i <= 3 && smScreen) {
      allowPetsData.push(filterByPets[i]);
    }
    if (i <= 9 && !smScreen) {
      allowPetsData.push(filterByPets[i]);
    }
  }

  if (smScreen) {
    return (
      <Grid container sm={9} sx={{ margin: "0 auto" }}>
        <Search />
        {data && (
          <Grid container>
            <CardGallery heading="Recommended" data={recommendedData} />
            <Grid container direction={"column"} rowGap={5}>
              <Typography variant="h5">Bring your furry friends</Typography>
              {allowPetsData.map((venue) => {
                return <VenueCard key={venue.id} id={venue.id} name={venue.name} description={venue.description} img={venue.media[0]} />;
              })}
            </Grid>
          </Grid>
        )}
        {isLoading && (
          <Grid container>
            <Skeleton variant="rectangular" width={210} height={118} />
          </Grid>
        )}
        {isError && <Grid>ERROR</Grid>}
      </Grid>
    );
  }

  return (
    <Grid container xs={11} sx={{ margin: "0 auto" }}>
      <Search />
      <HorizontalCardList data={recommendedData} heading={"Recommended"} />
      <HorizontalCardList data={allowPetsData} heading={"Bring your furry friends!"} />
    </Grid>
  );
}

export default HomePage;
