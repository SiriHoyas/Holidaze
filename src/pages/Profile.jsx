import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HolidayVillageRoundedIcon from "@mui/icons-material/HolidayVillageRounded";
import RoomPreferencesRoundedIcon from "@mui/icons-material/RoomPreferencesRounded";
import { Card, CircularProgress, Divider, Grid, Button as MuiButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import EditProfileMedia from "../components/EditProfileMedia";
import ErrorMessage from "../components/ErrorMessage";
import MyBookings from "../components/MyBookings";
import MyFavourites from "../components/MyFavourites";
import MyVenues from "../components/MyVenues";
import NewVenueModal from "../components/NewVenueModal";
import ProfileCard from "../components/ProfileCard";
import { ACCESS_TOKEN, USER_NAME } from "../js/constants";

function Profile() {
  const [editMediaActive, setEditMediaActive] = useState(false);
  const [venuesActive, setVenuesActive] = useState(true);
  const [bookingsActive, setBookingsActive] = useState(false);
  const [favouritesActive, setFavouritesActive] = useState(false);
  const [title, setTitle] = useState("My Venues");
  const [updateInfo, setUpdateInfo] = useState();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const theme = useTheme();

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const isBiggerScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/profiles/${USER_NAME}?_bookings=true&_venues=true`, options);

        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [updateInfo]);

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
        <ProfileCard setUpdateInfo={setUpdateInfo} userName={userName} email={email} avatar={avatar} onClick={() => setEditMediaActive((prev) => !prev)} />
        <NewVenueModal setUpdateInfo={setUpdateInfo} />
        {editMediaActive && <EditProfileMedia />}
        <Grid container direction={"column"} rowGap={2} columnGap={2} sx={{ mt: "2rem" }}>
          {venueManager && (
            <MuiButton onClick={showVenues} variant={venuesActive ? "contained" : "outlined"} squared startIcon={<HolidayVillageRoundedIcon />} sx={{ flexGrow: 1 }}>
              My venues
            </MuiButton>
          )}
          <MuiButton onClick={showBookings} variant={bookingsActive ? "contained" : "outlined"} squared startIcon={<RoomPreferencesRoundedIcon />} sx={{ flexGrow: 1 }}>
            My bookings
          </MuiButton>

          <MuiButton onClick={showFavourites} variant={favouritesActive ? "contained" : "outlined"} squared startIcon={<FavoriteBorderIcon />} sx={{ flexGrow: 1 }}>
            Favourites
          </MuiButton>
        </Grid>
      </Grid>
      <Divider orientation={isBiggerScreen ? "horizontal" : "vertical"} sx={{ mt: { xs: "1rem", lg: "0" }, mb: { xs: "1rem" } }} flexItem />
      <Grid container rowGap={2} xs={12} md={6} item={true} sx={{ height: "fit-content", mb: "4rem" }}>
        <Typography variant="h2">{title}</Typography>
        {venuesActive && (
          <Grid container sx={{ m: "0 auto" }} spacing={2}>
            {isLoading && (
              <Grid container justifyContent={"center"} sx={{ mt: "4rem" }}>
                <CircularProgress />
              </Grid>
            )}
            {isError && <ErrorMessage />}
            {data && data.venues.length > 0 ? (
              <Grid container>
                {data.venues.map((venue) => {
                  return <MyVenues venue={venue} />;
                })}
              </Grid>
            ) : (
              <Grid container justifyContent={"center"} sx={{ mt: { xs: "1rem", md: "5rem" } }}>
                {!isLoading && (
                  <Card sx={{ p: "2rem" }}>
                    <Typography gutterBottom align="center" variant="h5">
                      No venues to manage
                    </Typography>
                    <NewVenueModal />
                  </Card>
                )}
              </Grid>
            )}
          </Grid>
        )}
        {bookingsActive && (
          <Grid container sx={{ m: "0 auto" }} spacing={2}>
            {isLoading && (
              <Grid container justifyContent={"center"} sx={{ mt: "4rem" }}>
                <CircularProgress />
              </Grid>
            )}
            {isError && <ErrorMessage />}
            {data && data.bookings.length > 0 ? (
              data.bookings.map((booking) => {
                return <MyBookings setUpdateInfo={setUpdateInfo} booking={booking} />;
              })
            ) : (
              <Grid container justifyContent={"center"} sx={{ mt: { xs: "1rem", md: "5rem" } }}>
                <Card sx={{ p: "2rem" }}>
                  <Typography gutterBottom align="center" variant="h5">
                    You have no bookings
                  </Typography>
                  <Typography align="center">
                    Visit our <Link to="/venues">venues</Link> to find your next place to stay!
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
        {favouritesActive && (
          <Grid container sx={{ m: "0 auto" }} spacing={2}>
            {isLoading && (
              <Grid container justifyContent={"center"} sx={{ mt: "4rem" }}>
                <CircularProgress />
              </Grid>
            )}
            {isError && <ErrorMessage />}

            {venues.length > 0 ? (
              <Grid container>
                {venues.map((venue) => {
                  return <MyFavourites data={venue} />;
                })}
              </Grid>
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
