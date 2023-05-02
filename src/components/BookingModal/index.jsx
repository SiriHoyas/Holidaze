import { Box, Modal, Typography } from "@mui/material";

import BookingCalendar from "../BookingCalendar";
import Button from "../Button";
import { useState } from "react";

function BookingModal({ data }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen} label={"Book"} />
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ backgroundColor: "white" }}>
          <BookingCalendar bookings={data.bookings} />
        </Box>
      </Modal>
    </>
  );
}

export default BookingModal;
