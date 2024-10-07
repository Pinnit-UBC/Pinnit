import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mapMarkerIcon from '../assets/map_icon.png';
import '../styles/MobileMapButton.css';
import MapComponent from './Map';

const MobileMapButton = ({ events }) => {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="map-button-container">
      <button className="mobile-map-button" onClick={() => setShowMap(!showMap)}>
        <img src={mapMarkerIcon} alt="Map Marker Icon" className="map-marker-icon" />
      </button>
      {showMap && <MapComponent events={events} />}
    </div>
  );
};

MobileMapButton.propTypes = {
  events: PropTypes.array.isRequired,
};

export default MobileMapButton;
