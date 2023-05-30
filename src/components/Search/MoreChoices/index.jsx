import { Checkbox, FormControlLabel, FormGroup, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MoreChoices({ state, setSearchParams }) {
  const [parkingInput, setParkingInput] = useState(false);
  const [petsInput, setPetsInput] = useState(false);
  const [wifiInput, setWifiInput] = useState(false);
  const [breakfastInput, setBreakfastInput] = useState(false);

  const updatedValue = { wifi: wifiInput, parking: parkingInput, breakfast: breakfastInput, pets: petsInput };

  const { keyword, dateFrom, dateTo, guestCount, wifi, parking, breakfast, pets } = useSelector((store) => {
    return store.searchParams;
  });
  console.log(parking);

  useEffect(() => {
    setSearchParams((choices) => ({
      ...choices,
      ...updatedValue,
    }));
  }, [parkingInput, petsInput, wifiInput, breakfastInput]);

  return (
    <Grid container sx={{ mt: "1rem" }}>
      <FormControlLabel
        onChange={() =>
          setParkingInput((prev) => {
            return !prev;
          })
        }
        control={<Checkbox defaultChecked={parking} />}
        label="Parking"
      />
      <FormControlLabel
        onChange={() =>
          setPetsInput((prev) => {
            return !prev;
          })
        }
        control={<Checkbox defaultChecked={pets} />}
        label="Pets allowed"
      />
      <FormControlLabel
        onChange={() =>
          setWifiInput((prev) => {
            return !prev;
          })
        }
        control={<Checkbox defaultChecked={wifi} />}
        label="WiFi"
      />
      <FormControlLabel
        onChange={() =>
          setBreakfastInput((prev) => {
            return !prev;
          })
        }
        control={<Checkbox defaultChecked={breakfast} />}
        label="Breakfast Included"
      />
    </Grid>
  );
}

export default MoreChoices;
