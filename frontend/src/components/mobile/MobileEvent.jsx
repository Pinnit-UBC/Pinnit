import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../../styles/MobileEvent.css";
import MobileEventDrawer from "./MobileEventDrawer";

// Function to format the date consistently to "MMMM D YYYY" (e.g., "October 25 2024")
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function formatTime(time) {
  if (!time) return "N/A";
  const [hours, minutes] = time.split(":");
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function formatTag(tag) {
  return tag
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" & ");
}

function MobileEvent({ event, onEventClick, isHalloweenFilterActive }) {
  const [imageSrc, setImageSrc] = useState(
    event.image_base64 || "/path/to/local/placeholder.png"
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (navigator.onLine && event.image_url && !event.image_base64) {
      const img = new Image();
      img.src = event.image_url;
      img.onload = () => setImageSrc(event.image_url);
      img.onerror = () => setImageSrc("/path/to/local/placeholder.png");
    }
  }, [event.image_url, event.image_base64]);

  const handleEventClick = () => setDrawerOpen(true);

  return (
    <>
      <div className="mobile-event-container" onClick={handleEventClick}>
        <div className="mobile-event-details">
          {/* Show event date above time if Halloween filter is active */}
          {isHalloweenFilterActive && (
            <div className="mobile-event-date">
              {formatDate(event.event_date)}
            </div>
          )}

          <div className="mobile-event-time">
            {event.start_time
              ? event.end_time
                ? `${formatTime(event.start_time)} to ${formatTime(
                    event.end_time
                  )}`
                : formatTime(event.start_time)
              : "Time not available"}
          </div>
          <div className="mobile-event-title">
            {event.event_title || "Title not available"}
          </div>
          <div className="mobile-event-location">
            <img
              src="/assets/mdi_location.png"
              alt="Location Logo"
              className="mobile-location-logo"
            />
            {event.location || "Location not available"}
          </div>
          <div className="mobile-event-host">
            <img
              src="/assets/teenyicons_user-solid.png"
              alt="Host Logo"
              className="mobile-host-logo"
            />
            {event.host_organization || "Host not available"}
          </div>
          <div className="mobile-event-registration">
            <img
              src="/assets/Signing A Document.png"
              alt="Registration Logo"
              className="mobile-registration-logo"
            />
            {event.registration_status || "Registration status not available"}
          </div>

          {/* Tags Section - includes tags, faculty, and degree_level */}
          {((event.tags && event.tags.length > 0) ||
            (event.faculty && event.faculty.length > 0) ||
            (event.degree_level && event.degree_level.length > 0)) && (
            <div className="mobile-event-tags">
              {/* Render event tags */}
              {event.tags &&
                event.tags.map((tag, index) => (
                  <span key={index} className="mobile-tag">
                    {formatTag(tag)}
                  </span>
                ))}

              {/* Render faculty tags */}
              {event.faculty &&
                event.faculty.map((faculty, index) => (
                  <span key={index} className="mobile-tag">
                    {formatTag(faculty)}
                  </span>
                ))}

              {/* Render degree level tags */}
              {event.degree_level &&
                event.degree_level.map((degree, index) => (
                  <span key={index} className="mobile-tag">
                    {formatTag(degree)}
                  </span>
                ))}
            </div>
          )}
        </div>
        <div className="mobile-event-image">
          <img
            src={imageSrc}
            alt="Event"
            onError={(e) => {
              if (navigator.onLine) {
                e.target.src = "/path/to/local/placeholder.png";
              }
            }}
          />
        </div>
      </div>
      <MobileEventDrawer
        event={event}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}

MobileEvent.propTypes = {
  event: PropTypes.shape({
    event_date: PropTypes.string, // Added event_date prop
    start_time: PropTypes.string,
    end_time: PropTypes.string,
    event_title: PropTypes.string,
    host_organization: PropTypes.string,
    location: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    faculty: PropTypes.arrayOf(PropTypes.string),
    degree_level: PropTypes.arrayOf(PropTypes.string),
    image_url: PropTypes.string,
    image_base64: PropTypes.string,
    registration_status: PropTypes.string,
  }).isRequired,
  onEventClick: PropTypes.func.isRequired,
  isHalloweenFilterActive: PropTypes.bool.isRequired, // Prop to check if Halloween filter is active
};

export default MobileEvent;
