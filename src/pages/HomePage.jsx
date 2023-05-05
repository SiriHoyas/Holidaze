import { Box, Card, CircularProgress, Grid, IconButton, ImageListItem, ImageListItemBar, Paper, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import Carousel from "react-material-ui-carousel";

import CardGallery from "../components/CardGallery";
import HorizontalCardList from "../components/HorizontalCardList/HorizontalCardList";
import ImgCarousel from "../components/ImgCarousel";
import Search from "../components/Search";
import VenueCard from "../components/VenueCard";
import UseApi from "../hooks/UseApi";
import { API_ROOT } from "../js/constants";

function HomePage() {
  const { data, isLoading, isError } = UseApi(`${API_ROOT}/venues?sortOrder=asc`, { method: "GET" });

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
      <Grid container sm={9} sx={{ margin: "0 auto" }} item={true}>
        <Grid item sx={{ mt: "9rem" }} xs={12}>
          <Search />
        </Grid>
        {data && (
          <Grid container>
            <Grid item xs={12} sx={{ mt: "5rem" }}>
              <Carousel indicators={false} duration={500} autoPlay={true} height={"500px"}>
                {recommendedData.map((item) => (
                  <Grid key={item.id} item sx={{ height: "100%", display: "flex" }}>
                    <ImageListItem key={item.id} sx={{ width: "100%" }}>
                      <Box sx={{ width: "100%", height: "20%", p: "1rem", boxShadow: "0", backgroundColor: "#0000008f", zIndex: "100", position: "absolute", bottom: "0" }}>
                        <Typography sx={{ color: "white" }}>{item.name}</Typography>
                      </Box>
                      <img src={`${item.media[0]}`} alt={item.name} loading="lazy" />
                    </ImageListItem>
                  </Grid>
                ))}
              </Carousel>
            </Grid>
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
    <Grid container xs={11} sx={{ margin: "0 auto" }} item={true}>
      <Search />
      <HorizontalCardList data={recommendedData} heading={"Recommended"} />
      <HorizontalCardList data={allowPetsData} heading={"Bring your furry friends!"} />
    </Grid>
  );
}

export default HomePage;
