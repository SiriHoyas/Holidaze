import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { Divider, Grid, Modal, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { API_ROOT } from "../../js/constants";
import { dateFormatter } from "../../js/dateFormatter";
import getBookedDates from "../../js/getBookedDates";
import getLocalStorage from "../../js/getLocalStorage";
import { getTotalPrice } from "../../js/getTotalPrice";
import Button from "../Button";
import GuestCountPicker from "../GuestCountPicker/GuestCountPicker";

/**
 *
 * @param {*} bookings
 * @returns
 */
function getAllBookedDates(bookings) {
  const bookedDates = getBookedDates(bookings ?? []);
  return bookedDates.reduce((dates, booking) => {
    return [...dates, ...booking];
  }, []);
}
const { accessToken } = getLocalStorage();

function BookingModal({ bookings, id, name, pricePerNight, maxGuestCount }) {
  const [guestCount, setGuestCount] = useState();
  const [checkInDate, setcheckInDate] = useState(null);
  const [checkOutDate, setcheckOutDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [convertedFromDate, setConvertedFromDate] = useState();
  const [convertedToDate, setConvertedToDate] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const allBookedDates = getAllBookedDates(bookings);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  function handleClose() {
    setOpen(false);
    setcheckInDate(null);
    setcheckOutDate(null);
    setTotalPrice(0);
    setIsButtonDisabled(true);
    setBookingSuccess(false);
  }

  function disableDates(date) {
    const dateString = date.$d.toDateString();
    return allBookedDates.includes(dateString);
  }

  useEffect(() => {
    if (checkInDate !== null && checkOutDate !== null) {
      const price = getTotalPrice(pricePerNight, checkInDate, checkOutDate);
      const formattedFrom = dateFormatter(checkInDate);
      const formattedTo = dateFormatter(checkOutDate);
      setConvertedFromDate(formattedFrom);
      setConvertedToDate(formattedTo);
      setTotalPrice(price);
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [checkInDate, checkOutDate]);

  async function handleBooking() {
    const body = {
      dateFrom: checkInDate,
      dateTo: checkOutDate,
      guests: guestCount.guestCount,
      venueId: id,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    try {
      const response = await fetch(`${API_ROOT}/bookings`, options);
      console.log(response);
      if (response.ok) {
        setBookingSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button shape="square" onClick={handleOpen} label={"Book"} sx={{ width: "fit-content" }} />
      <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll", p: "1rem" }}>
        {!bookingSuccess ? (
          <Grid container rowGap={2} direction={"column"} sx={{ overflow: "scroll", backgroundColor: "white", display: "flex", m: "0 auto", p: "1rem" }}>
            <Typography variant="h2">Booking</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker maxDate={checkOutDate !== null ? dayjs(checkOutDate) : undefined} disablePast={true} shouldDisableDate={disableDates} value={checkInDate} onChange={(date) => setcheckInDate(date.$d)} label="Check in *" />
              <DatePicker minDate={checkInDate !== null ? dayjs(checkInDate) : undefined} disablePast={true} shouldDisableDate={disableDates} value={checkOutDate} onChange={(date) => setcheckOutDate(date.$d)} label="Check out *" />
            </LocalizationProvider>
            <GuestCountPicker maxGuests={maxGuestCount} state={guestCount} setSearchParams={setGuestCount} />
            <Divider />
            {checkInDate !== null && checkOutDate !== null && (
              <Typography>
                {convertedFromDate} - {convertedToDate}
              </Typography>
            )}
            <Grid container direction={"row"} justifyContent={"space-between"}>
              <Typography>Total</Typography>
              <Typography>€{totalPrice}</Typography>
            </Grid>
            <Button
              onClick={() => {
                handleBooking();
              }}
              label={"Confirm booking"}
              shape={"square"}
              disabled={isButtonDisabled}
            />
          </Grid>
        ) : (
          <Grid container rowGap={2} alignItems={"center"} direction={"column"} sx={{ backgroundColor: "white", p: "3rem" }}>
            <Typography align="center" variant="h5">
              Booking confirmed
            </Typography>
            <Grid item>
              <CheckCircleOutlineRoundedIcon sx={{ width: "40px", height: "40px" }} />
            </Grid>
            <Typography variant="body1">We're looking forward to your stay!</Typography>
            <Divider />
            <Typography>You've booked {name}</Typography>
            <Typography>
              {convertedFromDate} - {convertedToDate}
            </Typography>
            <Button label="Close" fullWidth onClick={handleClose} />
          </Grid>
        )}
      </Modal>
    </>
  );
}

export default BookingModal;
