import { Typography } from "@mui/material";

function ErrorMessage({ message = "Something went wrong. Please try again later" }) {
  return (
    <Typography variant="body2" color={"error.main"}>
      {message}
    </Typography>
  );
}

export default ErrorMessage;
