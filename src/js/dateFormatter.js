export function dateFormatter(date) {
  const inputDate = new Date(date);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const formattedDate = new Intl.DateTimeFormat("en", options).format(inputDate);

  return formattedDate;
}
