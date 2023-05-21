import { areDatesAvailable } from "./bookings";
import { API_ROOT, MAX_SEARCH_OFFSET, VENUES_PER_BATCH, VENUES_RESULT_SIZE } from "./constants";

export async function searchVenues(searchParams) {
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
    if (batch.length < VENUES_PER_BATCH) break;
  }
  return venues;
}

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
