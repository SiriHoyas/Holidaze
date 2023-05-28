import { it } from "date-fns/locale";

import { isDateDuringBooking } from "./bookings";

describe("isDateDuringBooking", () => {
  const booking = {
    dateFrom: "2023-05-25T00:00:00.000Z",
    dateTo: "2023-05-30T00:00:00.000Z",
  };

  test("should return true if date is during booking interval", () => {
    const date = "2023-05-26T00:00:00.000Z";
    expect(isDateDuringBooking(date, booking)).toBe(true);
  });
});
