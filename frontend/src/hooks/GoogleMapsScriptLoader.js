import { useEffect, useState } from 'react';

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve(script);
    script.onerror = (err) => reject(err);

    document.head.appendChild(script);
  });
};

const GoogleMapsScriptLoader = ({ apiKey, children }) => {
  const [isLoaded, setIsLoaded] = useState(!!window.google);

  useEffect(() => {
    if (!isLoaded) {
      const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      loadScript(googleMapsUrl)
        .then(() => {
          setIsLoaded(true);
          console.log("Google Maps script loaded successfully.");
        })
        .catch((error) => {
          console.error("Failed to load Google Maps script.", error);
        });
    }
  }, [apiKey, isLoaded]);

  return isLoaded ? children : null;
};

export default GoogleMapsScriptLoader;
