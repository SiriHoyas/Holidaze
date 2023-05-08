import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";

function MoreChoices({ state, setSearchParams }) {
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  const updatedValue = { wifi: wifi, parking: parking, breakfast: breakfast, pets: pets };

  useEffect(() => {
    setSearchParams((choices) => ({
      ...choices,
      ...updatedValue,
    }));
  }, [parking, pets, wifi, breakfast]);

  return (
    <>
      <FormControlLabel
        onChange={() =>
          setParking((prev) => {
            return !prev;
          })
        }
        control={<Checkbox />}
        label="Parking"
      />
      <FormControlLabel
        onChange={() =>
          setPets((prev) => {
            return !prev;
          })
        }
        control={<Checkbox />}
        label="Pets allowed"
      />
      <FormControlLabel
        onChange={() =>
          setWifi((prev) => {
            return !prev;
          })
        }
        control={<Checkbox />}
        label="WiFi"
      />
      <FormControlLabel
        onChange={() =>
          setBreakfast((prev) => {
            return !prev;
          })
        }
        control={<Checkbox />}
        label="Breakfast Included"
      />
    </>
  );
}

export default MoreChoices;
