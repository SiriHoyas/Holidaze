import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Divider, Grid, ImageList, ImageListItem, ImageListItemBar, Paper, Rating, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import FallbackImage from "./../../assets/placeholder.jpg";
import LocationIcon from "../../assets/icons/LocationIcon,";
import { locationConverter } from "../../js/locationConverter";
import MetaIcons from "../MetaIcons";

function VenueCard({ data, path }) {
  const [imageError, setImageError] = useState(false);

  if (data) {
    const hasImages = data.media && data.media.length > 0;

    const city = locationConverter(data);

    const handleImageError = () => {
      setImageError(true);
    };
    return (
      <Grid item xs={12} sm={6} md={4} component={Link} to={path} sx={{ textDecoration: "none" }}>
        <Card
          sx={{
            height: 360,
            transition: "transform 300ms ease-out, box-shadow 300ms ease-in-out",
            "&:hover": {
              transform: "translate(0, -3px)",
              boxShadow: "0px 0px 10px 0px rgba(120,120,120,0.4)",
            },
          }}
        >
          {hasImages ? <CardMedia component="img" sx={{ height: 140 }} image={imageError ? FallbackImage : data.media[0]} title={data.name} onError={handleImageError} /> : <CardMedia component="img" sx={{ height: 140 }} image={FallbackImage} title={data.name} />}
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
            <Divider sx={{ mt: "1rem" }} />
            <Typography noWrap variant="body2" color="text.secondary" sx={{ mt: ".7rem", mb: ".7rem" }}>
              {data.description}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "1.2rem", mb: "1rem" }}>
              € {data.price} / night
            </Typography>
            <MetaIcons metaData={data.meta} />
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default VenueCard;
