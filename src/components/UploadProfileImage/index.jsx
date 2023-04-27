import { FormControl, Grid, TextField } from "@mui/material";

import Button from "../Button";
import { useState } from "react";

function UploadProfileImage() {
  const [imageUrl, setImageUrl] = useState();

  return (
    <Grid container xs={12} sx={{ mt: "6rem" }}>
      <FormControl>
        <Grid container gap={1}>
          <Grid item xs={12}>
            <TextField fullWidth id="imageUrl" label="Image URL" variant="outlined" onChange={(e) => setImageUrl(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            {imageUrl?.length > 0 && <img src={imageUrl}></img>}
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Set profile image"} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Skip"} />
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  );
}

export default UploadProfileImage;
