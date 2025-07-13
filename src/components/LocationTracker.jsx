import React, { useEffect, useState } from "react";

const LocationTracker = () => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return alert("Geolocation not supported");

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        localStorage.setItem("jogCoords", JSON.stringify({ latitude, longitude }));
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="card">
      <h2>📍 Location</h2>
      {coords ? (
        <p>
          Lat: {coords.latitude.toFixed(4)}, Lng: {coords.longitude.toFixed(4)}
        </p>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default LocationTracker;
