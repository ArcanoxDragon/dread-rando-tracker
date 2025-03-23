import { useCallback, useState } from "react";
import { TrackerSettings } from "./utilities/settings";
import { TrackerStore } from "./store/TrackerStore";
import SettingsScreen from "./components/SettingsScreen";
import Tracker from "./components/Tracker";

function App() {
	const [trackerStore, setTrackerStore] = useState<TrackerStore | null>(null);

	const onDoneConfiguring = useCallback((settings: TrackerSettings) => {
		setTrackerStore(new TrackerStore(settings));
	}, []);

	const onLoadedPreviousState = useCallback((store: TrackerStore) => {
		setTrackerStore(store);
	}, []);

	return (
		<div className="container">
			{trackerStore ? (
				<Tracker store={trackerStore} />
			) : (
				<SettingsScreen
					doneConfiguring={onDoneConfiguring}
					loadedPreviousState={onLoadedPreviousState}
				/>
			)}
		</div>
	);
}

export default App;
