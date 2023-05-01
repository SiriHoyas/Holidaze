import { Grid, ImageListItem } from "@mui/material";

import Carousel from "react-material-ui-carousel";

function ImgCarousel({ data, isError, isLoading, title }) {
  if (data) {
    return (
      <Grid container sx={{ mt: "6rem" }}>
        <Grid item xs={12} md={6}>
          <Carousel duration={600} autoPlay={false} height={"300px"} navButtonsAlwaysVisible={true}>
            {data.map((item) => (
              <ImageListItem>
                <img src={`${item}`} alt={title} loading="lazy" />
              </ImageListItem>
            ))}
          </Carousel>
        </Grid>
      </Grid>
    );
  }

  if (isError) {
    return <>ERROR</>;
  }

  if (isLoading) {
    return <>LOADING</>;
  }
}

export default ImgCarousel;
