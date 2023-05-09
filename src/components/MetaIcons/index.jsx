import { Grid } from "@mui/material";

import ArrowIcon from "../../assets/icons/ArrowIcon";
import BreakfastIcon from "../../assets/icons/BreakfastIcon";
import PetIcon from "../../assets/icons/PetIcon";
import WifiIcon from "../../assets/icons/WifiIcon";

function MetaIcons({ metaData }) {
  if (metaData) {
    const parking = metaData.parking;
    const breakfast = metaData.breakfast;
    const pets = metaData.pets;
    const wifi = metaData.wifi;

    return (
      <Grid container columnGap={2}>
        {parking && <ArrowIcon />}
        {breakfast && <BreakfastIcon />}
        {pets && <PetIcon />}
        {wifi && <WifiIcon />}
      </Grid>
    );
  }
  return <>ERROR</>;
}

export default MetaIcons;
