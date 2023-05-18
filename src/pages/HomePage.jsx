import { Box, Grid, ImageListItem, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

import banner from "./../assets/brand/banner.png";
import CardGallery from "../components/CardGallery";
import HorizontalCardList from "../components/HorizontalCardList/HorizontalCardList";
import MetaIcons from "../components/MetaIcons";
import Search from "../components/Search";
import VenueCard from "../components/VenueCard";
import useApi from "../hooks/UseApi";
import { API_ROOT } from "../js/constants";

function HomePage() {
  const { data, isLoading, isError } = useApi(`${API_ROOT}/venues?sortOrder=asc&sort=created`, { method: "GET" });

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));

  let recommendedData = [];
  let allowPetsData = [];

  if (data && data.length && data.name != "") {
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
      if (i <= 8 && smScreen) {
        allowPetsData.push(filterByPets[i]);
      }
      if (i <= 9 && !smScreen) {
        allowPetsData.push(filterByPets[i]);
      }
    }

    if (smScreen) {
      return (
        <Grid container direction={"column"} sx={{ m: "0 auto" }}>
          <Grid container direction="column" xs={9} sx={{ backgroundImage: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "bottom", pt: { sm: "6rem", lg: "10rem" } }} item={true}>
            <Grid container direction="column" xs={9} alignSelf="center">
              <Typography gutterBottom variant="h1" sx={{ color: "text.secondary" }} align="center">
                We've got your next great adventure!
              </Typography>
              <Typography variant="h2" sx={{ mb: "6rem", color: "text.disabled" }} align="center">
                Explore countless of unforgettable accommodations on Holidaze
              </Typography>
              <Grid item sm={6} sx={{ boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.34);", backgroundColor: "white", p: "1rem", borderRadius: "6px", position: "relative", transform: "translateY(40px)" }}>
                <Search params="true" />
              </Grid>
            </Grid>
          </Grid>
          <Grid container sm={9} sx={{ m: "0 auto", mt: "6rem" }} item={true}>
            {data && (
              <Grid container sm={9} sx={{ m: "0 auto", mt: "1rem" }} item={true}>
                <Grid item xs={12}>
                  <Typography variant="h5" sx={{ mb: "1rem" }}>
                    Explore our top picks
                  </Typography>
                  <Carousel indicators={false} duration={500} autoPlay={true} height={"500px"}>
                    {recommendedData.map((item) => (
                      <Grid key={item.id} item sx={{ height: "100%", display: "flex" }}>
                        <ImageListItem component={Link} to={`/venues/${item.id}`} key={item.id} sx={{ width: "100%" }}>
                          <Box sx={{ width: "100%", height: "25%", p: "1rem", boxShadow: "0", backgroundColor: "#0000009f", zIndex: "100", position: "absolute", bottom: "0" }}>
                            <Typography variant="h5" sx={{ color: "white" }}>
                              {item.name}
                            </Typography>
                            <Typography gutterBottom variant="body2" noWrap sx={{ color: "white", width: "50%" }}>
                              {item.description}
                            </Typography>
                            <MetaIcons metaData={item.meta} />
                          </Box>
                          <img src={`${item.media[0]}`} alt={item.name} loading="lazy" />
                        </ImageListItem>
                      </Grid>
                    ))}
                  </Carousel>
                </Grid>
                <CardGallery heading="Recommended" data={recommendedData} />
                <Typography variant="h5" sx={{ mt: "4rem", mb: "1rem" }}>
                  Bring your furry friends!
                </Typography>
                <Grid container spacing={6}>
                  {allowPetsData.map((venue) => {
                    return <VenueCard key={venue.id} data={venue} path={`venues/${venue.id}`} />;
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
        </Grid>
      );
    }

    return (
      <Grid container xs={11} sx={{ margin: "0 auto", mt: "6rem" }} item={true}>
        <Search params="true" />
        <HorizontalCardList data={recommendedData} heading={"Recommended"} />
        <HorizontalCardList data={allowPetsData} heading={"Bring your furry friends!"} />
      </Grid>
    );
  }
}

export default HomePage;
