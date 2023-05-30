import { yupResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import ImageIcon from "@mui/icons-material/Image";
import OtherHousesRoundedIcon from "@mui/icons-material/OtherHousesRounded";
import { Checkbox, FormControlLabel, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import LogoHorizontal from "../../assets/brand/LogoHorizontal";
import getLocalStorage from "../../js/getLocalStorage";
import { newVenueSchema as schema } from "../../utils/schema";
import Button from "../Button";

function NewVenueModal({ setUpdateInfo }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addUrl, setAddUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState([]);
  const [venueCreated, setVenueCreated] = useState(false);
  const [error, setError] = useState(false);
  const { accessToken } = getLocalStorage();

  function deleteItem(id) {
    const newArray = imageUrls.filter((item) => item.id !== id);
    setImageUrls(newArray);
  }

  function addItem() {
    if (!addUrl) {
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: addUrl,
    };

    setImageUrls((list) => [...list, item]);
    setAddUrl("");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: 1,
      guests: 1,
      address: "",
      city: "",
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  });

  async function newVenue(url, options) {
    try {
      const response = await fetch(url, options);

      if (response.status === 201) {
        setVenueCreated(true);
        reset();
        setAddUrl("");
        setImageUrls([]);
        setUpdateInfo(0);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  function postNewVenue(data) {
    const imageArray = [];
    imageUrls.forEach((url) => {
      imageArray.push(url.value);
    });

    const newFormData = {
      name: data.name,
      description: data.description,
      media: imageArray,
      price: data.price,
      maxGuests: data.guests,
      meta: {
        wifi: data.wifi,
        parking: data.parking,
        breakfast: data.breakfast,
        pets: data.pets,
      },
      location: {
        address: data.address,
        city: data.city,
      },
    };
    setFormData(newFormData);

    const options = {
      method: "POST",
      body: JSON.stringify(newFormData),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    newVenue("https://api.noroff.dev/api/v1/holidaze/venues", options);
  }

  return (
    <>
      <Button size="large" fullWidth shape="square" onClick={handleOpen} label={"Add new venue"} startIcon={<AddHomeIcon sx={{ height: "20px" }} />} />
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", width: { xs: "90%", md: "70%", lg: "50%" }, m: "0 auto", mt: "2rem" }}>
        <Grid container rowGap={2} direction={"column"} sx={{ overflow: "scroll", backgroundColor: "white", display: "flex", m: "0 auto", p: "2rem" }}>
          {venueCreated ? (
            <Grid container direction={"column"} rowGap={3} alignItems={"center"}>
              <Typography variant="h2">New venue added!</Typography>
              <OtherHousesRoundedIcon sx={{ height: "40px", width: "40px" }} />
              <Grid container justifyContent={"center"}>
                <Typography variant="">People will soon be able to book a stay at your venue.</Typography>
                <Typography variant="">Visit your profile page to manage your venues</Typography>
              </Grid>
              <LogoHorizontal />
              <Button label="Close" fullWidth onClick={handleClose} />
            </Grid>
          ) : (
            <>
              <Typography variant="h2">Add new venue</Typography>
              {error && (
                <Typography variant="body2" color={"error.main"}>
                  Something went wrong, please try again later
                </Typography>
              )}
              <form onSubmit={handleSubmit(postNewVenue)}>
                <Grid container rowGap={2} direction={"column"}>
                  <Controller name="name" control={control} render={({ field }) => <TextField autoComplete="off" helperText={errors.name?.message} {...field} size="small" fullWidth required id="venueName" label="Venue name" variant="outlined" />} />
                  <Controller name="description" control={control} render={({ field }) => <TextField autoComplete="off" helperText={errors.description?.message} {...field} size="small" fullWidth required id="venueDescription" label="Description" variant="outlined" />} />
                  <Controller name="price" control={control} render={({ field }) => <TextField helperText={errors.price?.message} {...field} size="small" fullWidth type="number" required id="venuePrice" label="Price" variant="outlined" />} />
                  <Controller name="guests" control={control} render={({ field }) => <TextField helperText={errors.guests?.message} {...field} size="small" fullWidth type="number" required id="venueMaxGuest" label="Max Guests" variant="outlined" />} />
                  <Controller name="address" control={control} render={({ field }) => <TextField helperText={errors.address?.message} {...field} size="small" fullWidth required id="venueAddress" label="Address" variant="outlined" />} />
                  <Controller name="city" control={control} render={({ field }) => <TextField helperText={errors.city?.message} {...field} size="small" fullWidth required id="venueCity" label="City" variant="outlined" />} />
                  <Grid container columnGap={2} rowGap={2} direction={"row"}>
                    <TextField placeholder="Add an image..." value={addUrl} onChange={(e) => setAddUrl(e.target.value)} size="small" variant="outlined" label="Image URL" sx={{ flexGrow: 1 }} />
                    <Button sx={{ flexGrow: { xs: 1, sm: 0 } }} disabled={imageUrls.length === 8 ? true : false} onClick={() => addItem()} label={<Add />} shape="square" />
                  </Grid>
                  <List>
                    {imageUrls.map((url) => {
                      return (
                        <ListItem
                          key={url.id}
                          sx={{ pl: 0 }}
                          secondaryAction={
                            <IconButton edge="end" onClick={() => deleteItem(url.id)}>
                              <Delete />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar sx={{ display: "flex" }}>
                            <ImageIcon />
                          </ListItemAvatar>
                          <ListItemText sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "50px" }} primary={url.value} />
                        </ListItem>
                      );
                    })}
                  </List>
                  <FormControlLabel control={<Controller name={"wifi"} control={control} render={({ field: props }) => <Checkbox {...props} checked={props.value} onChange={(e) => props.onChange(e.target.checked)} />} />} label={"Wifi"} />
                  <FormControlLabel control={<Controller name={"parking"} control={control} render={({ field: props }) => <Checkbox {...props} checked={props.value} onChange={(e) => props.onChange(e.target.checked)} />} />} label={"Parking"} />
                  <FormControlLabel control={<Controller name={"breakfast"} control={control} render={({ field: props }) => <Checkbox {...props} checked={props.value} onChange={(e) => props.onChange(e.target.checked)} />} />} label={"Breakfast"} />
                  <FormControlLabel control={<Controller name={"pets"} control={control} render={({ field: props }) => <Checkbox {...props} checked={props.value} onChange={(e) => props.onChange(e.target.checked)} />} />} label={"Pets allowed"} />
                  <Button type="submit" label="Add venue" />
                </Grid>
              </form>
            </>
          )}
        </Grid>
      </Modal>
    </>
  );
}

export default NewVenueModal;
