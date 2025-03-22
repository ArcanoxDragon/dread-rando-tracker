const SettingsKey = "tracker.lastSettings";

export interface TrackerSettings {
	progressiveBeam?: boolean;
	progressiveCharge?: boolean;
	progressiveBomb?: boolean;
	progressiveMissile?: boolean;
	progressiveSpin?: boolean;
	progressiveSuit?: boolean;
	speedBoosterHasUpgrades?: boolean;
	flashShiftHasUpgrades?: boolean;
	startWithPulseRadar?: boolean;
	allMajorBossesHaveDna?: boolean;
}

export function loadPreviousSettings(): TrackerSettings {
	const settingsJson = localStorage.getItem(SettingsKey);

	try {
		const settings = JSON.parse(settingsJson ?? "{}");

		return settings ?? {};
	} catch (err) {
		console.error("Error loading previous settings:", err);
		return {};
	}
}

export function saveSettings(settings: TrackerSettings): void {
	try {
		localStorage.setItem(SettingsKey, JSON.stringify(settings));
	} catch (err) {
		console.error("Could not save settings to local storage:", err);
	}
}