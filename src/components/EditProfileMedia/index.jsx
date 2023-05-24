import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import EditIcon from "../../assets/icons/EditIcon";
import { ACCESS_TOKEN, USER_NAME } from "../../js/constants";
import { setProfileMedia } from "../../store/UserSlice";
import { uploadProfileImageSchema as schema } from "../../utils/schema";
import Button from "../Button";

function EditProfileMedia() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  console.log(USER_NAME);

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
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
        dispatch(setProfileMedia(json.avatar));
        reset();
        handleClose();
      }
    } catch (error) {}
  }
  return (
    <>
      <Tooltip title="Edit" onClick={handleOpen}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", width: { xs: "90%", md: "70%", lg: "50%" }, m: "0 auto", mt: "4rem" }}>
        <Grid container rowGap={2} direction={"column"} sx={{ overflow: "scroll", backgroundColor: "white", display: "flex", m: "0 auto", p: "2rem" }} item={true}>
          <Typography variant="h2">New profile image</Typography>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container gap={2}>
              <Grid item xs={12}>
                <Controller name="avatar" control={control} render={({ field }) => <TextField {...field} size="small" fullWidth id="imageUrl" label="Image URL" variant="outlined" />} />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth size="large" type="submit" label={"Set profile image"} />
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
