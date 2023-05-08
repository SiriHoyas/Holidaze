export function disableDates(date, bookedDates) {
  const dateString = date.$d.toDateString();

  return bookedDates.includes(dateString);
}
