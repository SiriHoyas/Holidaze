import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import Button from "./../components/Button";
import getAuth from "../js/getAuth";
import { setUserInfo } from "../store/UserSlice";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/^[a-zA-Z0-9._%+-]+@(stud\.)?noroff\.no$/, "Please enter a valid email")
    .required(),
  password: yup.string().min(8, "Password must be eight characters or more").required(),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = getAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
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

    userLogin("https://api.noroff.dev/api/v1/holidaze/auth/login", options);
  }

  async function userLogin(url, options) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const json = await response.json();

        let venueManager = json.venueManager;
        if (json.venueManager === null) {
          venueManager = false;
        }

        const userInfo = {
          userName: json.name,
          email: json.email,
          avatar: json.avatar,
          venueManager: venueManager,
        };
        localStorage.setItem("userName", json.name);
        localStorage.setItem("accessToken", json.accessToken);
        dispatch(setUserInfo(userInfo));
        navigate("/");
      }
    } catch (error) {}
  }
  return (
    <Grid container rowGap={1} direction={"column"} sx={{ m: "0 auto", mt: "15rem" }} xs={11} lg={4} item={true}>
      <Paper sx={{ p: 6 }}>
        <Typography gutterBottom variant="h1">
          Welcome back!
        </Typography>
        <Typography gutterBottom variant="body2" color={"text.secondary"}>
          Log in to book your next adventure!
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowGap={3}>
            <Grid item xs={12}>
              <Controller name="email" control={control} render={({ field }) => <TextField helperText={errors.email?.message} {...field} fullWidth required id="email" label="Email" variant="outlined" />} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="password" control={control} render={({ field }) => <TextField helperText={errors.password?.message} {...field} fullWidth required id="password" label="Password" variant="outlined" type="password" />} />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" label={"Login"} />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default Login;
