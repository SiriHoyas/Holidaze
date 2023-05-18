import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, ImageList, ImageListItem, ImageListItemBar, Paper, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import LocationIcon from "../../assets/icons/LocationIcon,";
import MetaIcons from "../MetaIcons";

function VenueCard({ data, path }) {
  if (data) {
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
        <Card
          sx={{
            height: 300,
            transition: "transform 300ms ease-out, box-shadow 300ms ease-in-out",
            "&:hover": {
              transform: "translate(0, -3px)",
              boxShadow: "0px 0px 10px 0px rgba(120,120,120,0.4)",
            },
          }}
        >
          <CardMedia sx={{ height: 140 }} image={data.media[0]} title={data.name} />
          <CardContent>
            <Typography noWrap variant="h5">
              {data.name}
            </Typography>
            <Grid container alignItems="baseline">
              <LocationIcon />
              <Typography gutterBottom variant="body1" component="div" color="primary.main" sx={{ fontSize: "1rem", ml: ".3rem" }}>
                {city}
              </Typography>
            </Grid>
            <Divider />
            <Typography noWrap variant="body2" color="text.secondary" sx={{ mt: ".7rem", mb: ".7rem" }}>
              {data.description}
            </Typography>
            <MetaIcons metaData={data.meta} />
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default VenueCard;
