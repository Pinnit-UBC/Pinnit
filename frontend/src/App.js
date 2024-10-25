import React, { Suspense } from "react"; // Added lazy and Suspense
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddEvent from "./pages/add_events/AddEvent"; // Kept as it is
import SubscriptionForm from "./components/SubscriptionForm";
import ClubsAndOrganizations from "./pages/clubs/ClubsAndOrganizations";
import FeedbackForm from "./pages/feedback/FeedbackForm";
import HomePage from "./pages/home/Home";
import EventPage from "./pages/event_display/EventPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/event/:eventId"
        element={
          <Suspense fallback={<div>Loading event details...</div>}>
            <EventPage />
          </Suspense>
        }
      />
      <Route path="/clubs-organizations" element={<ClubsAndOrganizations />} />
      <Route path="/add-event" element={<AddEvent />} />
      <Route path="/subscribe" element={<SubscriptionForm />} />
      <Route path="/feedback" element={<FeedbackForm />} />
    </Routes>
  );
}

export default App;
