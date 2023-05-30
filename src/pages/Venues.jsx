import { CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import banner from "./../assets/brand/bannerVenues.avif";
import ErrorMessage from "../components/ErrorMessage";
import Search from "../components/Search";
import VenueCard from "../components/VenueCard";
import { fetchVenues, hasSetDateRange, searchVenues } from "../js/search";

function Venues() {
  const searchParams = useSelector((state) => state.searchParams);
  const [venues, setVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getVenues() {
      try {
        setIsLoading(true);
        setIsError(false);
        setVenues([]);
        const venues = hasSetDateRange(searchParams) ? await searchVenues(searchParams) : await fetchVenues(0);
        setVenues(venues);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getVenues();
  }, [searchParams]);

  if (venues) {
    return (
      <Grid container xs={12} lg={12} rowGap={2} direction={"column"} sx={{ m: "0 auto", mb: "6rem" }} item={true}>
        <Grid container direction="column" xs={11} sm={9} xl={7} sx={{ height: "fit-content", backgroundImage: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: { xs: "500%", md: "cover" }, backgroundPosition: "top", pt: { xs: "8rem", lg: "10rem" } }} item={true}>
          <Grid container justifyContent={"center"}>
            <Grid item={true} container direction="column" xs={11} sm={9} alignSelf="center">
              <Typography gutterBottom variant="h1" sx={{ color: "text.secondary", mb: "6rem" }} align="center">
                Let the adventure begin
              </Typography>
              <Grid item xs={11} sm={9} sx={{ boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.34);", backgroundColor: "white", p: "1rem", borderRadius: "6px", position: "relative", transform: "translateY(40px)" }}>
                <Search />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container rowGap={4} sx={{ m: "0 auto", mt: "6rem", width: "100%" }}>
          <Grid item xs={11} sm={9} sx={{ m: "0 auto" }}>
            {venues.length > 0 && (
              <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: ".7rem" }}>
                Showing {venues.length} venues
              </Typography>
            )}
            <Grid container spacing={4}>
              {isLoading && (
                <Grid container justifyContent={"center"} sx={{ mt: "4rem" }}>
                  <CircularProgress />
                </Grid>
              )}
              {isError && <ErrorMessage />}

              {venues.map((venue) => {
                return (
                  <Grid item key={venue.id} xs={12} sm={6} md={4}>
                    <VenueCard data={venue} path={venue.id} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Venues;
