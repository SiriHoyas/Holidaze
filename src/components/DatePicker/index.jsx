import "dayjs/locale/de";
import "dayjs/locale/en-gb";
import "dayjs/locale/zh-cn";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { updateDateFrom, updateDateTo, updateGuestCount } from "../../store/SearchParamsSlice";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { useState } from "react";

function DateRangePicker() {
  const [checkInDate, setcheckInDate] = useState(dayjs);
  const [checkOutDate, setcheckOutDate] = useState(dayjs);
  const dispatch = useDispatch();

  function setFromDate(value) {
    setcheckInDate(value);
    console.log(value.$d.toString());

    dispatch(updateDateFrom({ dateFrom: new Date(value.$d) }));
  }

  function setToDate(value) {
    setcheckOutDate(value);

    dispatch(updateDateTo({ dateTo: new Date(value.$d) }));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item rowGap={2} columnGap={2}>
        <DatePicker disablePast={true} value={checkInDate} onChange={setFromDate} label="Check in *" slotProps={{ textField: { fullWidth: true } }} />
      </Grid>
      <Grid item rowGap={2} columnGap={2}>
        <DatePicker disablePast={true} value={checkOutDate} onChange={setToDate} label="Check out *" slotProps={{ textField: { fullWidth: true } }} />
      </Grid>
    </LocalizationProvider>
  );
}

export default DateRangePicker;
