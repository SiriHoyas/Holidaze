import { FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material";

import Button from "../Button";
import { useState } from "react";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [venueManager, setVenueManager] = useState(false);

  return (
    <Grid container xs={12} sx={{ mt: "6rem" }}>
      <FormControl>
        <Grid container gap={1}>
          <Grid item xs={12}>
            <TextField fullWidth required id="username" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required id="password<" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <FormControlLabel
            control={<Switch />}
            label="Register as Venue Manager"
            onChange={() => {
              setVenueManager((prev) => !prev);
            }}
          />

          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Register"} />
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  );
}

export default RegisterForm;
