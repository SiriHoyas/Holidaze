import { Grid, Typography } from "@mui/material";

import ArrowIcon from "../../assets/icons/ArrowIcon";
import BreakfastIcon from "../../assets/icons/BreakfastIcon";
import ParkingIcon from "../../assets/icons/ParkingIcon";
import PetIcon from "../../assets/icons/PetIcon";
import WifiIcon from "../../assets/icons/WifiIcon";

/**
 * Component for rendering icons for parking, wifi, pets and breakfast
 *
 * @component
 * @param {Object} props - Props for the component
 * @param {Object} props.metaData - Object from API containing meta values
 * @param {boolean} [props.fullList] - Indicates whether to render the full list of icons with labels
 * @returns {JSX.Element} - The rendered component
 */
function MetaIcons({ metaData, fullList }) {
  if (metaData) {
    const parking = metaData.parking;
    const breakfast = metaData.breakfast;
    const pets = metaData.pets;
    const wifi = metaData.wifi;

    if (fullList) {
      return (
        <Grid container direction={"column"} rowGap={2}>
          {parking && (
            <Grid container alignItems={"center"}>
              <ParkingIcon />
              <Typography sx={{ ml: ".4rem" }}>Parking available</Typography>
            </Grid>
          )}

          {breakfast && (
            <Grid container alignItems={"center"}>
              <BreakfastIcon />
              <Typography sx={{ ml: ".4rem" }}>Offers breakfast</Typography>
            </Grid>
          )}

          {pets && (
            <Grid container alignItems={"center"}>
              <PetIcon /> <Typography sx={{ ml: ".4rem" }}>Pets allowed</Typography>{" "}
            </Grid>
          )}

          {wifi && (
            <Grid container alignItems={"center"}>
              {" "}
              <WifiIcon /> <Typography sx={{ ml: ".4rem" }}>Free WiFi</Typography>
            </Grid>
          )}
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
