const SettingsKey = "tracker.lastSettings";

export function loadPreviousSettings() {
  const settingsJson = localStorage.getItem(SettingsKey);

  try {
    const settings = JSON.parse(settingsJson ?? "{}");

    return settings ?? {};
  } catch (err) {
    console.error("Error loading previous settings:", err);
    return {};
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SettingsKey, JSON.stringify(settings));
  } catch (err) {
    console.error("Could not save settings to local storage:", err);
  }
}