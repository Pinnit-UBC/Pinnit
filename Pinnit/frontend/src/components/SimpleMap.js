import React from 'react';
import { GoogleMap, LoadScriptNext, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%', // Adjusted to 100% to fill the container
};

const center = {
  lat: 49.263036774736136, // Initial center position for UBC
  lng: -123.24970352478029,
};

const SimpleMap = ({ markerPosition, handleMapClick }) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return <div>Error: Google Maps API key is missing</div>;
  }

  console.log('Marker Position:', markerPosition); // Log marker position

  return (
    <LoadScriptNext
      googleMapsApiKey={apiKey}
      onLoad={() => console.log('Google Maps script loaded')}
      onError={(e) => console.error('Error loading Google Maps script', e)}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14.5}
        onClick={handleMapClick}
        onLoad={(map) => console.log('Map loaded:', map)}
      >
        {markerPosition && (
          <Marker position={markerPosition} />
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default SimpleMap;
