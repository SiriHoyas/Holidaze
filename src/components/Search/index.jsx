import { ButtonBase, Grid, IconButton, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { hasSetDateRange } from "./../../js/search.js";
import FilterIcon from "../../assets/icons/FilterIcon";
import { sendSearchParams } from "../../store/SearchParamsSlice";
import Button from "../Button";
import DateRangePicker from "../DatePicker";
import GuestCountPicker from "../GuestCountPicker/GuestCountPicker";
import MoreChoices from "./MoreChoices";

function Search() {
  const [showMoreChoices, setShowMoreChoices] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [location, setLocation] = useState("");

  const { keyword, dateFrom, dateTo } = useSelector((store) => {
    return store.searchParams;
  });

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
  }, [location, keyword]);

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
          autoComplete="off"
          id="outlined-basic"
          label="Where to?"
          value={keyword ? keyword : ""}
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
          <ButtonBase focusRipple={true} sx={{ cursor: "pointer", fontSize: "1rem", p: "1rem" }} variant="body2" onClick={openChoices}>
            More choices
          </ButtonBase>
        )}

        <Button
          sx={{ flexGrow: 1 }}
          label="Search"
          size={"large"}
          disabled={!hasSetDateRange(searchParams)}
          onClick={() => {
            dispatch(sendSearchParams(searchParams));
            navigate("/venues");
          }}
        />
      </Grid>
      <AnimatePresence>
        {showMoreChoices && (
          <motion.div key="moreChoices" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35 }}>
            <MoreChoices state={searchParams} setSearchParams={setSearchParams} />
          </motion.div>
        )}
      </AnimatePresence>
    </Grid>
  );
}

export default Search;
