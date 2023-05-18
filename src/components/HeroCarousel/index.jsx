import { Box, Grid, ImageListItem, ImageListItemBar, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";

import MetaIcons from "../MetaIcons";

function HeroCarousel({ recommendedData }) {
  return (
    <Carousel indicators={false} duration={500} autoPlay={true} height={"500px"}>
      {recommendedData.map((item) => (
        <Grid key={item.id} item sx={{ height: "100%", display: "flex" }}>
          <ImageListItem component={Link} to={`/venues/${item.id}`} key={item.id} sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", height: "25%", p: "1rem", boxShadow: "0", backgroundColor: "#0000009f", zIndex: "100", position: "absolute", bottom: "0" }}>
              <Typography variant="h5" sx={{ color: "white" }}>
                {item.name}
              </Typography>
              <Typography gutterBottom variant="body2" noWrap sx={{ color: "white", width: "50%" }}>
                {item.description}
              </Typography>
              <MetaIcons metaData={item.meta} />
            </Box>
            <img style={{ borderRadius: "6px" }} src={`${item.media[0]}`} alt={item.name} loading="lazy" />
          </ImageListItem>
        </Grid>
      ))}
    </Carousel>
  );
}

export default HeroCarousel;
