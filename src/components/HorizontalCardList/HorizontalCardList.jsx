import { Card, CardContent, CardMedia, Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import VenueCard from "../VenueCard";

function HorizontalCardList({ data, heading }) {
  if (data) {
    return (
      <Grid container xs={12} item={true}>
        <Typography variant="h6">{heading}</Typography>
        <ImageList
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)) !important",
            gridAutoColumns: "minmax(250px, 1fr)",
            pb: "1rem",
          }}
        >
          {data.map((item) => (
            <Card key={item.id} component={Link} to={`venues/${item.id}`} elevation={0} sx={{ textDecoration: "none", border: "1px solid lightgray" }}>
              <CardMedia component="img" sx={{ height: 200 }} image={item.media[0]} title={item.name} />
              <CardContent>
                <Typography noWrap variant="h5">
                  {item.name}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </ImageList>
      </Grid>
    );
  }
}

export default HorizontalCardList;
