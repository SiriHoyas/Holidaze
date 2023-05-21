import { areDatesAvailable } from "./bookings";
import { API_ROOT, MAX_SEARCH_OFFSET, VENUES_PER_BATCH, VENUES_RESULT_SIZE } from "./constants";

export async function searchVenues(searchParams) {
  let venues = [];
  let offset = 0;
  while (venues.length < VENUES_RESULT_SIZE && offset < MAX_SEARCH_OFFSET) {
    const batch = await fetchVenues(offset);
    const requiredCount = VENUES_RESULT_SIZE - venues.length;
    venues = [
      ...venues,
      ...filterVenues(batch, searchParams)
        .slice(0, requiredCount)
        .map((venue) => ({ ...venue, offset })),
    ];
    offset += VENUES_PER_BATCH;
    if (batch.length < VENUES_PER_BATCH) break;
  }
  return venues;
}

export async function fetchVenues(offset = 0) {
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
  const { guestCount = 0, pets, parking, wifi, breakfast, keyword = "", dateFrom, dateTo } = searchParams;
  return venues.filter((venue) => {
    if (venue.maxGuests < guestCount) return false;
    if (pets && !venue.meta.pets) return false;
    if (parking && !venue.meta.parking) return false;
    if (wifi && !venue.meta.wifi) return false;
    if (breakfast && !venue.meta.breakfast) return false;
    if (keyword.length > 0 && !matchesKeyword(venue, keyword.toLowerCase())) return false;
    return areDatesAvailable(venue.bookings, dateFrom, dateTo);
  });
}

function matchesKeyword(venue, keyword) {
  if (!venue.location && !venue.name) return false;
  if (venue.name.includes(keyword)) return true;
  if (!venue.location) return false;
  const { city = "" } = venue.location;
  return city.toLowerCase().includes(keyword);
}

export function hasSetDateRange({ dateFrom, dateTo }) {
  return dateFrom && dateTo;
}
