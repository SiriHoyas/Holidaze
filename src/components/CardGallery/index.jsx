import { Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";

function CardGallery({ heading, data }) {
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
    <Grid container direction={"column"}>
      <Typography variant="h5">{heading}</Typography>
      <ImageList variant="quilted" cols={4} rowHeight={121}>
        {itemData.map((item) => (
          <ImageListItem key={item.id} cols={item.cols || 1} rows={item.rows || 1}>
            <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
            <ImageListItemBar sx={{ height: "4rem", backgroundColor: "black" }} title={item.title} subtitle={item.description} />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}

export default CardGallery;
