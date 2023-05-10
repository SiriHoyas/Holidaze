import { Grid } from "@mui/material";

import ArrowIcon from "../../assets/icons/ArrowIcon";
import BreakfastIcon from "../../assets/icons/BreakfastIcon";
import ParkingIcon from "../../assets/icons/ParkingIcon";
import PetIcon from "../../assets/icons/PetIcon";
import WifiIcon from "../../assets/icons/WifiIcon";

function MetaIcons({ metaData }) {
  if (metaData) {
    const parking = metaData.parking;
    const breakfast = metaData.breakfast;
    const pets = metaData.pets;
    const wifi = metaData.wifi;

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
