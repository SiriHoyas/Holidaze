import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlLabel, FormGroup, Grid, Modal, Switch, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import getLocalStorage from "../../js/getLocalStorage";
import { editVenueSchema as schema } from "../../utils/schema";
import Button from "../Button";

function EditVenueModal({ venue, open, handleClose, id }) {
  if (venue) {
    const [venueName, setVenueName] = useState(venue.name);
    const [venueDescription, setVenueDescription] = useState(venue.description);
    const [venuePrice, setVenuePrice] = useState(venue.price);
    const [venueGuests, setVenueGuests] = useState(venue.maxGuests);
    const [wifi, setWifi] = useState(venue.meta.wifi);
    const [parking, setparking] = useState(venue.meta.parking);
    const [breakfast, setBreakfast] = useState(venue.meta.breakfast);
    const [pets, setPets] = useState(venue.meta.pets);
    const [editSuccess, setEditSuccess] = useState(false);
    const [error, setError] = useState(false);
    const { accessToken } = getLocalStorage();

    const [isDeleted, setIsDeleted] = useState(false);

    const navigate = useNavigate();

    async function editVenue(url, options) {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          setEditSuccess(true);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    }

    function submitHandler(data) {
      const options = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      editVenue(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, options);
    }

    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),
      defaultValues: {
        name: venueName,
        description: venueDescription,
        price: venuePrice,
        guests: venueGuests,
        wifi: wifi,
        parking: parking,
        breakfast: breakfast,
        pets: pets,
      },
    });
    async function handleDelete() {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, options);
        if (response.ok) {
          navigate(-1);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    }

    useEffect(() => {
      if (isDeleted) {
        handleDelete();
      }
    }, [isDeleted]);

    return (
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", p: "1rem" }}>
        <Grid container md={6} rowGap={2} direction={"column"} sx={{ p: "2rem", backgroundColor: "white", m: "0 auto" }} item={true}>
          <Typography variant="h2">Edit venue</Typography>
          {error && (
            <Typography variant="body2" color={"error.main"}>
              Something went wrong, please try again later
            </Typography>
          )}
          {editSuccess ? (
            <Grid>
              <Typography variant="h6">Successfully updated venue</Typography>
              <Button
                onClick={() => {
                  handleClose();
                  setError(false);
                  setEditSuccess(false);
                }}
                label="Close"
                fullWidth
                sx={{ mt: "2rem" }}
              />
            </Grid>
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
              <Grid container rowGap={2} direction={"column"}>
                <Controller name="name" control={control} render={({ field }) => <TextField helperText={errors.name?.message} {...field} size="small" fullWidth required id="venueName" label="Venue name" variant="outlined" />} />
                <Controller name="description" control={control} render={({ field }) => <TextField helperText={errors.description?.message} {...field} size="small" fullWidth required id="venueDescription" label="Description" variant="outlined" />} />
                <Controller name="price" control={control} render={({ field }) => <TextField type="number" helperText={errors.name?.message} {...field} size="small" fullWidth required id="venuePrice" label="Price per night" variant="outlined" />} />
                <Controller name="guests" control={control} render={({ field }) => <TextField type="number" helperText={errors.name?.message} {...field} size="small" fullWidth required id="venueGuests" label="Max guests" variant="outlined" />} />
                <Grid container rowGap={2} direction={"column"}>
                  <FormGroup>
                    <FormControlLabel control={<Controller name={"wifi"} control={control} render={({ field: props }) => <Switch defaultChecked={wifi} {...props} />} />} label={"Wifi"} />
                    <FormControlLabel control={<Controller name={"parking"} control={control} render={({ field: props }) => <Switch defaultChecked={parking} {...props} />} />} label={"Parking"} />
                    <FormControlLabel control={<Controller name={"breakfast"} control={control} render={({ field: props }) => <Switch defaultChecked={breakfast} {...props} />} />} label={"Breakfast"} />
                    <FormControlLabel control={<Controller name={"pets"} control={control} render={({ field: props }) => <Switch defaultChecked={pets} {...props} />} />} label={"Pets allowed"} />
                  </FormGroup>
                </Grid>
              </Grid>
              <Grid container columnGap={2} sx={{ mt: "2rem" }}>
                <Button type="submit" label={"Confirm"} shape={"square"} sx={{ backgroundColor: "secondary.main" }} />
                <Button
                  onClick={() => {
                    setIsDeleted(true);
                  }}
                  label={"Delete"}
                  shape={"square"}
                  sx={{ backgroundColor: "error.main" }}
                />
              </Grid>
            </form>
          )}
        </Grid>
      </Modal>
    );
  }
}

export default EditVenueModal;
