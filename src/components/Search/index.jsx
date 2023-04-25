import DateRangePicker from "../DatePicker";
import { TextField } from "@mui/material";
import { useState } from "react";

function Search() {
  const [location, setLocation] = useState("Anywhere");
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Where to?"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
        variant="outlined"
      />
      <DateRangePicker />
    </>
  );
}

export default Search;
