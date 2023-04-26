import { Link } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/system";

const ShapedButton = styled(MuiButton)(({ squared }) => ({
  borderRadius: squared ? "6px" : "30px",
}));

function Button({ label, onClick, link, squared = false, ...props }) {
  if (link) {
    return (
      <ShapedButton variant="contained" to={link} component={Link} squared={squared} {...props}>
        {label}
      </ShapedButton>
    );
  }

  return (
    <ShapedButton variant="contained" onClick={onClick} squared={squared} {...props}>
      {label}
    </ShapedButton>
  );
}

export default Button;
