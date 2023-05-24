function MyFavourites({ data }) {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ p: "2rem" }}>
        <CardMedia component="img" sx={{ height: 140 }} image={data.media[0]} title={data.name} />
        <CardContent>{data.name}</CardContent>
      </Card>
    </Grid>
  );
}

export default MyFavourites;
