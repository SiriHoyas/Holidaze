import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

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
      <Grid container xs={11} lg={8} rowGap={2} direction={"column"} sx={{ m: "0 auto", mt: "6rem", mb: "6rem" }} item={true}>
        <Link to={"/"}>Back</Link>
        <Search />
        <Divider />
        <Grid container spacing={2}>
          {venues.map((venue) => {
            return <VenueCard key={venue.id} data={venue} path={venue.id} />;
          })}
        </Grid>
      </Grid>
    );
  }
}

export default Venues;
