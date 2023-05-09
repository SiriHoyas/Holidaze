import { FormControl, Grid, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import EditIcon from "../../assets/icons/EditIcon";
import { ACCESS_TOKEN, USER_NAME } from "../../js/constants";
import Button from "../Button";

function EditProfileMedia() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    editProfileImage(`https://api.noroff.dev/api/v1/holidaze/profiles/${USER_NAME}/media`, options);
  }

  async function editProfileImage(url, options) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const json = await response.json();
        handleClose();
      }
    } catch (error) {}
  }
  return (
    <>
      <Tooltip title="Edit" sx={{ position: "absolute", right: "0", mr: "1rem" }} onClick={handleOpen}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", p: "1rem" }}>
        <Grid container rowGap={2} direction={"column"} sx={{ overflow: "scroll", backgroundColor: "white", display: "flex", m: "0 auto", p: "1rem" }} item={true}>
          <Typography variant="h2">New profile image</Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container gap={1}>
              <Grid item xs={12}>
                <Controller name="avatar" control={control} render={({ field }) => <TextField {...field} size="small" fullWidth id="imageUrl" label="Image URL" variant="outlined" />} />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth type="submit" label={"Set profile image"} />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth type="submit" label={"Cancel"} />
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Modal>
    </>
  );
}

export default EditProfileMedia;
