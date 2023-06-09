import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Checkbox, CircularProgress, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import Button from "./../components/Button";
import { registerSchema as schema } from "../utils/schema";

function Register() {
  const [registered, setRegistered] = useState(false);
  const [apiError, setApiError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("Creating account..");
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      venueManager: false,
      password: "",
    },
  });

  function onSubmit(data) {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    registerUser("https://api.noroff.dev/api/v1/holidaze/auth/register", options);
  }

  async function registerUser(url, options) {
    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (response.ok) {
        setRegistered(true);
        setTimeout(() => {
          setRegistrationStatus("Success!");
        }, 2000);

        setTimeout(() => {
          navigate("/");
        }, 4000);
      } else {
        setApiError(json.errors[0].message);
      }
    } catch (error) {
      setApiError("Something went wrong, please try again");
    }
  }

  return (
    <Grid container direction="column" sx={{ pt: { xs: "6rem", lg: "10rem" } }} item={true}>
      <Grid container textAlign={"center"} direction={"column"} xs={11} lg={4} item={true} alignContent={"center"}>
        <Typography gutterBottom variant="h1">
          Welcome to Holidaze!
        </Typography>
        <Typography gutterBottom variant="body2" color={"text.secondary"}>
          Looking for a venue for your next vacation? We got 'em!
        </Typography>
        <Paper elevation={5} sx={{ width: { xs: "90%", md: "50%", lg: "40%" }, p: 6, m: "0 auto", mt: "2rem" }}>
          {!registered && (
            <>
              <Typography align="start" gutterBottom variant="h2" sx={{ mb: ".4rem", fontSize: "1.2rem" }}>
                Register account
              </Typography>
              <Typography align="start" gutterBottom variant="body2" color={"text.secondary"} sx={{ mb: "2rem" }}>
                Already have an account? Log in <Link to={"/login"}>here</Link>
              </Typography>
              <Typography variant="body2" color={"error.dark"} align="start" sx={{ mb: "1rem" }}>
                {apiError}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container gap={2}>
                  <Grid item xs={12}>
                    <Controller name="name" control={control} render={({ field }) => <TextField helperText={errors.name?.message} {...field} fullWidth required id="username" label="Username" variant="outlined" />} />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller name="email" control={control} render={({ field }) => <TextField helperText={errors.email?.message} {...field} fullWidth required id="email" label="Email" variant="outlined" />} />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller name="password" control={control} render={({ field }) => <TextField helperText={errors.password?.message} {...field} fullWidth required id="password" label="Password" variant="outlined" type="password" />} />
                  </Grid>
                  <Controller name="venueManager" control={control} render={({ field }) => <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="Register as Venue Manager" />} />
                  <Grid item xs={12}>
                    <Button fullWidth type="submit" label={"Register"} />
                  </Grid>
                </Grid>
              </form>
            </>
          )}
          {registered && (
            <Grid container direction="column" justifyContent="center">
              <Box sx={{ display: "flex", justifyContent: "center", mb: "3rem" }}>
                <CircularProgress />
              </Box>
              <Typography variant="h2">{registrationStatus}</Typography>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Register;
