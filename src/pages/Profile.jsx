import EditProfileMedia from "../components/EditProfileMedia";
import ProfileCard from "../components/ProfileCard";
import UseApi from "../hooks/UseApi";
import VenueCard from "../components/VenueCard";
import { useState } from "react";

function Profile() {
  const [editMediaActive, setEditMediaActive] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const email = "elmo@elmo.com";
  const avatar = "https://i.pinimg.com/564x/27/af/e4/27afe49bf4fd979eb5a2bccde60d01d1.jpg";

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  const { data, isLoading, isError } = UseApi(`https://api.noroff.dev/api/v1/holidaze/profiles/${userName}?_bookings=true`, options);

  return (
    <>
      <ProfileCard userName={userName} email={email} avatar={avatar} onClick={() => setEditMediaActive((prev) => !prev)} />
      {editMediaActive && <EditProfileMedia />}
      {data && console.log(data.bookings)}
    </>
  );
}

export default Profile;
