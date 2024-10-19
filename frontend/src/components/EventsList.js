import React, { useState, useEffect } from 'react';
import Event from './Event';
import EventDrawer from './EventDrawer';
import Filter from './Filter';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

function EventsList({ events }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [isHalloweenFilterActive, setIsHalloweenFilterActive] = useState(false);

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

  const handleHalloweenClick = async () => {
    try {
      const response = await fetch('https://backend-8eis.onrender.com/halloween-events');
      const data = await response.json();
  
      const today = dayjs().startOf('day');
  
      const upcomingEvents = data
        .filter(event => {
          const eventDate = dayjs(event.event_date, ['MMMM D YYYY', 'YYYY-MM-DD'], true);
          return eventDate.isSame(today) || eventDate.isAfter(today);
        })
        .sort((a, b) => {
          const dateA = dayjs(a.event_date, ['MMMM D YYYY', 'YYYY-MM-DD'], true);
          const dateB = dayjs(b.event_date, ['MMMM D YYYY', 'YYYY-MM-DD'], true);
  
          if (dateA.isBefore(dateB)) return -1;
          if (dateA.isAfter(dateB)) return 1;
  
          const timeA = dayjs(a.start_time, 'h:mm A', true);
          const timeB = dayjs(b.start_time, 'h:mm A', true);
  
          if (timeA.isBefore(timeB)) return -1;
          if (timeA.isAfter(timeB)) return 1;
  
          return 0;
        });
  
      setFilteredEvents(upcomingEvents);
      setIsHalloweenFilterActive(true);
    } catch (error) {
      console.error('Error fetching Halloween events:', error);
    }
  };

  useEffect(() => {
    setFilteredEvents(events);
    setIsHalloweenFilterActive(false);
  }, [events]);

  return (
    <>
      <Filter 
        onFilterChange={handleFilterChange} 
        onHalloweenClick={handleHalloweenClick} 
      />
      <section id="events">
        {filteredEvents.map(event => (
          <Event 
            key={event._id} 
            event={event} 
            onEventClick={handleEventClick} 
            isHalloweenFilterActive={isHalloweenFilterActive} 
          />
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
