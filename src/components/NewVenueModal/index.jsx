import { FormControlLabel, FormGroup, Grid, Modal, Switch, TextField, Typography } from "@mui/material";
import { useState } from "react";

import Button from "../Button";

function NewVenueModal({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button fullWidth shape="square" onClick={handleOpen} label={"Add new venue"} />
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", p: "1rem" }}>
        <Grid container rowGap={2} direction={"column"} sx={{ overflow: "scroll", backgroundColor: "white", display: "flex", m: "0 auto", p: "1rem" }}>
          <Typography variant="h2">Add new venue</Typography>
          <form>
            <Grid container rowGap={2} direction={"column"}>
              <TextField fullWidth variant="outlined" label="Venue name" size="small" />
              <TextField fullWidth label="Description" multiline maxRows={4} size="small" />
              <Typography>ADD MEDIA</Typography>
              <TextField type="number" fullWidth variant="outlined" label="Price per night" size="small" />
              <TextField type="number" fullWidth variant="outlined" label="Max guests" size="small" />
              <TextField type="number" fullWidth variant="outlined" label="Rating" size="small" />
              <FormGroup>
                <FormControlLabel control={<Switch />} label="WiFi" />
                <FormControlLabel control={<Switch />} label="Parking" />
                <FormControlLabel control={<Switch />} label="Breakfast" />
                <FormControlLabel control={<Switch />} label="Pets" />
              </FormGroup>
              <Button label="Add venue" />
            </Grid>
          </form>
        </Grid>
      </Modal>
    </>
  );
}

export default NewVenueModal;
