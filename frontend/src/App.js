import React, { useState, useEffect, lazy, Suspense } from "react"; // Added lazy and Suspense
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";
import EventsList from "./pages/event_display/EventsList"; // Kept as it is, no lazy loading required for this
import Summary from "./components/Summary";
import Header from "./components/Header";
import DatePickerComponent from "./components/DatePickerComponent";
import AddEvent from "./pages/add_events/AddEvent"; // Kept as it is
import MobileTimeline from "./components/mobile/MobileTimeline";
import MobileFilterButton from "./components/mobile/MobileFilterButton";
import MobileDatePickerButton from "./components/mobile/MobileDatePickerButton";
import MenuDrawer from "./components/ui/menu_drawer/MenuDrawer";
import SubscriptionForm from "./components/SubscriptionForm";
import GoogleMapsScriptLoader from "./hooks/GoogleMapsScriptLoader";
import MessageScreen from "./components/MessageScreen";
import ClubsAndOrganizations from "./pages/clubs/ClubsAndOrganizations";
import FeedbackForm from "./pages/feedback/FeedbackForm";

import {
  cacheEvents,
  loadCachedEvents,
  cacheSponsoredEvent,
  loadCachedSponsoredEvent,
} from "./cache";

// Lazy-load heavy components
const MapComponent = lazy(() => import("./components/Map"));
const EventDrawer = lazy(() => import("./pages/event_display/EventDrawer"));
const MobileEventsList = lazy(() => import("./components/mobile/MobileEventsList"));

function App() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sponsoredEvent, setSponsoredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPopularEventsActive, setIsPopularEventsActive] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const location = useLocation();

  // Formats the selected date for display
  const formatSelectedDate = () => {
    return dayjs(selectedDate).format("dddd, MMMM D");
  };

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

  const handleFilterChange = (selectedTags, selectedFaculty, selectedDegreeLevel) => {
    const normalizedTags = selectedTags.map(normalizeTag);
    const normalizedFaculty = selectedFaculty.map(normalizeTag);
    const normalizedDegreeLevel = selectedDegreeLevel.map(normalizeTag);

    const filtered = events.filter((event) => {
      const eventTags = (event.tags || []).map(normalizeTag);
      const eventFaculty = (event.faculty || []).map(normalizeTag);
      const eventDegreeLevel = (event.degree_level || []).map(normalizeTag);

      const matchTags =
        normalizedTags.length === 0 ||
        eventTags.some((tag) => normalizedTags.includes(tag));
      const matchFaculty =
        normalizedFaculty.length === 0 ||
        eventFaculty.some((fac) => normalizedFaculty.includes(fac));
      const matchDegreeLevel =
        normalizedDegreeLevel.length === 0 ||
        eventDegreeLevel.some((degree) => normalizedDegreeLevel.includes(degree));
      return matchTags && matchFaculty && matchDegreeLevel;
    });

    setFilteredEvents(filtered);
  };

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

  const isAddEventPage = location.pathname === "/add-event";
  const isClubsOrganizationsPage = location.pathname === "/clubs-organizations";
  const isFeedbackPage = location.pathname === "/feedback";

  const handleEventDrawerClose = () => {
    setSelectedEvent(null);
    navigate("/");
  };

  return (
    <GoogleMapsScriptLoader apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="App">
        <MessageScreen />
        <Header onMenuClick={toggleMenuDrawer} />
        <MenuDrawer open={isMenuOpen} onClose={toggleMenuDrawer} />
        {!isAddEventPage && !isClubsOrganizationsPage && !isFeedbackPage && (
          <main className="main-content">
            {isMobile ? (
              <div className="mobile-header">
                <div className="mobile-button-container">
                  <MobileFilterButton
                    onFilterChange={handleFilterChange}
                    onPopularEventsClick={handlePopularEventsClick}
                  />
                  <MobileTimeline
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                  />
                  <MobileDatePickerButton
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>
                {filteredEvents.length > 0 ? (
                  <Suspense fallback={<div>Loading events...</div>}>
                    <MobileEventsList
                      events={filteredEvents}
                      onEventClick={handleEventClick}
                    />
                  </Suspense>
                ) : (
                  <div>No events found.</div>
                )}
              </div>
            ) : (
              <>
                <div className="left-content">
                  <h2>{formatSelectedDate()}</h2>
                  <EventsList events={filteredEvents} onEventClick={handleEventClick} />
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
            )}
          </main>
        )}
        <Routes>
          <Route
            path="/event/:eventId"
            element={
              <Suspense fallback={<div>Loading event details...</div>}>
                <EventDrawer
                  event={selectedEvent}
                  open={!!selectedEvent}
                  onClose={handleEventDrawerClose}
                />
              </Suspense>
            }
          />
          <Route
            path="/clubs-organizations"
            element={<ClubsAndOrganizations />}
          />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/subscribe" element={<SubscriptionForm />} />
          <Route path="/feedback" element={<FeedbackForm />} />
        </Routes>
      </div>
    </GoogleMapsScriptLoader>
  );
}

export default App;
