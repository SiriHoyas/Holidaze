import { Card, CardMedia, Grid, Typography } from "@mui/material";

function VenueCard() {
  return (
    <Card>
      <Grid container xs={12}>
        <Grid item xs={4}>
          <CardMedia component="img" alt="elmo" height="140" image="https://images.ctfassets.net/iyiurthvosft/featured-img-of-post-210576/efdceaefcc01056a2d03938159779e12/featured-img-of-post-210576.png?fm=jpg&fl=progressive&q=50&w=1200"></CardMedia>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h2">Title</Typography>
          <>ICONS</>
          <Typography paragraph noWrap variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default VenueCard;
