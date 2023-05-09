import { useEffect } from "react";
import { useSelector } from "react-redux";

import { API_ROOT, MAX_SEARCH_OFFSET, VENUES_PER_BATCH, VENUES_RESULT_SIZE } from "../js/constants";

function filterVenues(venues, searchParams) {
  const { guestCount, pets, parking, wifi, breakfast, keyword } = searchParams;
  return venues.filter((venue) => {
    if (venue.maxGuests < guestCount) return false;
    if (pets && !venue.meta.pets) return false;
    if (parking && !venue.meta.parking) return false;
    if (wifi && !venue.meta.wifi) return false;
    if (breakfast && !venue.meta.breakfast) return false;
    if (keyword && !venue.name.includes(keyword)) return false;
    // return areDatesAvailable(venue.bookings, dateFrom, dateTo);
    return true;
  });
}
//   function areDatesAvailable(bookings, requestedFrom, requestedTo) {
//     const requestedDates = eachDayOfInterval({ start: requestedFrom, end: requestedTo });
//     return !bookings.some((booking) => requestedDates.some((date) => isDateDuringBooking(date, booking)));
//   }

//   function isDateDuringBooking(date, booking) {
//     const { dateFrom, dateTo } = booking;
//     const occupiedDates = eachDayOfInterval({ start: startDate, end: endDate });
//     return occupiedDates.includes(date);
//   }
//

function Venues() {
  // const searchParams = {
  //   keyword: "",
  //   dateFrom: "2023-05-25T00:00:00.000Z",
  //   dateTo: "2023-05-31T00:00:00.000Z",
  //   guestCount: 1,
  //   wifi: true,
  //   parking: false,
  //   breakfast: true,
  //   pets: false,
  // };
  const searchParams = useSelector((state) => state.searchParams);

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
    // getVenues(10).then((result) => console.log(result));

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
            .map((v) => ({ ...v, offset })),
        ];
        offset += VENUES_PER_BATCH;
      }
      return venues;
    }

    searchVenues(searchParams).then((res) =>
      console.log(
        "searchREsult",
        res
        // res.map((v) => ({ wifi: v.meta.wifi, offset: v.offset }))
      )
    );
  });

  return <></>;
}

export default Venues;
