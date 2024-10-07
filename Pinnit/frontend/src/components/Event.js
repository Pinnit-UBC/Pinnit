import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles/Event.css';

function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const period = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes}${period}`;
}

function formatTag(tag) {
  return tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' & ');
}

function Event({ event, onEventClick }) {
  const [imageSrc, setImageSrc] = useState(
    event.image_base64 || '/path/to/local/placeholder.png'
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.onLine && event.image_url && !event.image_base64) {
      const img = new Image();
      img.src = event.image_url;
      img.onload = () => setImageSrc(event.image_url);
      img.onerror = () => setImageSrc('/path/to/local/placeholder.png');
    }
  }, [event.image_url, event.image_base64]);

  const handleClick = () => {
    if (onEventClick) {
      onEventClick(event);
    }
    if (event._id) { // Ensure that the event ID is available
      navigate(`/event/${event._id}`);
    } else {
      console.error("Event ID is undefined");
    }
  };

  return (
    <div className="event-container" onClick={handleClick}>
      <div className="event-details">
        <div className="event-time">
          {formatTime(event.start_time)}
          {event.end_time && ` to ${formatTime(event.end_time)}`}
        </div>
        <div className="event-title">{event.event_title}</div>
        <div className="event-location">
          <img src="/assets/mdi_location.png" alt="Location Logo" className="location-logo" />
          {event.location}
        </div>
        <div className="event-host">
          <img src="/assets/teenyicons_user-solid.png" alt="Host Logo" className="host-logo" />
          {event.host_organization}
        </div>
        <div className="event-registration">
          <img src="/assets/Signing A Document.png" alt="Registration Logo" className="registration-logo" />
          {event.registration_status}
        </div>
        <div className="event-tags">
          <img src="/assets/Tag.png" alt="Tag Icon" className="tag-logo" />
          {event.tags && event.tags.map((tag, index) => (
            <span key={index} className="tag">
              {formatTag(tag)}
            </span>
          ))}
          {event.faculty && event.faculty.map((faculty, index) => (
            <span key={index} className="tag">
              {formatTag(faculty)}
            </span>
          ))}
          {event.degree_level && event.degree_level.map((degree, index) => (
            <span key={index} className="tag">
              {formatTag(degree)}
            </span>
          ))}
        </div>
      </div>
      <div className="event-image">
        <img 
          src={imageSrc} 
          alt="Event" 
          onError={(e) => {
            if (navigator.onLine) {
              e.target.src = '/path/to/local/placeholder.png';
            }
          }}
        />
      </div>
    </div>
  );
}

Event.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string, // Ensure that _id is included in the propTypes
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
};

export default Event;
