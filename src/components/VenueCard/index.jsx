import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, ImageList, ImageListItem, ImageListItemBar, Paper, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import MetaIcons from "../MetaIcons";

function VenueCard({ data, path }) {
  let city;
  if (data.location.city !== "") {
    city = data.location.city;
  } else {
    // Just a placeholder if venue city is not defined. In my own solution, city is of course required
    // to provide if registering a new venue, but I can't control what other people do.
    // This is just for aesthetic purposes.
    city = "Lockwood Village";
  }
  return (
    <Grid item xs={12} sm={6} md={4} component={Link} to={path} sx={{ textDecoration: "none" }}>
      <Card sx={{ height: 300 }}>
        <CardMedia sx={{ height: 140 }} image={data.media[0]} title="green iguana" />
        <CardContent>
          <Typography noWrap variant="h5">
            {data.name}
          </Typography>
          <Typography gutterBottom variant="body1" component="div" color="text.secondary">
            <LocationOnOutlined sx={{ height: "15px" }} />
            {city}
          </Typography>
          <Typography noWrap variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
        <CardActions>
          <MetaIcons metaData={data.meta} />
        </CardActions>
      </Card>
    </Grid>
  );
}

export default VenueCard;
