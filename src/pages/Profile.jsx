import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HolidayVillageRoundedIcon from "@mui/icons-material/HolidayVillageRounded";
import RoomPreferencesRoundedIcon from "@mui/icons-material/RoomPreferencesRounded";
import { Card, CardContent, CardMedia, Chip, Divider, Grid, Button as MuiButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FavouritesFilled from "../assets/icons/FavouritesFilled";
import FavouritesOutlined from "../assets/icons/FavouritesOutlined";
import LocationIcon from "../assets/icons/LocationIcon,";
import Button from "../components/Button";
import EditProfileMedia from "../components/EditProfileMedia";
import MetaIcons from "../components/MetaIcons";
import NewVenueModal from "../components/NewVenueModal";
import ProfileCard from "../components/ProfileCard";
import VenueCard from "../components/VenueCard";
import useApi from "../hooks/useApi";
import { ACCESS_TOKEN, USER_NAME } from "../js/constants";

function Profile() {
  const [editMediaActive, setEditMediaActive] = useState(false);
  const [venuesActive, setVenuesActive] = useState(true);
  const [bookingsActive, setBookingsActive] = useState(false);
  const [favouritesActive, setFavouritesActive] = useState(false);
  const [title, setTitle] = useState("My Venues");
  const theme = useTheme();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const isBiggerScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { data, isLoading, isError } = useApi(`https://api.noroff.dev/api/v1/holidaze/profiles/${USER_NAME}?_bookings=true&_venues=true`, options);
  console.log("data", data);
  const { userName, email, avatar, venueManager } = useSelector((store) => {
    return store.user;
  });

  const { venues } = useSelector((store) => {
    return store.favourites;
  });

  const showBookings = () => {
    setTitle("My Bookings");
    setBookingsActive(true);
    setVenuesActive(false);
    setFavouritesActive(false);
  };
  const showVenues = () => {
    setTitle("My Venues");
    setVenuesActive(true);
    setBookingsActive(false);
    setFavouritesActive(false);
  };
  const showFavourites = () => {
    setTitle("Favourites");
    setFavouritesActive(true);
    setBookingsActive(false);
    setVenuesActive(false);
  };

  return (
    <Grid container columnGap={2} rowGap={1} xs={11} md={12} direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-evenly", m: "0 auto", mt: "6rem" }} item={true}>
      <Grid container xs={12} md={3} item={true} rowGap={2} sx={{ height: "fit-content", position: { md: "sticky", xs: "static" }, top: "6rem" }}>
        <Typography variant="h1">Hello, {userName}!</Typography>
        <ProfileCard userName={userName} email={email} avatar={avatar} onClick={() => setEditMediaActive((prev) => !prev)} />
        <NewVenueModal />
        {editMediaActive && <EditProfileMedia />}
        <Grid container direction={"column"} rowGap={2} columnGap={2} sx={{ mt: "2rem" }}>
          <MuiButton onClick={showVenues} variant={venuesActive ? "contained" : "outlined"} squared startIcon={<HolidayVillageRoundedIcon />} sx={{ flexGrow: 1 }}>
            My venues
          </MuiButton>
          <MuiButton onClick={showBookings} variant={bookingsActive ? "contained" : "outlined"} squared startIcon={<RoomPreferencesRoundedIcon />} sx={{ flexGrow: 1 }}>
            My bookings
          </MuiButton>
          {venueManager && (
            <MuiButton onClick={showFavourites} variant={favouritesActive ? "contained" : "outlined"} squared startIcon={<FavoriteBorderIcon />} sx={{ flexGrow: 1 }}>
              Favourites
            </MuiButton>
          )}
        </Grid>
      </Grid>
      <Divider orientation={isBiggerScreen ? "horizontal" : "vertical"} sx={{ mt: { xs: "1rem", lg: "0" }, mb: { xs: "1rem" } }} flexItem />
      <Grid container rowGap={2} xs={12} md={6} item={true} sx={{ height: "fit-content", mb: "4rem" }}>
        <Typography variant="h2">{title}</Typography>
        {venuesActive && (
          <Grid container sx={{ m: "0 auto" }} spacing={2}>
            {data && data.venues.length > 0 ? (
              data.venues.map((venue) => {
                return (
                  <Grid item xs={12} md={4}>
                    <Card sx={{ p: "2rem" }}>
                      <CardContent>{venue.name}</CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Grid container justifyContent={"center"} sx={{ mt: { xs: "1rem", md: "5rem" } }}>
                <Card sx={{ p: "2rem" }}>
                  <Typography gutterBottom align="center" variant="h5">
                    No venues to manage
                  </Typography>
                  <NewVenueModal />
                </Card>
              </Grid>
            )}
          </Grid>
        )}
        {bookingsActive && (
          <Grid container sx={{ m: "0 auto" }} spacing={2}>
            {data && data.bookings.length > 0 ? (
              data.bookings.map((booking) => {
                return (
                  <Grid item xs={12} md={4}>
                    <Card sx={{ p: "2rem" }}>
                      <CardContent>{booking.venue.name}</CardContent>
                      <Typography>{booking.dateFrom}</Typography>
                      <Typography>{booking.dateTo}</Typography>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Grid container justifyContent={"center"} sx={{ mt: { xs: "1rem", md: "5rem" } }}>
                <Card sx={{ p: "2rem" }}>
                  <Typography gutterBottom align="center" variant="h5">
                    You have no bookings
                  </Typography>
                  <Typography align="center">Wee</Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
        {favouritesActive && (
          <Grid container sx={{ m: "0 auto" }} spacing={2}>
            {venues.length > 0 ? (
              venues.map((data) => {
                return (
                  <Grid item xs={12} md={4}>
                    <Card sx={{ p: "2rem" }}>
                      <CardMedia component="img" sx={{ height: 140 }} image={data.media[0]} title={data.name} />
                      <CardContent>{data.name}</CardContent>
                    </Card>
                  </Grid>
                );
              })
            ) : (
              <Grid container justifyContent={"center"} sx={{ mt: { xs: "1rem", md: "5rem" } }}>
                <Card sx={{ p: "2rem" }}>
                  <Typography gutterBottom align="center" variant="h5">
                    Favorurites is empty.
                  </Typography>
                  <Typography align="center">
                    Visit our <Link to="/venues">venues</Link> to find your next place to stay!
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Profile;
