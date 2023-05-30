import "dayjs/locale/de";
import "dayjs/locale/en-gb";
import "dayjs/locale/zh-cn";

import { Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function DateRangePicker({ setSearchParams }) {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const { dateFrom, dateTo } = useSelector((store) => store.searchParams);

  useEffect(() => {
    setCheckInDate(dateFrom || null);
    setCheckOutDate(dateTo || null);
  }, [dateFrom, dateTo]);

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
        <DatePicker disablePast={true} format="DD/MM/YYYY" maxDate={dayjs(checkOutDate)} value={checkInDate ? dayjs(checkInDate) : null} onChange={(date) => setCheckInDate(date.$d)} label="Check in *" slotProps={{ textField: { fullWidth: true } }} />
      </Grid>
      <Grid item rowGap={2} columnGap={2}>
        <DatePicker disablePast={true} format="DD/MM/YYYY" minDate={dayjs(checkInDate)} value={checkOutDate ? dayjs(checkOutDate) : null} onChange={(date) => setCheckOutDate(date.$d)} label="Check out *" slotProps={{ textField: { fullWidth: true } }} />
      </Grid>
    </LocalizationProvider>
  );
}

export default DateRangePicker;
