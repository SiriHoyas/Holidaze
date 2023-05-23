import { Avatar, Box, Card, CardContent, Grid, IconButton, Tooltip, Typography } from "@mui/material";

import EditIcon from "../../assets/icons/EditIcon";
import EditProfileMedia from "../EditProfileMedia";

function ProfileCard({ avatar, userName, email, onClick }) {
  return (
    <Card variant="outlined" sx={{ width: "100%" }}>
      <CardContent sx={{ display: "flex", alignItems: "center" }}>
        <Avatar alt={userName} src={avatar} />
        <Box component={"span"} sx={{ ml: "1rem", flexGrow: 1 }}>
          <Box component={"span"} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h5">{userName}</Typography>
            <EditProfileMedia />
          </Box>
          <Typography variant="body2">{email}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
