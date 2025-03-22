import { useCallback, useState } from "react";
import SettingsScreen from "./components/SettingsScreen";
import Tracker from "./components/Tracker";
import { TrackerSettings } from "./utilities/settings";

function App() {
	const [isTrackerReady, setIsTrackerReady] = useState(false);
	const [trackerSettings, setTrackerSettings] = useState({});

	const updateSettings = useCallback((settings: TrackerSettings) => {
		setTrackerSettings(settings);
		setIsTrackerReady(true);
	}, []);

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
}

export default App;
