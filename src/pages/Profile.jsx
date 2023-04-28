import ProfileCard from "../components/ProfileCard";

function Profile() {
  const userName = "Elmo";
  const email = "elmo@elmo.com";
  const avatar = "https://i.pinimg.com/564x/27/af/e4/27afe49bf4fd979eb5a2bccde60d01d1.jpg";

  function onClick() {
    console.log("object");
  }

  return (
    <>
      <ProfileCard userName={userName} email={email} avatar={avatar} onClick={onClick} />
    </>
  );
}

export default Profile;
