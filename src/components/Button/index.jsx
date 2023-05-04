import { Link } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/system";

const ShapedButton = styled(MuiButton)(({ shape }) => ({
  borderRadius: shape === "square" ? "6px" : "30px",
  boxShadow: "none",
}));

function Button({ label, onClick, link, ...props }) {
  if (link) {
    return (
      <ShapedButton variant="contained" to={link} component={Link} {...props}>
        {label}
      </ShapedButton>
    );
  }

  return (
    <ShapedButton variant="contained" onClick={onClick} {...props}>
      {label}
    </ShapedButton>
  );
}

export default Button;
