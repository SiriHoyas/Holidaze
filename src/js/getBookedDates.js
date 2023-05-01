import { eachDayOfInterval } from "date-fns";

function getBookedDates(bookings) {
  if (bookings) {
    console.log(bookings);
    const bookedDates = bookings.map((booking) => {
      const bookedDates = eachDayOfInterval({ start: new Date(booking.dateFrom), end: new Date(booking.dateTo) });
      const format = bookedDates.map((date) => {
        return date.toDateString();
      });
      console.log("object");
      console.log(format);
      return format;
    });

    console.log(bookedDates);

    return bookedDates;
  }
}
export default getBookedDates;
