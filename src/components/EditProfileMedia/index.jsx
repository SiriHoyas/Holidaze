import { Controller, useForm } from "react-hook-form";
import { Grid, TextField } from "@mui/material";

import Button from "../Button";

function EditProfileMedia() {
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
      console.log(response);

      if (response.ok) {
        const json = await response.json();
        console.log(json);
        navigate("/");
      }
    } catch (error) {}
  }
  return (
    <Grid container sx={{ mt: "6rem" }}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Grid container gap={1}>
          <Grid item xs={12}>
            <Controller name="avatar" control={control} render={({ field }) => <TextField {...field} fullWidth id="imageUrl" label="Image URL" variant="outlined" />} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Set profile image"} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Cancel"} link="/" />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default EditProfileMedia;
