import { Grid, TextField, Typography } from "@mui/material";

import Button from "../Button";
import DateRangePicker from "../DatePicker";
import Link from "@mui/material/Link";
import MoreChoices from "./MoreChoices";
import { useState } from "react";

function Search() {
  const [location, setLocation] = useState("Anywhere");
  const [showMoreChoices, setShowMoreChoices] = useState(false);

  function openChoices() {
    setShowMoreChoices((prev) => !prev);
  }

  return (
    <Grid container direction={{ xs: "column", md: "row" }} rowGap={2} columnGap={2} sx={{ mt: "5rem" }}>
      <Grid container>
        <Typography variant="h6">Where do you want to go?</Typography>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Where to?"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          variant="outlined"
        />
      </Grid>
      <DateRangePicker />
      <Link sx={{ marginTop: "10px", cursor: "pointer" }} variant="body2" onClick={openChoices} alignContent={"flex-start"}>
        More choices
      </Link>
      <Button label="Search" size={"large"} />
      <Grid container direction={{ xs: "column", md: "row" }}>
        {showMoreChoices && <MoreChoices />}
      </Grid>
    </Grid>
  );
}

export default Search;
