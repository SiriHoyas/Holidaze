import { Avatar, FormControl, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../Button";

function UploadProfileImage() {
  const [imageUrl, setImageUrl] = useState();
  const navigate = useNavigate();
  const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDc5LCJuYW1lIjoiZWxtbyIsImVtYWlsIjoiZWxtb0BzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6Imh0dHBzOi8vaS5waW5pbWcuY29tLzU2NHgvZGMvNDYvYTAvZGM0NmEwMDNlZDU2MDA0MzJmZGEyZDBhZjMzOGY4Y2MuanBnIiwidmVudWVNYW5hZ2VyIjp0cnVlLCJpYXQiOjE2ODI2MDY0NjV9.6QbY4fc-WCV_LQnd68Dx6hi3pWKGWsi05f_45mSmmVA";
  const name = "elmo";

  const { control, handleSubmit } = useForm({
    defaultValues: {
      avatar: "",
    },
  });

  function submitHandler(data) {
    const options = {
      method: "PUT",
      body: JSON.stringify(data),

      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    editProfileImage(`https://api.noroff.dev/api/v1/holidaze/profiles/${name}/media`, options);
  }

  async function editProfileImage(url, options) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const json = await response.json();

        navigate("/");
      }
    } catch (error) {}
  }
  return (
    <Grid container sx={{ mt: "6rem" }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container gap={1}>
          <Grid item xs={12}>
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                  }}
                  value={imageUrl}
                  fullWidth
                  id="imageUrl"
                  label="Image URL"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            {imageUrl?.length > 0 && <Avatar sx={{ width: "100px", height: "100px" }} src={imageUrl} />}
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Set profile image"} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Skip"} link="/" />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default UploadProfileImage;
