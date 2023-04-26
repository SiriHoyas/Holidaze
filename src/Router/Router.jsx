import { Route, Routes } from "react-router-dom";

import Authentication from "../pages/Authentication";
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
        <Route path="venues" element={<Venues />}>
          <Route path=":venueID" element={<VenuePage />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default Router;
