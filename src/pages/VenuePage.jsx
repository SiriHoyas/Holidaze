import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import BookingCalendar from "../components/BookingCalendar";
import BookingModal from "../components/BookingModal";
import Button from "../components/Button";
import ImgCarousel from "../components/ImgCarousel";
import UseApi from "../hooks/UseApi";

function VenuePage() {
  const { venueID } = useParams();
  const [expanded, setExpanded] = useState("panel1");

  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  const { data } = UseApi(`https://api.noroff.dev/api/v1/holidaze/venues/${venueID}?_owner=true&_bookings=true`, options);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  if (data) {
    return (
      <Grid container direction={"column"} sx={{ mt: "6rem" }}>
        <Grid container>
          <ImgCarousel data={data.media} title={data.name} />
        </Grid>
        <Grid item>
          <BookingModal data={data} />
        </Grid>
        <Grid item>
          <Accordion variant="outlined" disableGutters={true} expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
              <Typography>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{data.description}</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion variant="outlined" disableGutters={true} expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
              <Typography>We offer</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Venue meta</Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    );
  }
}

export default VenuePage;
