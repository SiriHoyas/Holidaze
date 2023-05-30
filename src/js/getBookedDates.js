import { eachDayOfInterval } from "date-fns";

/**
 * Takes bookings from the API and gets all dates between startt and end date
 *
 * @param {Array} bookings - The array of bookings from API
 * @returns {Array} - An array of booked dates, formatted as a date sting
 */

function getBookedDates(bookings) {
  if (bookings) {
    const bookedDates = bookings.map((booking) => {
      const bookedDates = eachDayOfInterval({ start: new Date(booking.dateFrom), end: new Date(booking.dateTo) });
      const format = bookedDates.map((date) => {
        return date.toDateString();
      });
      return format;
    });

    return bookedDates;
  }
}
export default getBookedDates;
