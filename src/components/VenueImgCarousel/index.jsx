import { Grid, ImageListItem, useMediaQuery } from "@mui/material";
import Carousel from "react-material-ui-carousel";

import { theme } from "../../theme";
import ErrorMessage from "../ErrorMessage";

function VenueImgCarousel({ data, isError, isLoading, title, id }) {
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (data) {
    return (
      <Grid container item={true}>
        <Grid item xs={12} md={12}>
          <Carousel duration={600} height={isMobileScreen ? "200px" : "500px"} indicators={false} autoPlay={false} navButtonsAlwaysVisible={true} navButtonsAlwaysInvisible={data.length > 1 ? false : true}>
            {data.map((item) => (
              <Grid item key={id}>
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
    return <ErrorMessage />;
  }

  if (isLoading) {
    return (
      <Grid container justifyContent={"center"} sx={{ mt: "4rem" }}>
        <CircularProgress />
      </Grid>
    );
  }
}

export default VenueImgCarousel;
