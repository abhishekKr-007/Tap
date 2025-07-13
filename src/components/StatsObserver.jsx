import React, { useEffect, useRef, useState } from "react";
import { useJogging } from "../context/JoggingContext";

const StatsObserver = () => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [location, setLocation] = useState(null);
  const [isJogging, setIsJogging] = useState(false);

  const { jogStats, setJogStats } = useJogging();
  

  // ⬇️ Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // ⬇️ Get location if visible
  useEffect(() => {
    if (visible && !location && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [visible, location]);

  // ⬇️ Fetch weather
  useEffect(() => {
    if (!location) return;
    const fetchWeather = async () => {
      const { latitude, longitude } = location;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m&forecast_days=1&timezone=auto`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        const hour = new Date().getHours();
        setTemperature({
          temp: data.hourly.temperature_2m[hour],
          humidity: data.hourly.relative_humidity_2m[hour],
        });
      } catch (error) {
        console.error("Weather fetch failed", error);
      }
    };

    fetchWeather();
  }, [location]);

  // ⬇️ Start jogging
  const handleStart = () => {
    setJogStats({ distance: 0, duration: 0 });
    setIsJogging(true);
  };

  // ⬇️ Clear stats
  const handleClear = () => {
    setJogStats({ distance: 0, duration: 0 });
    setIsJogging(false);
  };

  return (
    <div ref={ref} className="card observer-section">
      <h2>🌦️ Weather Report</h2>
      {temperature ? (
        <>
          <p>🌡️ Temperature: {temperature.temp}°C</p>
          <p>💧 Humidity: {temperature.humidity}%</p>
        </>
      ) : (
        <p>Loading weather...</p>
      )}

      <h2>📊 Live Jog Stats</h2>
      {visible ? (
        <>
          <p>🏃 Distance: {jogStats.distance.toFixed(2)} km</p>
          <p>⏱️ Time: {jogStats.duration} min</p>
          <button onClick={handleStart} disabled={isJogging} style={styles.button} >
            {isJogging ? "⏸️ Pause Jog" : "▶️ Start Jog"}
          </button>
          <button onClick={handleClear} style={styles.clear}>
            🧹 Clear Stats
          </button>
        </>
      ) : (
        <p>Scroll down to load stats...</p>
      )}
    </div>
  );
};

const styles = {
  button: {
    padding: "8px 12px",
    marginRight: "10px",
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  clear: {
    padding: "8px 12px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default StatsObserver;
