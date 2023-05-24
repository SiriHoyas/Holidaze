import { Card, CardContent, CardMedia, Grid } from "@mui/material";

function MyFavourites({ data }) {
  if (data) {
    return (
      <Grid item xs={12} md={4}>
        <Card>
          <CardMedia component="img" sx={{ height: 140 }} image={data.media[0]} title={data.name} />
          <CardContent>{data.name}</CardContent>
        </Card>
      </Grid>
    );
  }
}

export default MyFavourites;
