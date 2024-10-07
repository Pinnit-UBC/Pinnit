import React, { useEffect, useRef } from 'react'; // Removed useState import
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
};

function DrawerMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null); // Store the marker reference
  const apiKey = process.env.REACT_APP_DRAWER_MAP_API_KEY;

  useEffect(() => {
    if (mapRef.current && latitude && longitude) {
      const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      
      // Pan to the new location
      mapRef.current.panTo(position);

      // Remove previous marker if it exists
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Add new marker
      markerRef.current = new window.google.maps.Marker({
        position,
        map: mapRef.current,
      });
    }
  }, [latitude, longitude]); // Only update when latitude or longitude changes

  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return <div>Google Maps API key is missing</div>;
  }

  return (
    <LoadScriptNext googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }} // Center based on provided coordinates
        zoom={15}
        onLoad={(map) => {
          mapRef.current = map;
          const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
          map.panTo(position);

          // Add initial marker
          markerRef.current = new window.google.maps.Marker({
            position,
            map,
          });
        }}
      >
        {/* Marker will be managed via useEffect */}
      </GoogleMap>
    </LoadScriptNext>
  );
}

export default DrawerMap;
