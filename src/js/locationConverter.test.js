import { locationConverter } from "./locationConverter";

describe("locationConverter", () => {
  test("should return Harborview Haven when City is not defined", () => {
    const venue = {
      name: "Søgne Villa",
      location: {
        city: "",
      },
    };
    expect(locationConverter(venue)).toBe("Harborview Haven");
  });

  test("should return Willowbrook Falls when City is not listed as Unknown", () => {
    const venue = {
      name: "Søgne Villa",
      location: {
        city: "Unknown",
      },
    };
    expect(locationConverter(venue)).toBe("Willowbrook Falls");
  });

  test("should return the venues city if city is not undefined or listed as Unknown", () => {
    const venue = {
      name: "Søgne Villa",
      location: {
        city: "Kristiansand",
      },
    };
    expect(locationConverter(venue)).toBe("Kristiansand");
  });
});
