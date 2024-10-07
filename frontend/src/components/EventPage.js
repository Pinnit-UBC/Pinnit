import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventDrawer from './EventDrawer';

function EventPage() {
  const { eventId } = useParams(); // Get the event ID from the URL parameters
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log(`Fetching event with ID: ${eventId}`); // Debug log

        const response = await fetch(`https://backend-8eis.onrender.com/event/${eventId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch event');
        }

        const data = await response.json();
        console.log('Fetched event data:', data); // Debug log

        if (data) {
          setEvent(data);
        } else {
          console.log('No event found with the given ID.'); // Debug log
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching event:', error);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (loading) {
    return <div>Loading event details...</div>;
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div>
      <EventDrawer event={event} open={true} onClose={() => {}} />
    </div>
  );
}

export default EventPage;
