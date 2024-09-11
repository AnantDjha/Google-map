import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useLocation } from 'react-router-dom';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

function MapComponent() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [errorMessage, setErrorMessage] = useState('');

  const l = useLocation()
  const {stateAddress} = l.state || "";

  // Fetch user's location using Geolocation API
  const fetchWithLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setErrorMessage('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              setErrorMessage('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              setErrorMessage('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              setErrorMessage('An unknown error occurred.');
              break;
            default:
              setErrorMessage('An error occurred.');
          }
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  // Fetch coordinates from address using Google Geocoding API
  const fetchByAddress = async (address, apiKey) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng });
      } else {
        console.error('Geocoding was not successful:', data.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log(stateAddress);
    
    if (!stateAddress) {
      fetchWithLocation();
    } else {
      fetchByAddress(stateAddress, 'AIzaSyA2cuMUqaIxwCxErdqJ0hq6zAd2EOoisYw');
    }
  }, [stateAddress]);

  const isLocationReady = location.lat !== null && location.lng !== null;

  return (
    <LoadScript googleMapsApiKey="AIzaSyA2cuMUqaIxwCxErdqJ0hq6zAd2EOoisYw">
      {isLocationReady ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={15}
        >
          <Marker position={location} />
        </GoogleMap>
      ) : (
        <div>Loading Map...</div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </LoadScript>
  );
}

export default MapComponent;
