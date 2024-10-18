import "./App.css";

import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./pages/home";
import AddEvent from "./components/AddEvent";
import EventDrawer from "./components/EventDrawer";
import SubscriptionForm from "./components/SubscriptionForm";
import GoogleMapsScriptLoader from "./components/GoogleMapsScriptLoader";
import ClubsAndOrganizations from "./pages/clubs/ClubsAndOrganizations";
import FeedbackForm from "./components/form/FeedbackForm";
import Header from "./components/ui/Header";

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const handleEventDrawerClose = () => {
    setSelectedEvent(null);
    navigate("/");
  };

  return (
    <GoogleMapsScriptLoader apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/clubs-organizations"
            element={<ClubsAndOrganizations />}
          />
          {/* Route for clubs and organizations page */}
          <Route path="/add-event" element={<AddEvent />} />
          {/* Route for adding events */}
          <Route path="/subscribe" element={<SubscriptionForm />} />
          {/* Route for subscription form */}
          <Route path="/feedback" element={<FeedbackForm />} />
          {/* Route for feedback form */}
          <Route path="/clubs" element={<ClubsAndOrganizations />} />
          {/* Additional route for clubs page */}
        </Routes>
      </div>
    </GoogleMapsScriptLoader>
  );
}

export default App;
