import { areDatesAvailable } from "./bookings";
import { API_ROOT, MAX_SEARCH_OFFSET, VENUES_PER_BATCH, VENUES_RESULT_SIZE } from "./constants";

/**
 * Searches for venues based on the search params provided from the search bar via Redux Toolkit.
 *
 * The function uses VENUES_RESULT_SIZE to set a limit to how many results is stored in the return variable venues. The API does not offer a search-endpoint, and all
 * filtering needs to be done on the front end side.This is to avoid unneccesary load on the API by repeatedly calling the API for an unlimited number of venues that matches the search params.
 * The limit on search result size can be changed in the constants.js file.
 *
 * The while loop will look for matching venues as long as the venue.length (the number of matching venues is below the set result size variable, and the offset is lower than the set maximum limit offset)
 *
 * The function will search through the set number in VENUES_PER_BATCH at a time, and this can be adjusted for preformance.
 *
 * This function is dependant on the fetchVenues and filterVenues functions.
 *
 * @param {object} searchParams - The search params provided by the search bar. The params are stored in the search params slice in Redux Toolkit.
 * @returns {Promise<Array>} - Returns an array of venues filtered according to the search params
 */
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
  try {
    const result = await fetch(`${API_ROOT}/venues?_bookings=true&sort=created&sortOrder=desc&offset=${offset}&limit=${VENUES_PER_BATCH}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    if (result.ok) {
      return await result.json();
    }
  } catch (error) {
    console.log(error);
  }
}
/**
 * Takes in an array of venues and returns a filtered array based on the search params provided by the user in the search bar.
 *
 * The function first checks if the venues max guest count is less than requested guest count. If that is the case, the check returns true and will be excluded from the filtered result.
 * It then checks if pets, parking, wifi and breakfast is true, meaning that the user checked it off in the search bar. And then checks if the venue has the corresponding parameter set to not true.
 * If either of these conditions is true, the venue does not offer it and it is excluded from the filtered results.
 *
 * The function then checks if a keyword is provided. If it is true, the matchesKeyword function is run to determine if the keyword matches the venue. If it does not, it is excluded from the filtered list.
 *
 * Lastly, the areDatesAvailable function is called to determine if the dates provided by the user, and all dates between the two is not already booked.
 * If the venue being checked has dates available in the time interval, the venue is included in the filtered results.
 *
 * This function is dependant on the matchesKeyword, and areDatesAvailable function.
 *
 * @param {Array} venues - Data from the API. The provided data where this function is used is batches of a number of venues from the Holidaze API.
 * @param {Object} searchParams - The search params provided by the search bar. The params are stored in the search params slice in Redux Toolkit.
 *  @returns {Array} - An array of filtered venues based on the search params provided by the user.
 *
 *
 */
export function filterVenues(venues, searchParams) {
  const { guestCount = 0, pets, parking, wifi, breakfast, keyword = "", dateFrom, dateTo } = searchParams;
  return venues.filter((venue) => {
    if (venue.maxGuests < guestCount) return false;
    if (pets && !venue.meta.pets) return false;
    if (parking && !venue.meta.parking) return false;
    if (wifi && !venue.meta.wifi) return false;
    if (breakfast && !venue.meta.breakfast) return false;
    if (keyword.length > 0 && !matchesKeyword(venue, keyword.toLowerCase())) return false;
    console.log(venue.bookings);
    return areDatesAvailable(venue.bookings, dateFrom, dateTo);
  });
}

/**
 *
 * @param {*} venue
 * @param {*} keyword
 * @returns
 */
export function matchesKeyword(venue, keyword) {
  if (!venue.location && !venue.name) return false;
  if (venue.name.toLowerCase().includes(keyword.toLowerCase())) return true;
  if (!venue.location) return false;
  const city = venue.location.city || "";
  return city.toLowerCase().includes(keyword.toLowerCase());
}

export function hasSetDateRange({ dateFrom, dateTo }) {
  return dateFrom && dateTo;
}
