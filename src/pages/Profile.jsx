import { Card, Chip, Divider, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import EditProfileMedia from "../components/EditProfileMedia";
import NewVenueModal from "../components/NewVenueModal";
import ProfileCard from "../components/ProfileCard";
import useApi from "../hooks/UseApi";
import { ACCESS_TOKEN, USER_NAME } from "../js/constants";

function Profile() {
  const [editMediaActive, setEditMediaActive] = useState(false);
  const [venuesActive, setVenuesActive] = useState(true);
  const [bookingsActive, setBookingsActive] = useState(false);

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const { data, isLoading, isError } = useApi(`https://api.noroff.dev/api/v1/holidaze/profiles/${USER_NAME}?_bookings=true`, options);

  const { userName, email, avatar, venueManager } = useSelector((store) => {
    return store.user;
  });

  const theme = useTheme();

  const showBookings = () => {
    setBookingsActive((prev) => !prev);
    setVenuesActive((prev) => !prev);
  };
  const showVenues = () => {
    setVenuesActive((prev) => !prev);
    setBookingsActive((prev) => !prev);
  };

  if (venueManager) {
    return (
      <Grid container columnGap={2} rowGap={1} xs={11} md={12} direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-evenly", m: "0 auto", mt: "6rem" }} item={true}>
        <Grid container xs={12} md={3} item={true} rowGap={2} sx={{ height: "fit-content", position: { md: "sticky", xs: "static" }, top: "6rem" }}>
          <Typography variant="h1" sx={{}}>
            Hello, {USER_NAME}!
          </Typography>
          <ProfileCard userName={USER_NAME} email={email} avatar={avatar} onClick={() => setEditMediaActive((prev) => !prev)} />
          <NewVenueModal />
          {editMediaActive && <EditProfileMedia />}
        </Grid>
        <Divider orientation={useMediaQuery(theme.breakpoints.down("md")) ? "horizontal" : "vertical"} sx={{ mt: { xs: "1rem", lg: "0" }, mb: { xs: "1rem", lg: "0" } }} flexItem />
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
}

export default Profile;
