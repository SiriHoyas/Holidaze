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
  return totalPrice;
}

/**
 *
 * @param {*} dateFrom
 * @param {*} dateTo
 * @returns
 */
export function getTotalNights(dateFrom, dateTo) {
  if (dateFrom !== null && dateTo !== null) {
    const totalNights = intervalToDuration({ start: new Date(dateFrom), end: new Date(dateTo) });
    return totalNights.days;
  }
  return 0;
}
