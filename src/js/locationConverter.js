// Just a placeholder if venue city is not defined. In my own solution, city is of course required
// to provide if registering a new venue, but I can't control what other people do.
// This is just for aesthetic purposes.
export function locationConverter(venue) {
  if (venue) {
    let city;
    if (venue.location.city === "Unknown") {
      city = "Willowbrook Falls";
    } else if (venue.location.city !== "") {
      city = venue.location.city;
    } else {
      city = "Harborview Haven";
    }
    return city;
  }
}
