import { Grid, ImageListItem } from "@mui/material";

import Carousel from "react-material-ui-carousel";

function ImgCarousel() {
  const data = [
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      rows: 2,
      cols: 3,
    },
    {
      img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
      title: "Burger",
      rows: 2,
      cols: 1,
    },
    {
      img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
      title: "Camera",
      rows: 2,
      cols: 1,
    },
    {
      img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
      title: "Coffee",
      rows: 2,
      cols: 3,
    },
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      rows: 2,
      cols: 3,
    },
    {
      img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
      title: "Breakfast",
      rows: 2,
      cols: 3,
    },
  ];
  return (
    <Grid container sx={{ mt: "6rem" }}>
      <Grid item xs={12} md={6}>
        <Carousel autoPlay={false} height={"300px"} navButtonsAlwaysVisible={true}>
          {data.map((item) => (
            <ImageListItem key={item.img}>
              <img src={`${item.img}?w=164&h=164&fit=crop&auto=format`} alt={item.title} loading="lazy" />
            </ImageListItem>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}

export default ImgCarousel;
