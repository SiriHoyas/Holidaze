import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function MoreChoices({ state, setSearchParams }) {
  const updatedValue = { guestCount: guestCountSum };
  console.log(updatedValue);

  setSearchParams((choices) => ({
    ...choices,
    ...updatedValue,
  }));
  return (
    <>
      <FormControlLabel control={<Checkbox />} label="Parking" />
      <FormControlLabel control={<Checkbox />} label="Pets allowed" />
      <FormControlLabel control={<Checkbox />} label="WiFi" />
      <FormControlLabel control={<Checkbox />} label="Breakfast Included" />
    </>
  );
}

export default MoreChoices;
