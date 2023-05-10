import { Card, CardMedia, Grid, Rating, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import MetaIcons from "../MetaIcons";

function VenueCard({ id, img, name, description, meta }) {
  return (
    <Card variant="outlined" component={Link} to={`venues/${id}`} sx={{ textDecoration: "none" }}>
      <Grid container item={true}>
        <Grid item xs={2}>
          <CardMedia component="img" alt={name} height="140" image={img}></CardMedia>
        </Grid>
        <Grid item xs={10} sx={{ p: "1rem" }}>
          <Typography variant="h4">{name}</Typography>
          <MetaIcons metaData={meta} />
          <Typography paragraph variant="body1" noWrap={true} sx={{ width: "400px" }}>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default VenueCard;
