import React, { useState, useEffect } from 'react';
import Event from './Event';
import EventDrawer from './EventDrawer';
import Filter from './Filter';

function EventsList({ events }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  const handleFilterChange = (selectedTags, selectedFaculty, selectedDegreeLevel) => {
    const filtered = events.filter(event => {
      const matchTags = selectedTags.length === 0 || event.tags.some(tag => selectedTags.includes(tag));
      const matchFaculty = selectedFaculty.length === 0 || event.faculty.some(fac => selectedFaculty.includes(fac));
      const matchDegreeLevel = selectedDegreeLevel.length === 0 || event.degree_level.some(degree => selectedDegreeLevel.includes(degree));
      return matchTags && matchFaculty && matchDegreeLevel;
    });

    setFilteredEvents(filtered);
  };

  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  return (
    <>
      <Filter onFilterChange={handleFilterChange} />
      <section id="events">
        {filteredEvents.map(event => (
          <Event key={event._id} event={event} onEventClick={handleEventClick} />
        ))}
      </section>
      <EventDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        event={selectedEvent}
      />
    </>
  );
}

export default EventsList;
