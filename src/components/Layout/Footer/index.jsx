import { EmailOutlined, FacebookRounded, Forward10Outlined, ForwardToInboxOutlined, Send } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Textarea } from "@mui/joy";
import { Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";

import LogoGray from "../../../assets/brand/LogoGray";
import CloseIcon from "../../../assets/icons/CloseIcon";
import EmailIcon from "../../../assets/icons/EmailIcon";
import Button from "../../Button";

function Footer() {
  return (
    <Grid container direction={"column"} sx={{ backgroundColor: "#f3f3f3", p: "1.5rem", mt: "6rem" }}>
      <Grid container direction={"row"} justifyContent={"space-between"}>
        <Grid container direction={"column"} rowGap={2} xs={4}>
          <LogoGray />
          <Grid item direction={"row"} justifyContent={"center"}>
            <IconButton sx={{ pl: "0" }}>
              <FacebookRounded />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container direction={"column"} xs={4} rowGap={1} item={true}>
          <Typography variant="body2" color={"text.secondary"}>
            CONTACT US
          </Typography>
          <Typography variant="body2" color={"text.disabled"}>
            hello@holidaze.com
          </Typography>
          <Typography variant="body2" color={"text.disabled"}>
            456 Oak Street, Anytown, CA 98765
          </Typography>
          <Typography variant="body2" color={"text.disabled"}>
            +34 (555) 555-1212
          </Typography>
        </Grid>
        <Grid item xs={4} rowGap={1} direction={"column"} sx={{ display: "flex" }}>
          <Typography variant="body2" color={"text.secondary"}>
            NEWSLETTER
          </Typography>
          <Typography variant="body2" color={"text.disabled"}>
            Enter your email to get notified about great deals.
          </Typography>
          <TextField
            fullWidth
            label="Email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <ForwardToInboxOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            size="small"
          />
        </Grid>
      </Grid>
      <Divider sx={{ mt: "1rem" }} />
      <Typography variant="body2" color={"text.disabled"} sx={{ display: "flex", justifyContent: "end", mt: "1rem", mr: "1rem" }}>
        © 2023 Holidaze. All rights reserved
      </Typography>
    </Grid>
  );
}

export default Footer;
