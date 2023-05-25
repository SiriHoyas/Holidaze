import { intervalToDuration } from "date-fns";
/**
 *
 * @param {*} pricePerNight
 * @param {*} dateFrom
 * @param {*} dateTo
 * @returns
 */
export function getTotalPrice(pricePerNight, dateFrom, dateTo) {
  const totalNights = getTotalNights(dateFrom, dateTo);
  const totalPrice = pricePerNight * totalNights;
  console.log(totalPrice);
  return totalPrice;
}

/**
 *
 * @param {*} dateFrom
 * @param {*} dateTo
 * @returns
 */
function getTotalNights(dateFrom, dateTo) {
  if (dateFrom !== null && dateTo !== null) {
    const totalNights = intervalToDuration({ start: new Date(dateFrom), end: new Date(dateTo) });
    console.log(totalNights.days);
    return totalNights.days;
  }
  return 0;
}
