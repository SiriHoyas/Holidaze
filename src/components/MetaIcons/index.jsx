import { Grid, Typography } from "@mui/material";

import ArrowIcon from "../../assets/icons/ArrowIcon";
import BreakfastIcon from "../../assets/icons/BreakfastIcon";
import ParkingIcon from "../../assets/icons/ParkingIcon";
import PetIcon from "../../assets/icons/PetIcon";
import WifiIcon from "../../assets/icons/WifiIcon";

/**
 *
 * @param {*} param0
 * @returns
 */
function MetaIcons({ metaData, fullList }) {
  if (metaData) {
    const parking = metaData.parking;
    const breakfast = metaData.breakfast;
    const pets = metaData.pets;
    const wifi = metaData.wifi;
    console.log(fullList);

    if (fullList) {
      return (
        <Grid container direction={"column"} rowGap={2}>
          <Grid container alignItems={"center"}>
            {parking && <ParkingIcon />}
            <Typography sx={{ ml: ".4rem" }}>Parking available</Typography>
          </Grid>
          <Grid container alignItems={"center"}>
            {breakfast && <BreakfastIcon />}
            <Typography sx={{ ml: ".4rem" }}>Offers breakfast</Typography>
          </Grid>
          <Grid container alignItems={"center"}>
            {pets && <PetIcon />}
            <Typography sx={{ ml: ".4rem" }}>Pets allowed</Typography>
          </Grid>
          <Grid container alignItems={"center"}>
            {wifi && <WifiIcon />}
            <Typography sx={{ ml: ".4rem" }}>Free WiFi</Typography>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid container columnGap={1}>
        {parking && <ParkingIcon />}
        {breakfast && <BreakfastIcon />}
        {pets && <PetIcon />}
        {wifi && <WifiIcon />}
      </Grid>
    );
  }
  return <>ERROR</>;
}

export default MetaIcons;
