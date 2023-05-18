import { Grid, ImageList, ImageListItem, ImageListItemBar, Typography } from "@mui/material";

function HorizontalCardList({ data, heading }) {
  if (data) {
    return (
      <Grid container xs={12} item={true}>
        <Typography variant="h6">{heading}</Typography>
        <ImageList
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr)) !important",
            gridAutoColumns: "minmax(250px, 1fr)",
            height: "200px",
          }}
        >
          {data.map((item) => (
            <ImageListItem sx={{ height: "200px" }} key={item.id}>
              <img src={item.media[0]} alt={item.name} />
              <ImageListItemBar title={item.name} sx={{ backgroundColor: "#0000009f" }} />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    );
  }
}

export default HorizontalCardList;
