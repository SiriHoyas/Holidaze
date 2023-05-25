import { Grid, ImageListItem, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { theme } from "../../theme";

function VenueImgCarousel({ data, isError, isLoading, title, id }) {
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (data) {
    return (
      <Grid container item={true}>
        <Grid item xs={12} md={12}>
          <Carousel duration={600} height={isMobileScreen ? "200px" : "400px"} indicators={false} autoPlay={false} navButtonsAlwaysVisible={true} navButtonsAlwaysInvisible={data.length > 0 ? false : true}>
            {data.map((item) => (
              <Grid key={id}>
                <ImageListItem>
                  <img src={`${item}`} alt={title} loading="lazy" />
                </ImageListItem>
              </Grid>
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

export default VenueImgCarousel;
