import { Grid, Button as MuiButton, TextField, Typography } from "@mui/material";

import Button from "../UI/Button";
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
    <Grid container direction="column" sx={{ mt: "5rem" }}>
      <Typography variant="h6">Where do you want to go?</Typography>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Where to?"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          variant="outlined"
        />
        <DateRangePicker />
        <Link sx={{ marginTop: "10px" }} variant="body2" onClick={openChoices}>
          More choices
        </Link>
        {showMoreChoices && <MoreChoices />}
        <Button label="Search" size={"large"} sx={{ marginTop: "15px" }} />
      </Grid>
    </Grid>
  );
}

export default Search;
