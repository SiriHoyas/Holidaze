import { Grid, ImageListItem } from "@mui/material";

import Carousel from "react-material-ui-carousel";

function ImgCarousel({ data }) {
  return (
    <Grid container sx={{ mt: "6rem" }}>
      <Grid item xs={12} md={6}>
        <Carousel duration={600} autoPlay={false} height={"300px"} navButtonsAlwaysVisible={true}>
          {data.map((item) => (
            <ImageListItem key={item.img}>
              <img src={`${item.img}`} alt={item.title} loading="lazy" />
            </ImageListItem>
          ))}
        </Carousel>
      </Grid>
    </Grid>
  );
}

export default ImgCarousel;
