import { Avatar, Box, Card, CardContent, Grid, IconButton, Tooltip, Typography } from "@mui/material";

import EditIcon from "../../assets/icons/EditIcon";

function ProfileCard({ avatar, userName, email, onClick }) {
  return (
    <Grid container sx={{ mt: "6rem" }}>
      <Card variant="outlined">
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={userName} src={avatar} />
          <Box component={"span"} sx={{ ml: "1rem" }}>
            <Box component={"span"} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h5">{userName}</Typography>
              <Tooltip title="Edit" sx={{ alignSelf: "end" }} onClick={onClick}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography variant="body2">{email}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ProfileCard;
