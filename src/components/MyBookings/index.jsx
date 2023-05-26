import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Button, Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import FallbackImage from "./../../assets/placeholder.jpg";
import LocationIcon from "../../assets/icons/LocationIcon,";
import { API_ROOT } from "../../js/constants";
import { dateFormatter } from "../../js/dateFormatter";
import getLocalStorage from "../../js/getLocalStorage";
import { locationConverter } from "../../js/locationConverter";

function MyBookings({ booking, setUpdateInfo }) {
  const [imageError, setImageError] = useState(false);
  const hasImages = booking.venue.media && booking.venue.media.length > 0;
  const handleImageError = () => {
    setImageError(true);
  };

  const city = locationConverter(booking.venue);
  const formattedFrom = dateFormatter(booking.dateFrom);
  const formattedTo = dateFormatter(booking.dateTo);
  const { accessToken, userName } = getLocalStorage();

  async function handleDelete() {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    try {
      const response = await fetch(`${API_ROOT}/bookings/${booking.id}`, options);
      if (response.ok) {
        setUpdateInfo(0);
      }
    } catch (error) {}
  }

  return (
    <Grid item xs={12} md={4}>
      <Card>
        {hasImages ? <CardMedia component="img" sx={{ height: 140 }} image={imageError ? FallbackImage : booking.venue.media[0]} title={booking.venue.name} onError={handleImageError} /> : <CardMedia component="img" sx={{ height: 140 }} image={FallbackImage} title={booking.venue.name} />}
        <CardContent>
          <Typography variant="h5">{booking.venue.name}</Typography>
          <Grid container alignItems="baseline">
            <LocationIcon />
            <Typography gutterBottom variant="body1" component="div" color="primary.main" sx={{ fontSize: "1rem", ml: ".3rem" }}>
              {city}
            </Typography>
          </Grid>
          <Divider sx={{ mt: "1rem", mb: "1rem" }} />
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            You have booked this venue for:
          </Typography>
          <Typography variant="body1">
            {formattedFrom} - {formattedTo}
          </Typography>
          <Button onClick={handleDelete} fullWidth size="small" variant="outlined" startIcon={<DisabledByDefaultIcon />} sx={{ borderColor: "error.dark", color: "error.dark", mt: "2rem" }}>
            Delete booking
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MyBookings;
