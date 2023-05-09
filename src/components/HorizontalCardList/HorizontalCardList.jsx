import { Grid, ImageList, ImageListItem, Typography } from "@mui/material";

function HorizontalCardList({ data, heading }) {
  if (data) {
    return (
      <Grid container xs={12} item={true}>
        <Typography variant="h6">{heading}</Typography>
        <ImageList
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
            gridAutoColumns: "minmax(160px, 1fr)",
          }}
        >
          {data.map((item) => (
            <ImageListItem key={item.id}>
              <img src={item.media[0]} alt={item.name} />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    );
  }
}

export default HorizontalCardList;
