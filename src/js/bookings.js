import { eachDayOfInterval, isBefore, parseISO } from "date-fns";

/**
 * Checks if the requested dates are available for booking
 *
 * @param {Array} bookings - Array of bookings from the API
 * @param {string} requestedFrom - Start date of the requested interval
 * @param {string} requestedTo - End date of the requested interval
 * @returns {boolean} - returns either true or false if the dates are available or not
 */

export function areDatesAvailable(bookings, requestedFrom, requestedTo) {
  const fromDate = new Date(requestedFrom);
  const toDate = new Date(requestedTo);
  const formattedTo = toDate.toISOString();
  const formattedFrom = fromDate.toISOString();

  const requestedDates = eachDayOfInterval({ start: parseISO(formattedFrom), end: parseISO(formattedTo) });
  return !bookings.some((booking) => requestedDates.some((date) => isDateDuringBooking(date, booking)));
}

/**
 * Checks if a date falls within the range of a booking, from a booking stored in the API
 *
 * @param {Date} date - Date to check from the date picker
 * @param {Object} booking - Booking object from the API with start and end date
 * @param {string} booking.dateFrom - Start date of the booking
 * @param {string} booking.dateTo - End date of the booking.
 * @returns {boolean} - Indicates whether the date falls within the booking range
 */

function isDateDuringBooking(date, booking) {
  const { dateFrom, dateTo } = booking;
  const start = parseISO(dateFrom);
  const end = parseISO(dateTo);

  if (isBefore(end, start)) {
    return false;
  }
  const occupiedDates = eachDayOfInterval({ start, end });
  return occupiedDates.includes(date);
}
