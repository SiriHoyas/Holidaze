import BookingCalendar from "../components/BookingCalendar";
import { Grid } from "@mui/material";
import ImgCarousel from "../components/ImgCarousel";
import UseApi from "../hooks/UseApi";
import { useParams } from "react-router-dom";

function VenuePage() {
  const { venueID } = useParams();

  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const { data } = UseApi(`https://api.noroff.dev/api/v1/holidaze/venues/${venueID}?_owner=true&_bookings=true`, options);

  console.log(data);

  if (data) {
    return (
      <Grid container>
        <Grid container>
          <ImgCarousel data={data.media} title={data.name} />
        </Grid>
        <BookingCalendar bookings={data.bookings} />
      </Grid>
    );
  }
}

export default VenuePage;
