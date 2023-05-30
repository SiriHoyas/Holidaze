import { CardCover } from "@mui/joy";
import { Box, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

import FallbackImage from "./../../assets/placeholder.jpg";
import MetaIcons from "../MetaIcons";

function CardGallery({ heading, data }) {
  const [showItemBar, setShowItemBar] = useState(false);
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  const itemData = data.map((item, index) => {
    let cols;
    if (index === 0 || index === 3) {
      cols = 3;
    } else {
      cols = 1;
    }

    return { id: item.id, img: item.media[0], title: item.name, meta: item.meta, description: item.description, rows: 2, cols: cols };
  });

  const handleImageError = (event) => {
    event.target.src = FallbackImage;
  };

  return (
    <Grid container direction={"column"} item={true} sx={{ mt: "6rem" }}>
      <Typography variant="h5">{heading}</Typography>
      <ImageList variant="quilted" cols={4} rowHeight={121} sx={{ borderRadius: "6px" }}>
        {itemData.map((item) => (
          <ImageListItem key={item.id} component={Link} to={`venues/${item.id}`} cols={item.cols || 1} rows={item.rows || 1}>
            <img onError={handleImageError} {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
            <CardCover
              className="gradient-cover"
              sx={{
                "&:hover, &:focus-within": {
                  opacity: 1,
                },
                opacity: 0,
                transition: "0.1s ease-in",
                background: "linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 67%)",
              }}
            >
              <Box>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    flexGrow: 1,
                    alignSelf: "flex-end",
                  }}
                >
                  <Grid item>
                    <Typography variant="h6" noWrap sx={{ color: "white" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" noWrap sx={{ color: "white" }}>
                      <MetaIcons metaData={item.meta} />
                    </Typography>
                  </Grid>
                </Box>
              </Box>
            </CardCover>
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}

export default CardGallery;
