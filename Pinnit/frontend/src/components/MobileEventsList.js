import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MobileEvent from './MobileEvent';
import '../styles/MobileEventsList.css';

function MobileEventsList({ events, onEventClick }) {
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    setFilteredEvents(events); // Reset filtered events whenever the events prop changes
  }, [events]);

  if (!filteredEvents || filteredEvents.length === 0) {
    return <div>No events found for the selected filters.</div>;
  }

  return (
    <section id="mobile-events">
      {filteredEvents.map(event => (
        <MobileEvent key={event._id} event={event} onEventClick={onEventClick} />
      ))}
    </section>
  );
}

MobileEventsList.propTypes = {
  events: PropTypes.array.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default MobileEventsList;
