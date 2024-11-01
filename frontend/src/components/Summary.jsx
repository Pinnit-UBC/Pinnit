import React, { useEffect, useContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import Divider from "@mui/material/Divider";
import "../styles/Summary.css";
import { EventContext } from "../providers/EventsProvider";

const Summary = ({ eventCount, sponsoredEvent, onSponsoredEventClick }) => {
  const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef(null);
  const stickyTriggerRef = useRef(null);

  useEffect(() => {
    const stickyTrigger = stickyTriggerRef.current;
    const menu = menuRef.current;

    if (!stickyTrigger || !menu) return;

    const observer = new IntersectionObserver(
      ([e]) => {
        setIsSticky(e.intersectionRatio < 1);
      },
      { threshold: [1] }
    );

    observer.observe(stickyTrigger);

    return () => {
      observer.unobserve(stickyTrigger);
    };
  }, []);

  const { events } = useContext(EventContext);
  return (
    <div>
      {/* Sticky trigger element */}
      <div ref={stickyTriggerRef} className="h-1" />

      {/* Menu */}
      <div
        id="summary"
        ref={menuRef}
        className={` ${isSticky ? "fixed top-4 right-4" : "relative"}`}
        style={{ maxHeight: "calc(100vh - 2rem)" }}
      >
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
      </div>
    </div>
  );
};

Summary.propTypes = {
  eventCount: PropTypes.number.isRequired,
  sponsoredEvent: PropTypes.object,
  onSponsoredEventClick: PropTypes.func.isRequired,
};

export default Summary;
