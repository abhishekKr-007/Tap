// components/IdleSaver.js
import { useEffect, useRef } from "react";
import { useJogging } from "../context/JoggingContext";

const toRadians = (deg) => (deg * Math.PI) / 180;
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const IdleSaver = () => {
  const { setJogStats } = useJogging();
  const lastPosRef = useRef(null);
  const totalDistanceRef = useRef(0);
  const startTimeRef = useRef(null);
  const lastUpdateTimeRef = useRef(null);

  useEffect(() => {
    let watchId;

    const handlePosition = (pos) => {
      const { latitude, longitude } = pos.coords;
      const now = Date.now();

      if (!lastPosRef.current) {
        lastPosRef.current = { latitude, longitude };
        startTimeRef.current = now;
        lastUpdateTimeRef.current = now;
        return;
      }

      const prev = lastPosRef.current;
      const distance = getDistance(prev.latitude, prev.longitude, latitude, longitude);

      if (distance >= 0.005) {
        totalDistanceRef.current += distance;
        lastPosRef.current = { latitude, longitude };

        const durationInMinutes = (now - startTimeRef.current) / 60000;
        setJogStats({
          distance: parseFloat(totalDistanceRef.current.toFixed(2)),
          duration: parseFloat(durationInMinutes.toFixed(1)),
        });

        lastUpdateTimeRef.current = now;
        console.log(`✅ Moved ${distance.toFixed(3)} km`);
      } else {
        console.log("⚠️ Insignificant movement. Ignored.");
      }
    };

    if ("geolocation" in navigator) {
      watchId = navigator.geolocation.watchPosition(
        handlePosition,
        (err) => console.error("❌ Geolocation error:", err),
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 10000,
        }
      );
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [setJogStats]);

  return null;
};

export default IdleSaver;
