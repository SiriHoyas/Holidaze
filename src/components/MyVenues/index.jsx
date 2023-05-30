import { Card, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material";
import { Divide } from "hamburger-react";
import { Link } from "react-router-dom";

import LocationIcon from "../../assets/icons/LocationIcon,";
import { locationConverter } from "../../js/locationConverter";

function MyVenues({ venue }) {
  const city = locationConverter(venue);
  return (
    <Grid item xs={12} sm={6} xl={4} sx={{ textDecoration: "none" }} component={Link} to={`/venues/${venue.id}`}>
      <Card
        sx={{
          height: "250px",
          transition: "transform 300ms ease-out, box-shadow 300ms ease-in-out",
          "&:hover": {
            transform: "translate(0, -3px)",
            boxShadow: "0px 0px 10px 0px rgba(120,120,120,0.4)",
          },
        }}
      >
        <CardMedia sx={{ height: 140 }} component={"img"} image={venue.media[0]} />
        <CardContent>
          <Typography noWrap variant="h4" sx={{ fontSize: "1.3rem" }}>
            {venue.name}
          </Typography>
          <Grid container alignItems="baseline">
            <LocationIcon />
            <Typography noWrap gutterBottom variant="body1" component="div" color="primary.main" sx={{ fontSize: "1rem", ml: ".3rem" }}>
              {city}
            </Typography>
          </Grid>
          <Grid container>
            <Typography>€ {venue.price} / Night</Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MyVenues;
