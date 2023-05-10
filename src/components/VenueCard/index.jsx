import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, ImageListItem, Paper, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import MetaIcons from "../MetaIcons";

function VenueCard({ data }) {
  console.log(data);
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
    <Grid item xs={12} sm={6} md={4}>
      <Card component={Link} to={data.id} sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={data.media[0]} title={data.name} />
        <CardContent sx={{ display: "flex", flexDirection: "column", alignContent: "space-between" }}>
          <Typography noWrap variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", textTransform: "capitalize" }}>{city}</Typography>
          <Typography noWrap variant="body2" color="text.secondary">
            {data.description}
          </Typography>
          <Grid container direction={"row"}>
            <Typography variant="body1">€ {data.price} / night</Typography>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default VenueCard;
