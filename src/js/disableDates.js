function disableDates(date) {
  const dateString = date.$d.toDateString();
  console.log(dateString);

  const bookedDates = getBookedDates("2023-05-03T22:00:00.000Z", "2023-05-07T22:00:00.000Z");
  return bookedDates.includes(dateString);
}
