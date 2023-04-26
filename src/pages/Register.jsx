import RegisterForm from "../components/RegisterForm";
import UploadProfileImage from "../components/UploadProfileImage";

function Register() {
  return (
    <>
      <RegisterForm />
      {/* if response.ok -> render */}
      <UploadProfileImage />
    </>
  );
}

export default Register;
