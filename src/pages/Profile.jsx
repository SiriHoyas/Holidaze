import EditProfileMedia from "../components/EditProfileMedia";
import ProfileCard from "../components/ProfileCard";
import { useState } from "react";

function Profile() {
  const [editMediaActive, setEditMediaActive] = useState(false);
  const userName = "Elmo";
  const email = "elmo@elmo.com";
  const avatar = "https://i.pinimg.com/564x/27/af/e4/27afe49bf4fd979eb5a2bccde60d01d1.jpg";

  return (
    <>
      <ProfileCard userName={userName} email={email} avatar={avatar} onClick={() => setEditMediaActive((prev) => !prev)} />
      {editMediaActive && <EditProfileMedia />}
    </>
  );
}

export default Profile;
