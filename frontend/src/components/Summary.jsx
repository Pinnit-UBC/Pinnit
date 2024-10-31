import React, { useContext } from "react";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import "../styles/Summary.css";
import { EventContext } from "../providers/EventsProvider";

const Summary = ({ eventCount, sponsoredEvent, onSponsoredEventClick }) => {
  const { events } = useContext(EventContext);
  console.log(events);
  return (
    <section id="summary">
      <div className="summary-container">
        <div className="summary-numbers-wrapper">
          <div className="summary-et-numbers">{events.length}</div>
          <div className="summary-et-titles">Events today</div>
        </div>
        <Divider sx={{ bgcolor: "#fff", width: "100%", height: "2px" }} />
        <div
          className="sponsored-event"
          onClick={() => {
            console.log("Sponsored event clicked in Summary");
            onSponsoredEventClick();
          }}
        >
          <img src="fire.png" alt="Fire Logo" className="left-logo" />
          {sponsoredEvent ? <span>{sponsoredEvent.event_title}</span> : null}
        </div>
      </div>
    </section>
  );
};

Summary.propTypes = {
  eventCount: PropTypes.number.isRequired,
  sponsoredEvent: PropTypes.object,
  onSponsoredEventClick: PropTypes.func.isRequired,
};

export default Summary;
