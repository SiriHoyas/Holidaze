import { Box, Divider, Grid, Modal, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { eachDayOfInterval } from "date-fns";
import { useState } from "react";

import getBookedDates from "../../js/getBookedDates";
import Button from "../Button";
import GuestCountPicker from "../GuestCountPicker/GuestCountPicker";

function getAllBookedDates(bookings) {
  const bookedDates = getBookedDates(bookings ?? []);
  return bookedDates.reduce((dates, booking) => {
    return [...dates, ...booking];
  }, []);
}

function BookingModal({ bookings, open, handleClose }) {
  const [guestCount, setGuestCount] = useState();
  const allBookedDates = getAllBookedDates(bookings);
  function disableDates(date) {
    console.log(date, allBookedDates);
    const dateString = date.$d.toDateString();

    return allBookedDates.includes(dateString);
  }
  return (
    <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", p: "1rem" }}>
      <Grid container rowGap={2} direction={"column"} sx={{ overflow: "scroll", backgroundColor: "white", display: "flex", m: "0 auto", p: "1rem", height: "75%" }}>
        <Typography variant="h2">Booking</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker disablePast={true} shouldDisableDate={disableDates} label="Check in" />
          <DatePicker disablePast={true} shouldDisableDate={disableDates} label="Check out" />
        </LocalizationProvider>
        <GuestCountPicker state={guestCount} setSearchParams={setGuestCount} />
        <Divider />
        <Typography>23. apr - 26. apr (2 nights)</Typography>
        <Grid container direction={"row"} justifyContent={"space-between"}>
          <Typography>Total</Typography>
          <Typography>€445</Typography>
        </Grid>
        <Button label={"Confirm booking"} shape={"square"} />
      </Grid>
    </Modal>
  );
}

export default BookingModal;
