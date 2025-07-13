
# 🏃‍♂️ JogTrack – Smart Jogging Tracker Web App

**JogTrack** is a responsive React-based web application that helps joggers track their run in real-time. It uses modern Web APIs and delivers essential jogging stats including distance, duration, live weather, and pause/resume control.

---

## 🔍 Features

- 📍 **Geolocation API** – Automatically fetches your current location when you scroll to the stats section.
- 🌦️ **Weather API** – Displays real-time temperature and humidity using [Open-Meteo API](https://open-meteo.com/).
- 👁️ **Intersection Observer API** – Triggers weather and jogging stats only when the user scrolls to the relevant section, improving performance.
- ⏱️ **Jogging Tracker** – Start/pause/resume jogging and track live stats like:
  - Total distance (in km)
  - Duration (in minutes)
- 🧹 **Clear Stats** – Reset all stats and stop jogging anytime.
- 📱 Fully responsive & mobile-friendly.

---

## 🛠️ Tech Stack

- **Frontend**: React.js (with Hooks and Context API)
- **Web APIs Used**:
  1. **Geolocation API** – For location tracking
  2. **Open-Meteo API** – For fetching live weather data
  3. **Intersection Observer API** – For lazy loading & performance
- **Styling**: CSS (inline + responsive layout)




