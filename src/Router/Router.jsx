import { Link, Route, Routes } from "react-router-dom";

import { Grid } from "@mui/material";
import HomePage from "../pages/HomePage";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import VenuePage from "../pages/VenuePage";
import Venues from "../pages/Venues";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="venues" element={<Venues />} />
        <Route path="venues/:venueID" element={<VenuePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route
          path="*"
          element={
            <Grid sx={{ mt: "10rem" }}>
              <Link to={"/"}>LINK</Link>
            </Grid>
          }
        />
      </Route>
    </Routes>
  );
}

export default Router;
