import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EventPage = () => {
  const { eventId } = useParams(); // Get the event ID from the URL parameters
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      console.log(eventId);
      try {
        console.log(`Fetching event with ID: ${eventId}`); // Debug log

        const response = await fetch(`http://localhost:3001/event/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event");
        }

        const data = await response.json();
        console.log("Fetched event data:", data); // Debug log

        console.log(data);

        if (data) {
          setEvent(data);
        } else {
          console.log("No event found with the given ID."); // Debug log
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
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
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <img
        src={event.image_url}
        alt={event.event_title}
        className="w-full object-cover rounded-md"
      />
      <h1 className="mt-4 text-2xl font-semibold text-gray-800">
        {event.event_title}
      </h1>
      <p className="text-gray-600 text-sm mt-2">
        Hosted by: {event.host_organization}
      </p>
      <p className="text-gray-500 text-sm mt-1">
        Date: <span className="font-medium">{event.event_date}</span>
      </p>
      <p className="text-gray-500 text-sm">
        Time:{" "}
        <span className="font-medium">
          {event.start_time} - {event.end_time}
        </span>
      </p>
      <p className="text-gray-500 text-sm mt-1">Location: {event.location}</p>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">About the Event</h2>
        <p className="text-gray-600 mt-2 whitespace-pre-line">
          {event.activity_description}
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold text-gray-700">Registration</h2>
        <p className="text-gray-600">{event.registration_status}</p>
      </div>

      <div className="mt-4">
        <a
          href={event.reference_link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default EventPage;
