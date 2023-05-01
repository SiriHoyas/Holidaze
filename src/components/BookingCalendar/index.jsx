import "dayjs/locale/de";
import "dayjs/locale/en-gb";
import "dayjs/locale/zh-cn";

import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { disableDates } from "../../js/disableDates";
import { eachDayOfInterval } from "date-fns";
import getBookedDates from "../../js/getBookedDates";

function BookingCalendar({ bookings }) {
  if (bookings) {
    const bookedDates = getBookedDates(bookings);
    const allBookedDates = bookedDates.reduce((acc, booking) => {
      booking.forEach((booked) => {
        acc.push(booked);
      });
      return acc;
    }, []);

    function disableDates(date) {
      const dateString = date.$d.toDateString();

      return allBookedDates.includes(dateString);
    }

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar disablePast={true} shouldDisableDate={disableDates} />
      </LocalizationProvider>
    );
  }
}

export default BookingCalendar;
