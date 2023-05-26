import { Grid, Skeleton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import banner from "./../assets/brand/banner.png";
import CardGallery from "../components/CardGallery";
import HeroCarousel from "../components/HeroCarousel";
import HorizontalCardList from "../components/HorizontalCardList/HorizontalCardList";
import Search from "../components/Search";
import VenueCard from "../components/VenueCard";
import useApi from "../hooks/useApi";
import { API_ROOT } from "../js/constants";
import getFeaturedVenues from "../js/getFeaturedVenues";

function HomePage() {
  const { data, isLoading, isError } = useApi(`${API_ROOT}/venues?sortOrder=desc&sort=created`, { method: "GET" });
  const theme = useTheme();
  const largerScreen = useMediaQuery(theme.breakpoints.up("sm"));

  if (data) {
    const { recommendedData, allowPetsData } = getFeaturedVenues(data, largerScreen);

    if (largerScreen) {
      return (
        <Grid container direction={"column"} sx={{ m: "0 auto" }}>
          <Grid container direction="column" xs={9} sx={{ height: "fit-content", backgroundImage: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "bottom", pt: { sm: "6rem", lg: "10rem" } }} item={true}>
            <Grid container justifyContent={"center"}>
              <Grid item={true} container direction="column" xs={9} alignSelf="center">
                <Typography gutterBottom variant="h1" sx={{ color: "text.secondary" }} align="center">
                  We've got your next great adventure!
                </Typography>
                <Typography variant="h2" sx={{ mb: "6rem", color: "text.disabled" }} align="center">
                  Explore countless of unforgettable accommodations on Holidaze
                </Typography>
                <Grid item sm={6} sx={{ boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.34);", backgroundColor: "white", p: "1rem", borderRadius: "6px", position: "relative", transform: "translateY(40px)" }}>
                  <Search params="true" navigation={true} />
                </Grid>
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
                  <HeroCarousel recommendedData={recommendedData} />
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
        <Search params="true" navigate={true} />
        <Grid container sx={{ mt: "4rem" }}>
          <HorizontalCardList data={recommendedData} heading={"Recommended"} />
        </Grid>
        <Typography variant="h6" sx={{ mt: "4rem", mb: "1rem" }}>
          Bring your furry friends!
        </Typography>
        <Grid container rowGap={4} sx={{ mb: "6rem" }}>
          {allowPetsData.map((venue) => {
            return (
              <Grid item key={venue.id} xs={12}>
                <VenueCard data={venue} path={`venues/${venue.id}`} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }
}

export default HomePage;
