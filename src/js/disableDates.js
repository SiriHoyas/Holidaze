export function disableDates(date, bookedDates) {
  console.log(bookedDates);

  const dateString = date.$d.toDateString();

  return bookedDates.includes(dateString);
}
