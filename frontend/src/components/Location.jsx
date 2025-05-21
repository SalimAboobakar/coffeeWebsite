// src/components/Location.jsx
import React, { useState, useEffect } from "react";
import "./Location.css";

const Location = () => {
  const [loading, setLoading] = useState(true);
  const [locText, setLocText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Primary: browser geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Reverse geocode via OpenStreetMap
          fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
            .then((res) => res.json())
            .then((data) => {
              const { city, town, village, state, country } = data.address;
              const locality = city || town || village || state || "";
              setLocText(`${locality}, ${country}`);
              setLoading(false);
            })
            .catch(() => fallback());
        },
        () => fallback(),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      fallback();
    }

    // Fallback: IP-based geolocation
    function fallback() {
      fetch("http://ip-api.com/json/")
        .then((res) => res.json())
        .then((data) => {
          const { city, regionName, country } = data;
          setLocText(`${city}, ${regionName}, ${country}`);
          setLoading(false);
        })
        .catch((err) => {
          console.error("IP geolocation error:", err.message);
          setError("Unable to determine location");
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="location-info">
      {loading ? (
        <span className="loading">Detecting location...</span>
      ) : error ? (
        <span className="error">{error}</span>
      ) : (
        <span className="loc">{locText}</span>
      )}
    </div>
  );
};

export default Location;
