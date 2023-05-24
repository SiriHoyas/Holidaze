import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { Divider, Grid, IconButton, Button as MuiButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import useApi from "./../hooks/useApi";
import FavouritesFilled from "../assets/icons/FavouritesFilled";
import FavouritesOutlined from "../assets/icons/FavouritesOutlined";
import BookingModal from "../components/BookingModal";
import Button from "../components/Button";
import EditVenueModal from "../components/EditVenueModal";
import MetaIcons from "../components/MetaIcons";
import VenueImgCarousel from "../components/VenueImgCarousel";
import { addToFavourites, removeFromFavourites } from "../store/FavouritesSlice";

function VenuePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { venueID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userName } = useSelector((store) => store.user);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isMyVenue, setIsMyVenue] = useState(false);

  const { venues } = useSelector((store) => {
    return store.favourites;
  });

  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const { data } = useApi(`https://api.noroff.dev/api/v1/holidaze/venues/${venueID}?_owner=true&_bookings=true`, options);

  console.log(data);
  useEffect(() => {
    if (data) {
      if (data.owner.name === userName) {
        setIsMyVenue(true);
      }

      const venueIds = venues.map((venue) => venue.id);

      if (venueIds.includes(data.id)) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    }
  }, [data, venues, userName]);
  if (data) {
    return (
      <Grid container rowGap={2} xs={11} md={7} direction={"column"} sx={{ m: "0 auto", mt: "5rem", mb: "5rem" }} item={true}>
        <MuiButton onClick={() => navigate(-1)} size="small" startIcon={<ArrowBackIosNewRoundedIcon sx={{ width: "12px" }} />} sx={{ width: "fit-content", display: "flex", fontWeight: "700" }}>
          BACK
        </MuiButton>
        <Grid container>
          <VenueImgCarousel data={data.media} title={data.name} id={data.id} />
        </Grid>
        <Grid item>
          <Grid container direction={"row"} justifyContent={"space-between"}>
            <Typography variant="h1">{data.name}</Typography>
            {isFavourite ? (
              <Tooltip title="Remove from favourites">
                <IconButton
                  onClick={() => {
                    dispatch(removeFromFavourites(data.id));
                    setIsFavourite(false);
                  }}
                >
                  <FavouritesFilled />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Add to favourites">
                <IconButton
                  onClick={() => {
                    dispatch(addToFavourites(data));
                    setIsFavourite(true);
                  }}
                >
                  <FavouritesOutlined />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Typography variant="body1" sx={{ fontSize: "1.4rem" }}>
            € {data.price} / night
          </Typography>
        </Grid>
        {!isMyVenue && (
          <Grid item>
            <Button shape="square" onClick={handleOpen} label={"Book"} />
            <BookingModal handleClose={handleClose} open={open} bookings={data.bookings} />
          </Grid>
        )}
        {isMyVenue && (
          <Grid item>
            <Button shape="square" onClick={handleOpen} label={"Edit venue"} />
            <EditVenueModal venue={data} handleClose={handleClose} open={open} />
          </Grid>
        )}
        <Divider sx={{ mt: "1rem" }} />
        <Grid item>
          <Typography variant="h5">Description</Typography>
          <Typography paragraph variant="body1"></Typography>
        </Grid>
        <Divider />
        <Grid>
          <Typography variant="h5">We offer</Typography>
          <MetaIcons metaData={data.meta} />
        </Grid>
      </Grid>
    );
  }
}

export default VenuePage;
