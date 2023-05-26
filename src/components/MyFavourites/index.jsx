import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import FavouritesFilled from "../../assets/icons/FavouritesFilled";
import LocationIcon from "../../assets/icons/LocationIcon,";
import { locationConverter } from "../../js/locationConverter";

function MyFavourites({ venue }) {
  if (venue) {
    const city = locationConverter(venue);
    return (
      <Grid item xs={12} sm={6} xl={4} sx={{ textDecoration: "none" }} component={Link} to={`/venues/${venue.id}`}>
        <Card
          sx={{
            height: "300px",
            transition: "transform 300ms ease-out, box-shadow 300ms ease-in-out",
            "&:hover": {
              transform: "translate(0, -3px)",
              boxShadow: "0px 0px 10px 0px rgba(120,120,120,0.4)",
            },
          }}
        >
          <CardMedia sx={{ height: 140 }} component={"img"} image={venue.media[0]} />
          <CardContent>
            <Grid container justifyContent={"space-between"} sx={{ flexWrap: "noWrap" }}>
              <Typography noWrap variant="h4" sx={{ fontSize: "1.3rem", mr: "1rem" }}>
                {venue.name}
              </Typography>
              <FavouritesFilled />
            </Grid>
            <Grid container alignItems="baseline">
              <LocationIcon />
              <Typography noWrap gutterBottom variant="body1" component="div" color="primary.main" sx={{ fontSize: "1rem", ml: ".3rem" }}>
                {city}
              </Typography>
            </Grid>
            <Typography noWrap variant="body2" color="text.secondary" sx={{ mt: ".7rem", mb: ".7rem", maxWidth: "200px" }}>
              {venue.description}
            </Typography>
            <Grid container>
              <Typography>€ {venue.price} / Night</Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default MyFavourites;
