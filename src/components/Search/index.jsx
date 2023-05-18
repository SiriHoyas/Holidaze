import { ButtonBase, Grid, IconButton, TextField, Typography, useMediaQuery, useTheme, useThemeProps } from "@mui/material";
import Link from "@mui/material/Link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import FilterIcon from "../../assets/icons/FilterIcon";
import { sendSearchParams } from "../../store/SearchParamsSlice";
import Button from "../Button";
import DateRangePicker from "../DatePicker";
import GuestCountPicker from "../GuestCountPicker/GuestCountPicker";
import MoreChoices from "./MoreChoices";

function Search({ params }) {
  const [showMoreChoices, setShowMoreChoices] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [location, setLocation] = useState("Anywhere");

  const theme = useTheme();
  const laptopScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const mobileScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const updatedValue = { keyword: location };

    setSearchParams((input) => ({
      ...input,
      ...updatedValue,
    }));
  }, [location]);

  function openChoices() {
    setShowMoreChoices((prev) => !prev);
  }

  return (
    <Grid container xs={12} item={true}>
      <Grid container xs={12} rowGap={2} columnGap={2} direction={{ xs: "column", lg: "row" }} item={true}>
        <Grid container direction={"column"}>
          <Typography variant="h6">Where do you want to go?</Typography>
        </Grid>
        <TextField
          sx={{ flexGrow: 1 }}
          id="outlined-basic"
          label="Where to?"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          variant="outlined"
        />
        <Grid item>
          <GuestCountPicker state={searchParams} setSearchParams={setSearchParams} />
        </Grid>
        <DateRangePicker state={searchParams} setSearchParams={setSearchParams} />
        {laptopScreen && (
          <IconButton onClick={openChoices}>
            <FilterIcon />
          </IconButton>
        )}
        {mobileScreen && (
          <ButtonBase focusRipple={true} sx={{ cursor: "pointer" }} variant="body2" onClick={openChoices} alignContent={"flex-start"}>
            More choices
          </ButtonBase>
        )}

        <Button
          sx={{ flexGrow: 1 }}
          label="Search"
          size={"large"}
          onClick={() => {
            dispatch(sendSearchParams(searchParams));
            navigate(params ? `/venues/?search=${params}` : "/venues");
          }}
        />
      </Grid>
      <Grid>
        <Grid container direction={{ xs: "column", md: "row" }} sx={{ transition: "ease-in-out, 500ms" }}>
          {showMoreChoices && <MoreChoices state={searchParams} setSearchParams={setSearchParams} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Search;
