import { intervalToDuration } from "date-fns";
/**
 * Gets the total price based on venue cost and how many nights the customer is booking
 *
 * @param {number} pricePerNight - The price per night for the venue
 * @param {string} dateFrom - The start date of the stay
 * @param {string} dateTo - The end date of the stay
 * @returns {number} - The total price for the stay
 */
export function getTotalPrice(pricePerNight, dateFrom, dateTo) {
  const totalNights = getTotalNights(dateFrom, dateTo);
  const totalPrice = pricePerNight * totalNights;
  return totalPrice;
}

/**
 * Gets the total number of nights from the start and end date from date picker
 *
 * @param {string} dateFrom - Start date
 * @param {string} dateTo - End date
 * @returns {number} - The total number of nights between the start and end date
 */
export function getTotalNights(dateFrom, dateTo) {
  if (dateFrom !== null && dateTo !== null) {
    const totalNights = intervalToDuration({ start: new Date(dateFrom), end: new Date(dateTo) });
    return totalNights.days;
  }
  return 0;
}
