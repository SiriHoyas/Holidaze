import { Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";

function CardGallery({ heading }) {
  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format&dpr=2 2x`,
    };
  }
  const itemData = [
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
  ];
  return (
    <Grid container direction={"column"} lg={10}>
      <Typography variant="h5">{heading}</Typography>
      <ImageList variant="quilted" cols={4} rowHeight={121}>
        {itemData.map((item) => (
          <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
            <img {...srcset(item.img, 121, item.rows, item.cols)} alt={item.title} loading="lazy" />
            <ImageListItemBar sx={{ height: "5rem" }} title={item.title} subtitle={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </Grid>
  );
}

export default CardGallery;
