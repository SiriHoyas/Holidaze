import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import FavouritesFilled from "../assets/icons/FavouritesFilled";
import FavouritesOutlined from "../assets/icons/FavouritesOutlined";
import LikeIcon from "../assets/icons/LikeIcon";
import BookingModal from "../components/BookingModal";
import Button from "../components/Button";
import EditVenueModal from "../components/EditVenueModal";
import MetaIcons from "../components/MetaIcons";
import VenueImgCarousel from "../components/VenueImgCarousel";
import useApi from "../hooks/UseApi";
import { addToFavourites, removeFromFavourites } from "../store/FavouritesSlice";

function VenuePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { venueID } = useParams();
  const dispatch = useDispatch();
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
        setIsMyVenue = true;
      }

      if (venues.includes(data.id)) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    }
  }, [data, venues, userName]);
  if (data) {
    return (
      <Grid container rowGap={2} xs={11} md={7} direction={"column"} sx={{ m: "0 auto", mt: "5rem", mb: "5rem" }} item={true}>
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
                    dispatch(addToFavourites(data.id));
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
