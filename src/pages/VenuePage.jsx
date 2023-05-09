import { Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import BookingModal from "../components/BookingModal";
import Button from "../components/Button";
import ImgCarousel from "../components/ImgCarousel";
import UseApi from "../hooks/UseApi";

function VenuePage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      <Grid container rowGap={2} xs={11} md={7} direction={"column"} sx={{ m: "0 auto", mt: "5rem" }} item={true}>
        <Grid container>
          <ImgCarousel data={data.media} title={data.name} id={data.id} />
        </Grid>
        <Grid item>
          <Typography variant="h1">{data.name}</Typography>
          <Typography variant="body1" sx={{ fontSize: "1.4rem" }}>
            € {data.price} / night
          </Typography>
        </Grid>
        <Grid item>
          <Button shape="square" onClick={handleOpen} label={"Book"} />
          <BookingModal handleClose={handleClose} open={open} bookings={data.bookings} />
        </Grid>
        <Divider sx={{ mt: "1rem" }} />
        <Grid item>
          <Typography variant="h5">Description</Typography>
          <Typography paragraph variant="body1"></Typography>
        </Grid>
        <Divider />
        <Grid>
          <Typography variant="h5">We offer</Typography>
        </Grid>
      </Grid>
    );
  }
}

export default VenuePage;
