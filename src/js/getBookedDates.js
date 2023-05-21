import { eachDayOfInterval } from "date-fns";

/**
 *
 * @param {*} bookings
 * @returns
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
