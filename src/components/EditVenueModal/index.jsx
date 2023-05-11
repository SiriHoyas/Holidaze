import { FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, Modal, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";

import CloseIcon from "../../assets/icons/CloseIcon";
import Button from "../Button";

function EditVenueModal({ venue, open, handleClose }) {
  if (venue) {
    console.log(venue);
    const [venueName, setVenueName] = useState(venue.name);
    const [venueDescription, setVenueDescription] = useState(venue.description);
    const [venuePrice, setVenuePrice] = useState(venue.price);
    const [venueGuests, setVenueGuests] = useState(venue.maxGuests);
    const [wifi, setWifi] = useState(venue.meta.wifi);
    const [parking, setparking] = useState(venue.meta.parking);
    const [breakfast, setBreakfast] = useState(venue.meta.breakfast);
    const [pets, setPets] = useState(venue.meta.pets);

    return (
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", p: "1rem" }}>
        <Grid container rowGap={2} direction={"column"} sx={{ overflow: "scroll", backgroundColor: "white", display: "flex", m: "0 auto", p: "1rem", height: "75%" }}>
          <Typography variant="h2">Edit venue</Typography>
          <Grid container direction={"column"}>
            <form>
              <TextField
                fullWidth
                label="Venue Name"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                size="small"
                value={venueName}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                maxRows={4}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={venueDescription}
              />
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                label="Price per night"
                size="small"
                value={venuePrice}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type="number"
                fullWidth
                variant="outlined"
                label="Max guests"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={venueGuests}
              />
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked={wifi} />} label="WiFi" />
                <FormControlLabel control={<Switch defaultChecked={parking} />} label="Parking" />
                <FormControlLabel control={<Switch defaultChecked={breakfast} />} label="Breakfast" />
                <FormControlLabel control={<Switch defaultChecked={pets} />} label="Pets" />
              </FormGroup>
            </form>
          </Grid>
          <Grid container columnGap={2}>
            <Button label={"Confirm"} shape={"square"} sx={{ backgroundColor: "secondary.main" }} />
            <Button label={"Delete"} shape={"square"} sx={{ backgroundColor: "error.main" }} />
          </Grid>
        </Grid>
      </Modal>
    );
  }
}

export default EditVenueModal;
