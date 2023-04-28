import "dayjs/locale/de";
import "dayjs/locale/en-gb";
import "dayjs/locale/zh-cn";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";

function DateRangePicker() {
  const [checkInDate, setcheckInDate] = useState(dayjs);
  const [checkOutDate, setcheckOutDate] = useState(dayjs);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item rowGap={2} columnGap={2}>
        <DatePicker disablePast={true} value={checkInDate} onChange={(newValue) => setcheckInDate(newValue)} label="Check in *" slotProps={{ textField: { fullWidth: true } }} />
      </Grid>
      <Grid item rowGap={2} columnGap={2}>
        <DatePicker disablePast={true} value={checkOutDate} onChange={(newValue) => setcheckOutDate(newValue)} label="Check out *" slotProps={{ textField: { fullWidth: true } }} />
      </Grid>
    </LocalizationProvider>
  );
}

export default DateRangePicker;
