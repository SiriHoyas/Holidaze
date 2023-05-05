import { CardCover } from "@mui/joy";
import { Box, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

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

    return { id: item.id, img: item.media[0], title: item.name, description: item.description, rows: 2, cols: cols };
  });

  return (
    <Grid container direction={"column"} item={true} sx={{ mt: "6rem" }}>
      <Typography variant="h5">{heading}</Typography>
      <ImageList variant="quilted" cols={4} rowHeight={121}>
        {itemData.map((item) => (
          <ImageListItem key={item.id} component={Link} to={`venues/${item.id}`} cols={item.cols || 1} rows={item.rows || 1}>
            <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
            <CardCover
              className="gradient-cover"
              sx={{
                "&:hover, &:focus-within": {
                  opacity: 1,
                },
                opacity: 0,
                transition: "0.1s ease-in",
                background: "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
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
                  <Grid>
                    <Typography variant="h6" noWrap sx={{ color: "white" }}>
                      {item.title}
                    </Typography>
                    <Typography variant="h6" noWrap sx={{ color: "white" }}>
                      ICONS
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
