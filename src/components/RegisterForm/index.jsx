import * as yup from "yup";

import { Checkbox, FormHelperText, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import Button from "../Button";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Za-z0-9_]+$/, "Username can only contain letters, numbers and underscore")
    .required(),
  email: yup
    .string()
    .email()
    .matches(/^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/, "Please enter a valid email")
    .required(),
  password: yup.string().min(8, "Password must be eight characters or more").required(),
  venueManager: yup.boolean(),
});

function RegisterForm() {
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
    console.log(data);
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
        const json = await response.json();
        return console.log(json);
      }
    } catch (error) {}
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

export default RegisterForm;
