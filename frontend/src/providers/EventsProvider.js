import React, { useState, useEffect, createContext } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import {
  cacheEvents,
  loadCachedEvents,
  cacheSponsoredEvent,
  loadCachedSponsoredEvent,
} from "../cache";

dayjs.extend(customParseFormat);
export const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [sponsoredEvent, setSponsoredEvent] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  // Fetches events from the backend or cache when the selected date changes
  useEffect(() => {
    async function fetchEvents(date) {
      if (navigator.onLine) {
        try {
          const response = await fetch(
            `https://backend-8eis.onrender.com/events?date=${date}`
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            setEvents(data);
            setFilteredEvents(data);
            await cacheEvents(date, data);
          } else {
            console.error("Error: Data is not an array");
          }
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      } else {
        const cachedData = await loadCachedEvents(date);
        if (cachedData.length > 0) {
          setEvents(cachedData);
          setFilteredEvents(cachedData);
        } else {
          console.log("No cached events found for this date.");
          setEvents([]);
          setFilteredEvents([]);
        }
      }
    }

    async function fetchSponsoredEvent(date) {
      if (navigator.onLine) {
        try {
          const response = await fetch(
            `https://backend-8eis.onrender.com/sponsored_event?date=${date}`
          );
          const data = await response.json();
          setSponsoredEvent(data);
          await cacheSponsoredEvent(date, data);
        } catch (error) {
          console.error("Error fetching sponsored event:", error);
          setSponsoredEvent(null);
        }
      } else {
        const cachedData = await loadCachedSponsoredEvent(date);
        if (cachedData) {
          setSponsoredEvent(cachedData);
        } else {
          console.log("No cached sponsored event found for this date.");
          setSponsoredEvent(null);
        }
      }
    }

    fetchEvents(selectedDate);
    fetchSponsoredEvent(selectedDate);
  }, [selectedDate]);

  return (
    <EventContext.Provider value={{ events, selectedDate, setSelectedDate }}>
      {children}
    </EventContext.Provider>
  );
}
