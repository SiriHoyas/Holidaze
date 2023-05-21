import { Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";

import Search from "../components/Search";
import VenueCard from "../components/VenueCard";
import { searchVenues } from "../js/search";

function Venues() {
  const searchParams = useSelector((state) => state.searchParams);
  const [searchResults, setSearchResults] = useState();
  const [isFromSearch, setIsFromSearch] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();
  const search = queryParams.get("search");

  useEffect(() => {
    async function getVenues() {
      const venues = await searchVenues(searchParams);
      setSearchResults(venues);
    }

    getVenues();
  }, [searchParams]);

  if (searchResults) {
    return (
      <Grid container xs={11} lg={8} rowGap={2} direction={"column"} sx={{ m: "0 auto", mt: "6rem", mb: "6rem" }} item={true}>
        <Link to={"/"}>Back</Link>
        <Search />
        <Divider />
        <Grid container spacing={2}>
          {search &&
            searchResults.map((venue) => {
              return <VenueCard data={venue} path={venue.id} />;
            })}
          {!search && <>IKKE FRA SØK</>}
        </Grid>
      </Grid>
    );
  }
}

export default Venues;
