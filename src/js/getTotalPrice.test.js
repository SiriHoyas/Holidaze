import { getTotalNights, getTotalPrice } from "./getTotalPrice";

describe("getTotalNights", () => {
  test("should return the number of nights if both dateFrom and dateTo are defined", () => {
    const dateFrom = new Date("2023-05-28T00:00:00.000Z");
    const dateTo = new Date("2023-05-31T00:00:00.000Z");
    const expectedNights = 3;
    expect(getTotalNights(dateFrom, dateTo)).toEqual(expectedNights);
  });

  test("should return null if date from is not defined", () => {
    const dateFrom = null;
    const dateTo = new Date("2023-05-31T00:00:00.000Z");
    expect(getTotalNights(dateFrom, dateTo)).toEqual(0);
  });

  test("should return null if date to is not defined", () => {
    const dateFrom = new Date("2023-05-28T00:00:00.000Z");
    const dateTo = null;
    expect(getTotalNights(dateFrom, dateTo)).toEqual(0);
  });
});

describe("getTotalPrice", () => {
  const pricePerNight = 3000;
  test("should return correct total price when both dateFrom and dateTo is defined", () => {
    const dateFrom = new Date("2023-05-28T00:00:00.000Z");
    const dateTo = new Date("2023-05-31T00:00:00.000Z");
    const expectedPrice = 9000;
    expect(getTotalPrice(pricePerNight, dateFrom, dateTo)).toEqual(expectedPrice);
  });
});
