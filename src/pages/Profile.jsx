import { Card, Chip, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";

import EditProfileMedia from "../components/EditProfileMedia";
import NewVenueModal from "../components/NewVenueModal";
import ProfileCard from "../components/ProfileCard";
import UseApi from "../hooks/UseApi";

function Profile() {
  const [editMediaActive, setEditMediaActive] = useState(false);
  const [venuesActive, setVenuesActive] = useState(true);
  const [bookingsActive, setBookingsActive] = useState(false);
  const isVenueManager = true;
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const email = "elmo@elmo.com";
  const avatar = "https://i.pinimg.com/564x/27/af/e4/27afe49bf4fd979eb5a2bccde60d01d1.jpg";

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const { data, isLoading, isError } = UseApi(`https://api.noroff.dev/api/v1/holidaze/profiles/${userName}?_bookings=true`, options);

  console.log(data.bookings);

  const showBookings = () => {
    setBookingsActive((prev) => !prev);
    setVenuesActive((prev) => !prev);
  };
  const showVenues = () => {
    setVenuesActive((prev) => !prev);
    setBookingsActive((prev) => !prev);
  };

  console.log(venuesActive);

  if (isVenueManager) {
    return (
      <Grid container columnGap={2} rowGap={1} xs={11} md={12} direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-evenly", m: "0 auto", mt: "6rem" }}>
        <Grid container xs={12} md={3} item={true} rowGap={2} sx={{ height: "fit-content" }}>
          <Typography variant="h1" sx={{}}>
            Hello, {userName}!
          </Typography>
          <ProfileCard userName={userName} email={email} avatar={avatar} onClick={() => setEditMediaActive((prev) => !prev)} />
          <NewVenueModal />
          {editMediaActive && <EditProfileMedia />}
        </Grid>
        <Divider orientation={{ xs: "horizontal", lg: "vertical" }} sx={{ mt: { xs: "1rem", lg: "0" }, mb: { xs: "1rem", lg: "0" } }} flexItem />
        <Grid container rowGap={2} xs={12} md={6} item={true}>
          <Grid container columnGap={3}>
            <Chip label="My Venues" variant="outlined" onClick={showVenues} />
            <Chip label="My Bookings" variant="outlined" onClick={showBookings} />
          </Grid>
          <Grid container direction={"column"}>
            {venuesActive && <>VENUES</>}
            {bookingsActive && (
              <Grid container rowGap={2} direction={"column"}>
                {data &&
                  data.bookings.map((booking) => {
                    return (
                      <Card key={booking.id} variant="outlined" sx={{ p: "1rem", display: "flex", flexDirection: "column" }}>
                        <Typography variant="h4">{booking.venue.name}</Typography>
                        <Typography variant="body1">{booking.dateFrom}</Typography>
                        <Typography variant="body1">{booking.dateTo}</Typography>
                      </Card>
                    );
                  })}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <ProfileCard userName={userName} email={email} avatar={avatar} onClick={() => setEditMediaActive((prev) => !prev)} />
      {editMediaActive && <EditProfileMedia />}
      {data && console.log(data.bookings)}
    </>
  );
}

export default Profile;
