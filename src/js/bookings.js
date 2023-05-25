import { eachDayOfInterval, isBefore, parseISO } from "date-fns";

/**
 *
 * @param {*} bookings
 * @param {*} requestedFrom
 * @param {*} requestedTo
 * @returns
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
 *
 * @param {*} date
 * @param {*} booking
 * @returns
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
