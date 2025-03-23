import { TrackerSettings } from "../../utilities/settings";

export interface PersistedState {
	settings: TrackerSettings;
	items?: Record<string, number>;
	itemLocations?: Record<string, string>;
	itemUpgrades?: Record<string, number>;
	bosses?: Record<string, number>;
}