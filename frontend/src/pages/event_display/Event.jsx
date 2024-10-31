import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LabelIcon from "@mui/icons-material/Label";
import "./Event.css";

// Function to format the date consistently to "MMMM D YYYY" (e.g., "October 25 2024")
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Function to format the time (e.g., "10:00pm")
function formatTime(time) {
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

function Event({ event, onEventClick, isHalloweenFilterActive }) {
  const [imageSrc, setImageSrc] = useState(
    event.image_base64 || "/path/to/local/placeholder.png"
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.onLine && event.image_url && !event.image_base64) {
      const img = new Image();
      img.src = event.image_url;
      img.onload = () => setImageSrc(event.image_url);
      img.onerror = () => setImageSrc("/path/to/local/placeholder.png");
    }
  }, [event.image_url, event.image_base64]);

  const handleClick = () => {
    if (onEventClick) {
      onEventClick(event);
    }
    if (event._id) {
      navigate(`/event/${event._id}`);
    } else {
      console.error("Event ID is undefined");
    }
  };

  return (
    <div className="event-container gap-5 justify-start" onClick={handleClick}>
      <div className="w-[250px] h-[250px] flex-none relative overflow-hidden rounded-lg flex items-center justify-center">
        <img
          src={imageSrc}
          alt="Event"
          className="object-cover"
          onError={(e) => {
            if (navigator.onLine) {
              e.target.src = "/path/to/local/placeholder.png";
            }
          }}
        />
      </div>
      <div className="flex-grow flex-col flex gap-y-1">
        <div className="event-title leading-tight">{event.event_title}</div>
        <div className="event-date">{formatDate(event.event_date)}</div>
        <div className="event-time">
          {formatTime(event.start_time)}
          {event.end_time && ` to ${formatTime(event.end_time)}`}
        </div>

        <div className="event-location">
          <LocationOnIcon style={{ color: "white" }} className="mr-1" />
          {event.location}
        </div>

        {/* Host Organization */}
        <div className="event-host">
          <PersonIcon style={{ color: "white" }} className="mr-1" />
          {event.host_organization}
        </div>

        {/* Registration Status */}
        <div className="event-registration">
          <AppRegistrationIcon style={{ color: "white" }} className="mr-1" />
          {event.registration_status}
        </div>

        {/* Tags */}
        <div className="event-tags flex-wrap mt-1">
          <LabelIcon style={{ color: "white" }} className="mr-1" />
          {event.tags &&
            event.tags.map((tag, index) => (
              <span key={index} className="tag">
                {formatTag(tag)}
              </span>
            ))}
          {event.faculty &&
            event.faculty.map((faculty, index) => (
              <span key={index} className="tag">
                {formatTag(faculty)}
              </span>
            ))}
          {event.degree_level &&
            event.degree_level.map((degree, index) => (
              <span key={index} className="tag">
                {formatTag(degree)}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

Event.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    event_date: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string,
    event_title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    host_organization: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    faculty: PropTypes.arrayOf(PropTypes.string),
    degree_level: PropTypes.arrayOf(PropTypes.string),
    image_url: PropTypes.string,
    image_base64: PropTypes.string,
    registration_status: PropTypes.string.isRequired,
  }).isRequired,
  onEventClick: PropTypes.func.isRequired,
  isHalloweenFilterActive: PropTypes.bool.isRequired, // Prop to check if Halloween filter is active
};

export default Event;
