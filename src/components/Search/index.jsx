import { Box, Grid, TextField } from "@mui/material";

import DateRangePicker from "../DatePicker";
import { useState } from "react";

function Search() {
  const [location, setLocation] = useState("Anywhere");
  return (
    <Grid container direction="column">
      <TextField
        id="outlined-basic"
        label="Where to?"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        variant="outlined"
      />
      <DateRangePicker />
    </Grid>
  );
}

export default Search;
