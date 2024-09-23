import { useState } from "react";
import "./App.css";
import SettingsScreen from "./components/SettingsScreen";
import Tracker from "./components/Tracker";

function App() {
  const [isTrackerReady, setIsTrackerReady] = useState(false);
  const [trackerSettings, setTrackerSettings] = useState({});

  return (
    <div className="container">
      {isTrackerReady ? (
        <Tracker settings={trackerSettings} />
      ) : (
        <SettingsScreen
          doneConfiguring={(settings) => updateSettings(settings)}
        />
      )}
    </div>
  );

  function updateSettings(settings) {
    setTrackerSettings(settings);
    setIsTrackerReady(true);
  }
}

export default App;
