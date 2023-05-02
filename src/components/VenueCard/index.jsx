import { Card, CardMedia, Grid, Rating, Typography } from "@mui/material";

import { Link } from "react-router-dom";

function VenueCard({ id, img, name, description, rating }) {
  return (
    <Card component={Link} to={`venues/${id}`} sx={{ textDecoration: "none" }}>
      <Grid container item={true}>
        <Grid item xs={2}>
          <CardMedia component="img" alt={name} height="140" image={img}></CardMedia>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h4">{name}</Typography>
          <>ICONS</>
          {rating && <Rating value={rating} readOnly />}
          <Typography paragraph variant="body1">
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default VenueCard;
