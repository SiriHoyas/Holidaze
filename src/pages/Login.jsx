import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Paper, TextField, Typography } from "@mui/material";
import { set } from "date-fns";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import banner from "./../assets/brand/bannerLogin.avif";
import Button from "./../components/Button";
import getAuth from "../js/getAuth";
import { setUserInfo } from "../store/UserSlice";
import { loginSchema as schema } from "../utils/schema";

function Login() {
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = getAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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

  async function userLogin(url, options) {
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log(json);

      if (response.status === 401) {
        setApiError(json.errors[0].message);
      }

      if (response.ok) {
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
    } catch (error) {
      setApiError("Something went wrong, please try again");
    }
  }

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

  useEffect(() => {
    if (!isLoggedIn) {
      userLogin();
    }
  }, [isLoggedIn]);

  return (
    <Grid container direction="column" sx={{ pt: { sm: "6rem", lg: "10rem" } }} item={true}>
      <Grid container textAlign={"center"} direction={"column"} xs={11} lg={4} item={true} alignContent={"center"}>
        <Typography gutterBottom variant="h1">
          Welcome back!
        </Typography>
        <Typography gutterBottom variant="body2" color={"text.secondary"}>
          Log in to book your next adventure!
        </Typography>
        <Paper elevation={5} sx={{ width: { xs: "90%", md: "50%", lg: "40%" }, p: 6, position: "relative", transform: "translateY(80px)" }}>
          <Typography align="start" gutterBottom variant="h2" sx={{ mb: ".4rem", fontSize: "1.2rem" }}>
            Log In
          </Typography>
          <Typography align="start" gutterBottom variant="body2" color={"text.secondary"} sx={{ mb: "2rem" }}>
            Don't have an account? Register <Link to={"/register"}>here</Link>
          </Typography>
          <Typography variant="body2" color={"error.dark"} align="start" sx={{ mb: "1rem" }}>
            {apiError}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowGap={3}>
              <Grid item xs={12}>
                <Controller name="email" control={control} render={({ field }) => <TextField error={errors.email} helperText={errors.email?.message} {...field} fullWidth required id="email" label="Email" variant="outlined" />} />
              </Grid>
              <Grid item xs={12}>
                <Controller name="password" control={control} render={({ field }) => <TextField error={errors.password} helperText={errors.password?.message} {...field} fullWidth required id="password" label="Password" variant="outlined" type="password" />} />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth type="submit" label={"Login"} />
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
