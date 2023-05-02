import { Grid, Typography } from "@mui/material";

import CardGallery from "../components/CardGallery";
import Search from "../components/Search";
import UseApi from "../hooks/UseApi";
import VenueCard from "../components/VenueCard";

function HomePage() {
  const { data } = UseApi("https://api.noroff.dev/api/v1/holidaze/venues", { method: "GET" });

  let recommendedData = [];
  let allowPetsData = [];

  const filterByMedia = data.filter((item) => {
    if (item.media.length > 0) {
      return item;
    }
  });

  for (let i = 0; i < filterByMedia.length; i++) {
    if (i <= 3) {
      recommendedData.push(filterByMedia[i]);
    }
  }

  const filterByPets = data.filter((item) => {
    if (item.meta.pets) {
      return item;
    }
  });

  for (let i = 0; i < filterByPets.length; i++) {
    if (i <= 3) {
      allowPetsData.push(filterByPets[i]);
    }
  }

  return (
    <>
      <Search />
      <CardGallery heading="Recommended" data={recommendedData} />
      <Grid container direction={"column"} rowGap={5}>
        <Typography variant="h5">Bring your furry friends</Typography>
        {allowPetsData.map((venue) => {
          return <VenueCard key={venue.id} id={venue.id} name={venue.name} description={venue.description} img={venue.media[0]} />;
        })}
      </Grid>
    </>
  );
}

export default HomePage;
