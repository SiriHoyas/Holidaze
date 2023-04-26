import { FormControl, Grid, TextField } from "@mui/material";

import Button from "../components/Button";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email);
  return (
    <Grid container xs={12} sx={{ mt: "6rem" }}>
      <FormControl>
        <Grid container gap={1}>
          <Grid item xs={12}>
            <TextField fullWidth required id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth required id="password<" label="Password" variant="outlined" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Log in"} />
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
  );
}

export default Login;
