import { Card, CardContent, Grid } from "@mui/material";

function MyVenues({ venue }) {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ p: "2rem" }}>
        <CardContent>{venue.name}</CardContent>
      </Card>
    </Grid>
  );
}

export default MyVenues;
