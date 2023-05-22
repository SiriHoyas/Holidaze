import { Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

import banner from "./../assets/brand/bannerVenues.avif";
import Search from "../components/Search";
import VenueCard from "../components/VenueCard";
import { fetchVenues, hasSetDateRange, searchVenues } from "../js/search";

function Venues() {
  const searchParams = useSelector((state) => state.searchParams);
  const [venues, setVenues] = useState([]);
  const [isFromSearch, setIsFromSearch] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    async function getVenues() {
      const venues = hasSetDateRange(searchParams) ? await searchVenues(searchParams) : await fetchVenues(0);
      setVenues(venues);
    }

    getVenues();
  }, [searchParams]);

  if (venues) {
    return (
      <Grid container xs={12} lg={12} rowGap={2} direction={"column"} sx={{ m: "0 auto", mb: "6rem" }} item={true}>
        <Grid container direction="column" xs={11} lg={9} xl={7} sx={{ height: "fit-content", backgroundImage: `url(${banner})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "top", pt: { sm: "6rem", lg: "10rem" } }} item={true}>
          <Grid container justifyContent={"center"}>
            <Grid item={true} container direction="column" xs={11} lg={9} xl={7} alignSelf="center">
              <Typography gutterBottom variant="h1" sx={{ color: "text.secondary" }} align="center">
                Something cool!
              </Typography>
              <Grid item xs={11} lg={9} xl={7} sx={{ boxShadow: "0px 1px 5px 0px rgba(0,0,0,0.34);", backgroundColor: "white", p: "1rem", borderRadius: "6px", position: "relative", transform: "translateY(40px)" }}>
                <Search params="true" navigation={true} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={11} lg={9} xl={7} rowGap={4} sx={{ m: "0 auto", mt: "6rem", width: "100%" }}>
          <Typography>25 results</Typography>
          <Grid container sx={{ m: "0 auto", width: "100%", justifyContent: "space-between", gap: "1rem" }}>
            {venues.map((venue) => {
              return (
                <Grid item key={venue.id} sx={{ width: "30%" }}>
                  <VenueCard data={venue} path={venue.id} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Venues;
