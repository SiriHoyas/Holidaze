import { Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";

function MyVenues({ venue }) {
  return (
    <Grid item xs={12} md={4} component={Link} to={`/venues/${venue.id}`}>
      <Card sx={{ p: "2rem" }}>
        <CardContent>{venue.name}</CardContent>
      </Card>
    </Grid>
  );
}

export default MyVenues;
