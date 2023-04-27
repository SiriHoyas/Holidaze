import { Grid } from "@mui/material";
import ImgCarousel from "../components/ImgCarousel";

function VenuePage() {
  const items = [
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
    <Grid container>
      <ImgCarousel data={items} />
    </Grid>
  );
}

export default VenuePage;
