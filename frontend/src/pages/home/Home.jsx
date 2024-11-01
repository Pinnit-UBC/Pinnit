import { React, useState, lazy, useEffect, Suspense, useContext } from "react";
import MessageScreen from "../../components/MessageScreen";
import EventsList from "../event_display/EventsList"; // Kept as it is, no lazy loading required for this
import Summary from "../../components/Summary";
import dayjs from "dayjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useLocation } from "react-router-dom";
import DatePickerComponent from "../../components/DatePickerComponent";
import MenuDrawer from "../../components/ui/menu_drawer/MenuDrawer";
import "../../App.css";

import GoogleMapsScriptLoader from "../../hooks/GoogleMapsScriptLoader";
import { EventContext } from "../../providers/EventsProvider";

// Lazy-load heavy components
const MapComponent = lazy(() => import("../../components/Map"));
const MobileEventsList = lazy(() =>
  import("../../components/mobile/MobileEventsList")
);

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sponsoredEvent, setSponsoredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopularEventsActive, setIsPopularEventsActive] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const location = useLocation();
  const eventData = useContext(EventContext);
  const selectedDate = eventData.selectedDate;
  const setSelectedDate = eventData.setSelectedDate;

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const eventId = pathParts[2];

    const fetchEventById = async (eventId) => {
      try {
        const response = await fetch(
          `https://backend-8eis.onrender.com/event/${eventId}`
        );
        const event = await response.json();
        if (event) {
          setSelectedEvent(event);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        navigate("/");
      }
    };

    if (eventId) {
      const existingEvent = events.find((e) => e._id === eventId);
      if (existingEvent) {
        setSelectedEvent(existingEvent);
      } else if (events.length === 0) {
        fetchEventById(eventId);
      }
    } else {
      setSelectedEvent(null);
    }
  }, [location.pathname, events, navigate]);

  const formatSelectedDate = () => {
    return dayjs(selectedDate).format("dddd, MMMM D");
  };

  const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSponsoredEventClick = () => {
    if (sponsoredEvent) {
      const matchingEvent = events.find(
        (e) => e.event_title.trim() === sponsoredEvent.event_title.trim()
      );
      if (matchingEvent) {
        setSelectedEvent(matchingEvent);
        navigate(`/event/${matchingEvent._id}`, { replace: true });
      }
    }
  };

  const handleEventClick = (event) => {
    if (event !== selectedEvent) {
      setSelectedEvent(event);
      navigate(`/event/${event._id}`, { replace: true });
    }
  };

  const normalizeTag = (tag) => tag.toLowerCase().replace(/ & /g, "-");

  const handlePopularEventsClick = async () => {
    if (isPopularEventsActive) {
      setFilteredEvents(events);
    } else {
      try {
        const response = await fetch(
          `https://backend-8eis.onrender.com/popular_events?date=${selectedDate}`
        );
        const popularEvents = await response.json();
        setFilteredEvents(popularEvents);
      } catch (error) {
        console.error("Error fetching popular events:", error);
        alert("Unable to fetch popular events at this time.");
      }
    }
    setIsPopularEventsActive(!isPopularEventsActive);
  };

  return (
    <GoogleMapsScriptLoader apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="App">
        <MessageScreen />
        <MenuDrawer open={isMenuOpen} onClose={toggleMenuDrawer} />
        <main className="main-content">
          <>
            <div className="left-content">
              <h2 className="mb-3 text-3xl font-bold">
                {formatSelectedDate()}
              </h2>
              <EventsList events={eventData.events} />
            </div>
            <div className="right-content">
              <div
                className="date-picker-box"
                style={{ width: "100%", display: "flex" }}
              >
                <DatePickerComponent
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>
              <Summary
                eventCount={filteredEvents.length}
                sponsoredEvent={sponsoredEvent}
                onSponsoredEventClick={handleSponsoredEventClick}
              />
              <Suspense fallback={<div>Loading map...</div>}>
                <MapComponent events={filteredEvents} />
              </Suspense>
            </div>
          </>
        </main>
      </div>
    </GoogleMapsScriptLoader>
  );
};

export default HomePage;
