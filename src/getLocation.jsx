import React, { useState } from "react";

function GetLocation() {
  const [googleMapsLink, setGoogleMapsLink] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    setGoogleMapsLink(googleMapsLink);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unexpected error occurred.");
        break;
    }
  };

  return (
    <div>
      <h1>Geolocation Example</h1>
      <button onClick={getLocation}>Get Location</button>
      {googleMapsLink && 
      (
        <iframe src={googleMapsLink + "&output=embed"} width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">

        </iframe>
      )}
      
      {error && <p>{error}</p>}
    </div>
  );
}

export default GetLocation;
