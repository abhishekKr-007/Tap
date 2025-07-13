import React from "react";
import LocationTracker from "./components/LocationTracker";
import JogCanvas from "./components/JogCanvas";
import StatsObserver from "./components/StatsObserver";
import NetworkStatus from "./components/NetworkStatus";
import IdleSaver from "./components/IdleSaver";
import "./styles.css";

const App = () => {
  return (
    <div className="app">
      <h1>🏃‍♂️ JogSpot Tracker</h1>
      <LocationTracker />
      <JogCanvas />
      <StatsObserver />
      <IdleSaver />
      <NetworkStatus />
    </div>
  );
};

export default App;
