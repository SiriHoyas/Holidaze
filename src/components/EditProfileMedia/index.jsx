import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, IconButton, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import EditIcon from "../../assets/icons/EditIcon";
import getLocalStorage from "../../js/getLocalStorage";
import { setProfileMedia } from "../../store/UserSlice";
import { uploadProfileImageSchema as schema } from "../../utils/schema";
import Button from "../Button";

function EditProfileMedia({ setUpdateInfo }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError(false);
    reset();
  };
  const dispatch = useDispatch();
  const { accessToken, userName } = getLocalStorage();
  const [error, setError] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    editProfileImage(`https://api.noroff.dev/api/v1/holidaze/profiles/${userName}/media`, options);
  }

  async function editProfileImage(url, options) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const json = await response.json();
        reset();
        handleClose();
        dispatch(setProfileMedia(json.avatar));
        setUpdateInfo(0);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
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
                <Controller name="avatar" control={control} render={({ field }) => <TextField helperText={errors.avatar?.message} {...field} fullWidth required id="avatar" label="Image URL" variant="outlined" />} />
              </Grid>
              {error && (
                <Typography variant="body2" color={"error.main"}>
                  Something went wrong, please try again later
                </Typography>
              )}
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
