import React, { useEffect, useRef } from 'react';
import { GoogleMap, LoadScriptNext } from '@react-google-maps/api';
import '../styles/MobileDrawerMap.css';

const containerStyle = {
  width: '100%',
  height: '200px',
};

function MobileDrawerMap({ latitude, longitude }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const apiKey = process.env.REACT_APP_DRAWER_MAP_API_KEY;

  useEffect(() => {
    if (mapRef.current && !isNaN(latitude) && !isNaN(longitude)) {
      const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
      mapRef.current.panTo(position);

      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      markerRef.current = new window.google.maps.Marker({
        position,
        map: mapRef.current,
      });
    }
  }, [latitude, longitude]);

  if (!apiKey) {
    console.error('Google Maps API key is missing');
    return <div>Google Maps API key is missing</div>;
  }

  return (
    <LoadScriptNext googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: parseFloat(latitude) || 0, lng: parseFloat(longitude) || 0 }}
        zoom={15}
        onLoad={(map) => {
          mapRef.current = map;
          if (!isNaN(latitude) && !isNaN(longitude)) {
            const position = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
            map.panTo(position);

            markerRef.current = new window.google.maps.Marker({
              position,
              map,
            });
          }
        }}
      />
    </LoadScriptNext>
  );
}

export default MobileDrawerMap;
