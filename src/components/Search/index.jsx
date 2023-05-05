import { Grid, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import DateRangePicker from "../DatePicker";
import GuestCountPicker from "../GuestCountPicker/GuestCountPicker";
import MoreChoices from "./MoreChoices";

function Search() {
  const [showMoreChoices, setShowMoreChoices] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [location, setLocation] = useState("Anywhere");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const updatedValue = { keyword: location };

    setSearchParams((input) => ({
      ...input,
      ...updatedValue,
    }));
  }, [location]);

  function sendSearch() {
    // navigate("/venues");
    console.log(searchParams);
  }

  function openChoices() {
    setShowMoreChoices((prev) => !prev);
  }

  return (
    <Grid container sx={{ m: "0 auto" }}>
      <Grid container direction={{ xs: "column", lg: "row" }} rowGap={2} columnGap={2} sx={{ mt: "5rem" }} item={true}>
        <Grid container>
          <Typography variant="h6">Where do you want to go?</Typography>
        </Grid>
        <TextField
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
        <Button sx={{ flexGrow: 1 }} label="Search" size={"large"} onClick={sendSearch} />
      </Grid>
      <Grid>
        <Link sx={{ cursor: "pointer" }} variant="body2" onClick={openChoices} alignContent={"flex-start"}>
          More choices
        </Link>
        <Grid container direction={{ xs: "column", md: "row" }}>
          {showMoreChoices && <MoreChoices state={searchParams} setSearchParams={setSearchParams} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Search;
