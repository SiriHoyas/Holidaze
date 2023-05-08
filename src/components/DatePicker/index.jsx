import "dayjs/locale/de";
import "dayjs/locale/en-gb";
import "dayjs/locale/zh-cn";

import { Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function DateRangePicker({ state, setSearchParams }) {
  const [checkInDate, setcheckInDate] = useState(dayjs);
  const [checkOutDate, setcheckOutDate] = useState(dayjs);

  useEffect(() => {
    const updatedValue = { dateFrom: checkInDate, dateTo: checkOutDate };

    setSearchParams((guests) => ({
      ...guests,
      ...updatedValue,
    }));
  }, [checkInDate, checkOutDate]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item rowGap={2} columnGap={2}>
        <DatePicker disablePast={true} value={checkInDate} onChange={(date) => setcheckInDate(date.$d)} label="Check in *" slotProps={{ textField: { fullWidth: true } }} />
      </Grid>
      <Grid item rowGap={2} columnGap={2}>
        <DatePicker disablePast={true} value={checkOutDate} onChange={(date) => setcheckOutDate(date.$d)} label="Check out *" slotProps={{ textField: { fullWidth: true } }} />
      </Grid>
    </LocalizationProvider>
  );
}

export default DateRangePicker;
