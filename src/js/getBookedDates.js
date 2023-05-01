import { eachDayOfInterval } from "date-fns";

export function getBookedDates(startDate, endDate) {
  const bookedDates = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });
  const format = bookedDates.map((date) => {
    return date.toDateString();
  });

  return format;
}
