import React, { useState, useEffect } from 'react'; // Import React and hooks for state and side effects
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'; // Import React Router components for navigation and routing
import dayjs from 'dayjs'; // Import dayjs for date formatting
import useMediaQuery from '@mui/material/useMediaQuery'; // Import MUI's media query hook for responsive design
import './App.css'; // Import the CSS file for styling
import EventsList from './components/EventsList'; // Import custom component for listing events
import Summary from './components/Summary'; // Import custom component for displaying event summary
import Header from './components/Header'; // Import custom component for the header
import DatePickerComponent from './components/DatePickerComponent'; // Import custom date picker component
import MapComponent from './components/Map'; // Import custom map component to display events
import AddEvent from './components/AddEvent'; // Import component for adding an event
import MobileTimeline from './components/MobileTimeline'; // Import component for mobile view timeline
import MobileFilterButton from './components/MobileFilterButton'; // Import mobile filter button component
import MobileDatePickerButton from './components/MobileDatePickerButton'; // Import mobile date picker button component
import MobileEventsList from './components/MobileEventsList'; // Import component to display event list on mobile
import MenuDrawer from './components/MenuDrawer'; // Import sidebar drawer for navigation
import EventDrawer from './components/EventDrawer'; // Import component to display event details in a drawer
import SubscriptionForm from './components/SubscriptionForm'; // Import component for subscription form
import GoogleMapsScriptLoader from './components/GoogleMapsScriptLoader'; // Import component to load Google Maps script
import MessageScreen from './components/MessageScreen'; // Import component for displaying messages or alerts
import ClubsAndOrganizations from './components/ClubsAndOrganizations'; // Import component for listing clubs and organizations
import FeedbackForm from './components/FeedbackForm'; // Import feedback form component

import { cacheEvents, loadCachedEvents, cacheSponsoredEvent, loadCachedSponsoredEvent } from './cache'; // Import caching functions for offline access

function App() {
  // State hooks to store event data, filter options, and UI states
  const [events, setEvents] = useState([]); // Stores the list of all events
  const [filteredEvents, setFilteredEvents] = useState([]); // Stores the filtered events to display
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD')); // Stores the currently selected date
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Tracks if the menu drawer is open
  const [sponsoredEvent, setSponsoredEvent] = useState(null); // Stores the sponsored event for the day
  const [selectedEvent, setSelectedEvent] = useState(null); // Stores the currently selected event details
  const [isPopularEventsActive, setIsPopularEventsActive] = useState(false); // Tracks if popular events filter is active
  const isMobile = useMediaQuery('(max-width: 600px)'); // Determines if the app is being viewed on mobile
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Hook for getting the current URL path

  // Formats the selected date for display
  const formatSelectedDate = () => {
    return dayjs(selectedDate).format('dddd, MMMM D');
  };

  // Fetches events from the backend or cache when the selected date changes
  useEffect(() => {
    async function fetchEvents(date) {
      if (navigator.onLine) { // If online, fetch data from the API
        try {
          const response = await fetch(`https://backend-8eis.onrender.com/events?date=${date}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setEvents(data); // Set fetched events
            setFilteredEvents(data); // Set filtered events to the fetched data
            await cacheEvents(date, data); // Cache events for offline use
          } else {
            console.error('Error: Data is not an array');
          }
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      } else { // If offline, load events from cache
        const cachedData = await loadCachedEvents(date);
        if (cachedData.length > 0) {
          setEvents(cachedData); // Set cached events
          setFilteredEvents(cachedData); // Set filtered events to the cached data
        } else {
          console.log('No cached events found for this date.');
          setEvents([]);
          setFilteredEvents([]);
        }
      }
    }

    // Fetches the sponsored event from the backend or cache
    async function fetchSponsoredEvent(date) {
      if (navigator.onLine) {
        try {
          const response = await fetch(`https://backend-8eis.onrender.com/sponsored_event?date=${date}`);
          const data = await response.json();
          setSponsoredEvent(data); // Set the sponsored event data
          await cacheSponsoredEvent(date, data); // Cache the sponsored event for offline use
        } catch (error) {
          console.error('Error fetching sponsored event:', error);
          setSponsoredEvent(null);
        }
      } else {
        const cachedData = await loadCachedSponsoredEvent(date);
        if (cachedData) {
          setSponsoredEvent(cachedData); // Set cached sponsored event
        } else {
          console.log('No cached sponsored event found for this date.');
          setSponsoredEvent(null);
        }
      }
    }

    fetchEvents(selectedDate); // Fetch events when the selected date changes
    fetchSponsoredEvent(selectedDate); // Fetch sponsored event when the selected date changes
  }, [selectedDate]);

  // Fetches event details if navigating to an event page directly
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const eventId = pathParts[2]; // Extract event ID from the URL path

    const fetchEventById = async (eventId) => {
      try {
        const response = await fetch(`https://backend-8eis.onrender.com/event/${eventId}`);
        const event = await response.json();
        if (event) {
          setSelectedEvent(event); // Set the fetched event as the selected event
        } else {
          navigate('/'); // Redirect to home if event is not found
        }
      } catch (error) {
        console.error('Error fetching event:', error);
        navigate('/'); // Redirect if there's an error fetching event
      }
    };

    if (eventId) {
      const existingEvent = events.find(e => e._id === eventId); // Find the event in the current events list
      if (existingEvent) {
        setSelectedEvent(existingEvent); // Set it as selected if found
      } else if (events.length === 0) {
        fetchEventById(eventId); // Fetch event by ID if not already loaded
      }
    } else {
      setSelectedEvent(null); // Reset selected event if no event ID is in the URL
    }
  }, [location.pathname, events, navigate]);

  // Toggles the menu drawer visibility
  const toggleMenuDrawer = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handles clicking on the sponsored event
  const handleSponsoredEventClick = () => {
    if (sponsoredEvent) {
      const matchingEvent = events.find(e => e.event_title.trim() === sponsoredEvent.event_title.trim());
      if (matchingEvent) {
        setSelectedEvent(matchingEvent); // Set the matched event as selected
        navigate(`/event/${matchingEvent._id}`, { replace: true }); // Navigate to the event page
      }
    }
  };

  // Handles clicking on an event in the list
  const handleEventClick = (event) => {
    if (event !== selectedEvent) {
      setSelectedEvent(event); // Set the clicked event as selected
      navigate(`/event/${event._id}`, { replace: true }); // Navigate to the event page
    }
  };

  // Normalizes tags by converting them to lowercase and replacing spaces with dashes
  const normalizeTag = (tag) => tag.toLowerCase().replace(/ & /g, '-');

  // Handles filtering events based on selected tags, faculty, and degree level
  const handleFilterChange = (selectedTags, selectedFaculty, selectedDegreeLevel) => {
    const normalizedTags = selectedTags.map(normalizeTag);
    const normalizedFaculty = selectedFaculty.map(normalizeTag);
    const normalizedDegreeLevel = selectedDegreeLevel.map(normalizeTag);

    const filtered = events.filter(event => {
      const eventTags = (event.tags || []).map(normalizeTag);
      const eventFaculty = (event.faculty || []).map(normalizeTag);
      const eventDegreeLevel = (event.degree_level || []).map(normalizeTag);

      const matchTags = normalizedTags.length === 0 || eventTags.some(tag => normalizedTags.includes(tag));
      const matchFaculty = normalizedFaculty.length === 0 || eventFaculty.some(fac => normalizedFaculty.includes(fac));
      const matchDegreeLevel = normalizedDegreeLevel.length === 0 || eventDegreeLevel.some(degree => normalizedDegreeLevel.includes(degree));
      return matchTags && matchFaculty && matchDegreeLevel; // Return true if the event matches the filters
    });

    setFilteredEvents(filtered); // Set the filtered events
  };

  // Handles toggling the popular events view
  const handlePopularEventsClick = async () => {
    if (isPopularEventsActive) {
      setFilteredEvents(events); // Show all events when popular events filter is inactive
    } else {
      try {
        const response = await fetch(`https://backend-8eis.onrender.com/popular_events?date=${selectedDate}`);
        const popularEvents = await response.json();
        setFilteredEvents(popularEvents); // Set the filtered events to popular ones
      } catch (error) {
        console.error('Error fetching popular events:', error);
        alert('Unable to fetch popular events at this time.');
      }
    }
    setIsPopularEventsActive(!isPopularEventsActive); // Toggle the popular events state
  };

  // Checks if the current page is the add-event, clubs-organizations, or feedback page
  const isAddEventPage = location.pathname === '/add-event';
  const isClubsOrganizationsPage = location.pathname === '/clubs-organizations';
  const isFeedbackPage = location.pathname === '/feedback';

  // Closes the event drawer and navigates to home
  const handleEventDrawerClose = () => {
    setSelectedEvent(null); // Reset selected event
    navigate('/'); // Navigate to home
  };

  // Main return for rendering the app
  return (
    <GoogleMapsScriptLoader apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="App">
        <MessageScreen /> {/* Component to show alerts or messages */}
        <Header onMenuClick={toggleMenuDrawer} /> {/* Header with a menu button */}
        <MenuDrawer open={isMenuOpen} onClose={toggleMenuDrawer} /> {/* Sidebar drawer for navigation */}
        {!isAddEventPage && !isClubsOrganizationsPage && !isFeedbackPage && ( // Show main content if not on specific pages
          <main className="main-content">
            {isMobile ? ( // Show mobile view if screen is small
              <div className="mobile-header">
                <div className="mobile-button-container">
                  <div className="filter-button-container">
                    <MobileFilterButton 
                      onFilterChange={handleFilterChange} 
                      onPopularEventsClick={handlePopularEventsClick}
                    />
                  </div>
                  <div className="mobile-timeline-container">
                    <MobileTimeline selectedDate={selectedDate} onDateChange={setSelectedDate} />
                  </div>
                  <div className="date-picker-button-container">
                    <MobileDatePickerButton selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                  </div>
                </div>
                {filteredEvents.length > 0 ? ( // Show event list or a message if no events are found
                  <MobileEventsList events={filteredEvents} onEventClick={handleEventClick} />
                ) : (
                  <div>No events found.</div>
                )}
              </div>
            ) : (
              <> {/* Desktop view */}
                <div className="left-content">
                  <h2>{formatSelectedDate()}</h2> {/* Display formatted date */}
                  <EventsList events={filteredEvents} onEventClick={handleEventClick} /> {/* List of events */}
                </div>
                <div className="right-content">
                  <div className="date-picker-box" style={{ width: '100%', display: 'flex' }}>
                    <DatePickerComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> {/* Date picker */}
                  </div>
                  <Summary
                    eventCount={filteredEvents.length}
                    sponsoredEvent={sponsoredEvent}
                    onSponsoredEventClick={handleSponsoredEventClick}
                  /> {/* Summary of events */}
                  <MapComponent events={filteredEvents} /> {/* Map displaying events */}
                </div>
              </>
            )}
          </main>
        )}
        <Routes> {/* Define routes for different pages */}
          <Route 
            path="/event/:eventId" 
            element={<EventDrawer event={selectedEvent} open={!!selectedEvent} onClose={handleEventDrawerClose} />} 
          /> {/* Route for individual event details */}
          <Route path="/clubs-organizations" element={<ClubsAndOrganizations />} /> {/* Route for clubs and organizations page */}
          <Route path="/add-event" element={<AddEvent />} /> {/* Route for adding events */}
          <Route path="/subscribe" element={<SubscriptionForm />} /> {/* Route for subscription form */}
          <Route path="/feedback" element={<FeedbackForm />} /> {/* Route for feedback form */}
          <Route path="/clubs" element={<ClubsAndOrganizations />} /> {/* Additional route for clubs page */}
        </Routes>
      </div>
    </GoogleMapsScriptLoader>
  );
}

export default App;
