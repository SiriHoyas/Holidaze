import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import { Checkbox, Divider, FormControlLabel, Grid, IconButton, Menu, Typography } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import MinusIcon from "../../assets/icons/MinusIcon";
import PlusIcon from "../../assets/icons/PlusIcon";
import { updateGuestCount } from "../../store/SearchParamsSlice";
import Button from "../Button";

function GuestCountPicker({ state, setSearchParams }) {
  const [adultCount, setAdultCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [bringPet, setBringPet] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const guestCountSum = adultCount + childrenCount;

  useEffect(() => {
    const updatedValue = { guestCount: guestCountSum, pets: bringPet };

    setSearchParams((guests) => ({
      ...guests,
      ...updatedValue,
    }));
  }, [adultCount, childrenCount, bringPet]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container>
      <MuiButton sx={{ height: "56px" }} fullWidth variant="outlined" startIcon={<PersonAddAlt1RoundedIcon />} size="large" id="guest-picker" aria-controls={open ? "guest-picker" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
        {guestCountSum} Guests
      </MuiButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "guest-picker",
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
          <Button label={"Done"} onClick={handleClose} />
        </Grid>
      </Menu>
    </Grid>
  );
}

export default GuestCountPicker;
