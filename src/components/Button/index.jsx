import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

const ShapedButton = styled(MuiButton)(({ shape }) => ({
  borderRadius: shape === "square" ? "6px" : "30px",
  boxShadow: "none",
  backgroundColor: "#385E97",
}));

/**
 * A button component that can be customized with props
 * @component
 * @param {Object} props - Props for the component
 * @param {string} props.label - The label (What is being showed on the button)
 * @param {function} [props.onClick] - The on click function
 * @param {string} [props.link] - If provided, the button navigates to the given path
 * @returns {JSX.Element} - The rendered button component
 */

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
