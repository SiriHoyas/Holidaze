import { matchesKeyword } from "./search";

describe("matchesKeyword", () => {
  test("should return true if the venue name includes the keyword", () => {
    const venue = { name: "Søgne Village" };
    const keyword = "village";
    const result = matchesKeyword(venue, keyword);
    expect(result).toBe(true);
  });

  test("should return false if the venue name and location does not include the keyword", () => {
    const venue = { name: "Seaside Cabin", location: { city: "Kristiansand" } };
    const keyword = "søgne";
    const result = matchesKeyword(venue, keyword);
    expect(result).toBe(false);
  });

  test("should return false if the venue has no name or location", () => {
    const venue = { name: "", location: { city: "" } };
    const keyword = "Kristiansand";
    const result = matchesKeyword(venue, keyword);
    expect(result).toBe(false);
  });
});
