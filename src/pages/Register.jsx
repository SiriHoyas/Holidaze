import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import Button from "./../components/Button";
import UploadProfileImage from "../components/UploadProfileMedia";
import { registerSchema as schema } from "../utils/schema";

function Register() {
  const [registered, setRegistered] = useState(false);

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

      if (response.ok) {
        setRegistered(true);
        const json = await response.json();
      }
    } catch (error) {}
  }
  if (registered) {
    return <UploadProfileImage />;
  }
  return (
    <Grid container xs={12} sx={{ mt: "6rem" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container gap={1}>
          <Grid item xs={12}>
            <Controller name="name" control={control} render={({ field }) => <TextField helperText={errors.name?.message} {...field} fullWidth required id="username" label="Username" variant="outlined" />} />
          </Grid>
          <Grid item xs={12}>
            <Controller name="email" control={control} render={({ field }) => <TextField helperText={errors.email?.message} {...field} fullWidth required id="email" label="Email" variant="outlined" />} />
          </Grid>
          <Grid item xs={12}>
            <Controller name="password" control={control} render={({ field }) => <TextField helperText={errors.password?.message} {...field} fullWidth required id="password" label="Password" variant="outlined" type="password" />} />
          </Grid>
          <Controller name="venueManager" control={control} render={({ field }) => <Checkbox {...field} />} />
          <Grid item xs={12}>
            <Button fullWidth type="submit" label={"Register"} />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default Register;
