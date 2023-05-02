import { Box, Checkbox, Divider, FormControlLabel, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material";

import Button from "../Button";
import MinusIcon from "../../assets/icons/MinusIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import { useState } from "react";

function GuestCountPicker() {
  const [adultCount, setAdultCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [bringPet, setBringPet] = useState(false);

  const guestCount = adultCount + childrenCount;
  console.log(guestCount);
  console.log(bringPet);

  //On click på done, oppdater redux

  return (
    <Menu
      open={() => {
        console.log("object");
      }}
    >
      <Grid container rowGap={2} alignItems={"center"} direction={"column"} sx={{ padding: "1rem" }}>
        <Grid container direction={"column"} alignItems={"space-between"}>
          <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography>Adults</Typography>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  if (adultCount !== 0) {
                    setAdultCount(adultCount - 1);
                  }
                }}
              >
                <MinusIcon />
              </IconButton>
              <Typography variant="body1">{adultCount}</Typography>
              <IconButton
                onClick={() => {
                  setAdultCount(adultCount + 1);
                }}
              >
                <PlusIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography>Children</Typography>
            <Grid item sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  if (childrenCount !== 0) {
                    setChildrenCount(childrenCount - 1);
                  }
                }}
              >
                <MinusIcon />
              </IconButton>
              <Typography variant="body1">{childrenCount}</Typography>
              <IconButton
                onClick={() => {
                  setChildrenCount(childrenCount + 1);
                }}
              >
                <PlusIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="middle" />
      <Grid container direction={"column"} sx={{ padding: "1rem" }}>
        <FormControlLabel
          control={<Checkbox />}
          onClick={() => {
            setBringPet((prev) => {
              return !prev;
            });
          }}
          label="I'm bringing a pet"
        />
        <Button label={"Done"} />
      </Grid>
    </Menu>
  );
}

export default GuestCountPicker;
