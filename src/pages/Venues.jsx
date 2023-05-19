import { Divider, Grid, Typography } from "@mui/material";
import { eachDayOfInterval, isBefore, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";

import Search from "../components/Search";
import VenueCard from "../components/VenueCard";
import { API_ROOT, MAX_SEARCH_OFFSET, VENUES_PER_BATCH, VENUES_RESULT_SIZE } from "../js/constants";

function Venues() {
  const searchParams = useSelector((state) => state.searchParams);
  const [searchResults, setSearchResults] = useState();
  const [isFromSearch, setIsFromSearch] = useState(false);
  const [queryParams, setQueryParams] = useSearchParams();
  const search = queryParams.get("search");

  useEffect(() => {
    async function getVenues(offset) {
      const result = await fetch(`${API_ROOT}/venues?_bookings=true&offset=${offset}&limit=${VENUES_PER_BATCH}`, {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      if (result.ok) {
        return await result.json();
      }
    }

    function filterVenues(venues, searchParams) {
      const { guestCount, pets, parking, wifi, breakfast, keyword, dateFrom, dateTo } = searchParams;
      return venues.filter((venue) => {
        if (venue.maxGuests < guestCount) return false;
        if (pets && !venue.meta.pets) return false;
        if (parking && !venue.meta.parking) return false;
        if (wifi && !venue.meta.wifi) return false;
        if (breakfast && !venue.meta.breakfast) return false;
        if (keyword.length > 0 && !venue.name.includes(keyword)) return false;
        return areDatesAvailable(venue.bookings, dateFrom, dateTo);
      });
    }
    function areDatesAvailable(bookings, requestedFrom, requestedTo) {
      const fromDate = new Date(requestedFrom);
      const toDate = new Date(requestedTo);
      const formattedTo = toDate.toISOString();
      const formattedFrom = fromDate.toISOString();

      const requestedDates = eachDayOfInterval({ start: parseISO(formattedFrom), end: parseISO(formattedTo) });
      return !bookings.some((booking) => requestedDates.some((date) => isDateDuringBooking(date, booking)));
    }

    function isDateDuringBooking(date, booking) {
      const { dateFrom, dateTo } = booking;

      const dateFromDateObj = new Date(dateFrom);
      const dateFromFormatted = dateFromDateObj.toDateString();
      const dateToDateObj = new Date(dateTo);
      const dateToFormatted = dateToDateObj.toDateString();

      if (isBefore(parseISO(dateFromFormatted), parseISO(dateToFormatted))) {
        const occupiedDates = eachDayOfInterval({ start: parseISO(dateFrom), end: parseISO(dateTo) });
        return occupiedDates.includes(date);
      } else {
      }
    }

    async function searchVenues(searchParams) {
      let venues = [];
      let offset = 0;
      while (venues.length < VENUES_RESULT_SIZE && offset < MAX_SEARCH_OFFSET) {
        const batch = await getVenues(offset);
        const requiredCount = VENUES_RESULT_SIZE - venues.length;
        venues = [
          ...venues,
          ...filterVenues(batch, searchParams)
            .slice(0, requiredCount)
            .map((venue) => ({ ...venue, offset })),
        ];
        offset += VENUES_PER_BATCH;
      }
      setSearchResults(venues);
    }

    searchVenues(searchParams);
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
