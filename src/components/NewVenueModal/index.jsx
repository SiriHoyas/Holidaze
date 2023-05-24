import { yupResolver } from "@hookform/resolvers/yup";
import { Add, AddToPhotos, Delete, Image } from "@mui/icons-material";
import AddHomeIcon from "@mui/icons-material/AddHome";
import ImageIcon from "@mui/icons-material/Image";
import { Avatar, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import PlusIcon from "../../assets/icons/PlusIcon";
import { ACCESS_TOKEN } from "../../js/constants";
import Button from "../Button";

function NewVenueModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [addUrl, setAddUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [formData, setFormData] = useState([]);

  function deleteItem(id) {
    const newArray = imageUrls.filter((item) => item.id !== id);
    setImageUrls(newArray);
  }

  function addItem() {
    if (!addUrl) {
      console.log("empty field");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: addUrl,
    };

    setImageUrls((list) => [...list, item]);
    setAddUrl("");
  }

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required().min(10),
    price: yup.number().required().min(1),
    guests: yup.number().required().min(1),
    rating: yup.number().min(1).max(5),
    address: yup.string().required(),
    city: yup.string().required(),
    wifi: yup.boolean(),
    parking: yup.boolean(),
    breakfast: yup.boolean(),
    pets: yup.boolean(),
  });

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
        console.log(response);
        handleClose();
        reset();
        setAddUrl("");
        setImageUrls([]);
      }
    } catch (error) {}
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
        Authorization: `Bearer ${ACCESS_TOKEN}`,
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
          <Typography variant="h2">Add new venue</Typography>

          <form onSubmit={handleSubmit(postNewVenue)}>
            <Grid container rowGap={2} direction={"column"}>
              <Controller name="name" control={control} render={({ field }) => <TextField helperText={errors.name?.message} {...field} size="small" fullWidth required id="venueName" label="Venue name" variant="outlined" />} />
              <Controller name="description" control={control} render={({ field }) => <TextField helperText={errors.description?.message} {...field} size="small" fullWidth required id="venueDescription" label="Description" variant="outlined" />} />
              <Controller name="price" control={control} render={({ field }) => <TextField helperText={errors.price?.message} {...field} size="small" fullWidth type="number" required id="venuePrice" label="Price" variant="outlined" />} />
              <Controller name="guests" control={control} render={({ field }) => <TextField helperText={errors.guests?.message} {...field} size="small" fullWidth type="number" required id="venueMaxGuest" label="Max Guests" variant="outlined" />} />
              <Controller name="address" control={control} render={({ field }) => <TextField helperText={errors.address?.message} {...field} size="small" fullWidth required id="venueAddress" label="Address" variant="outlined" />} />
              <Controller name="city" control={control} render={({ field }) => <TextField helperText={errors.city?.message} {...field} size="small" fullWidth required id="venueCity" label="City" variant="outlined" />} />
              <Grid container columnGap={2} direction={"row"}>
                <TextField placeholder="Add an image..." value={addUrl} onChange={(e) => setAddUrl(e.target.value)} size="small" variant="outlined" label="Image URL" sx={{ flexGrow: 1 }} />
                <Button disabled={imageUrls.length === 8 ? true : false} onClick={() => addItem()} label={<Add />} shape="square" />
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
        </Grid>
      </Modal>
    </>
  );
}

export default NewVenueModal;
