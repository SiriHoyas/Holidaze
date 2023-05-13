import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel, FormGroup, Grid, Modal, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import Button from "../Button";

function NewVenueModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  return (
    <>
      <Button fullWidth shape="square" onClick={handleOpen} label={"Add new venue"} />
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", p: "1rem" }}>
        <Grid container rowGap={2} direction={"column"} sx={{ overflow: "scroll", backgroundColor: "white", display: "flex", m: "0 auto", p: "1rem" }}>
          <Typography variant="h2">Add new venue</Typography>

          <form
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <Grid container rowGap={2} direction={"column"}>
              <Controller name="name" control={control} render={({ field }) => <TextField helperText={errors.name?.message} {...field} fullWidth required id="venueName" label="Venue name" variant="outlined" />} />
              <Controller name="description" control={control} render={({ field }) => <TextField helperText={errors.description?.message} {...field} fullWidth required id="venueDescription" label="Description" variant="outlined" />} />
              <Controller name="price" control={control} render={({ field }) => <TextField helperText={errors.price?.message} {...field} fullWidth type="number" required id="venuePrice" label="Price" variant="outlined" />} />
              <Controller name="guests" control={control} render={({ field }) => <TextField helperText={errors.guests?.message} {...field} fullWidth type="number" required id="venueMaxGuest" label="Max Guests" variant="outlined" />} />
              <Controller name="address" control={control} render={({ field }) => <TextField helperText={errors.address?.message} {...field} fullWidth required id="venueAddress" label="Address" variant="outlined" />} />
              <Controller name="city" control={control} render={({ field }) => <TextField helperText={errors.city?.message} {...field} fullWidth required id="venueCity" label="City" variant="outlined" />} />
              <Controller name="wifi" control={control} render={({ field }) => <Checkbox {...field} />} />
              <Controller name="parking" control={control} render={({ field }) => <Checkbox {...field} />} />
              <Controller name="breakfast" control={control} render={({ field }) => <Checkbox {...field} />} />
              <Controller name="pets" control={control} render={({ field }) => <Checkbox {...field} />} />
              <Button type="submit" label="Add venue" />
            </Grid>
          </form>
        </Grid>
      </Modal>
    </>
  );
}

export default NewVenueModal;
