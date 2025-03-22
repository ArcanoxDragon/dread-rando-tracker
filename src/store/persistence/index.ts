import { runInAction } from "mobx";
import { ProgressiveItemState } from "../ProgressiveItemState";
import { SingleItemState } from "../SingleItemState";
import { TrackerStore } from "../TrackerStore";
import { PersistedState } from "./types";
import locations from "../../data/locations";

const StateKey = "tracker.lastState";

export function saveCurrentState(store: TrackerStore): void {
	try {
		localStorage.setItem(StateKey, serializeState(store));
	} catch (err) {
		console.error("Could not save settings to local storage:", err);
	}
}

export function loadPreviousState(): TrackerStore | null {
	const stateJson = localStorage.getItem(StateKey);

	try {
		return stateJson ? deserializeState(stateJson) : null;
	} catch (err) {
		console.error("Error loading previous state:", err);
		return null;
	}
}

export function hasSavedState(): boolean {
	return Boolean(localStorage.getItem(StateKey));
}

function serializeState(store: TrackerStore): string {
	const persistedState: PersistedState = {
		settings: store.settings,
		items: {},
		itemLocations: {},
		itemUpgrades: {},
		bosses: {},
	};

	for (const item of store.items) {
		let itemValue: number;
		let itemUpgrades: number = 0;

		if (item instanceof ProgressiveItemState) {
			itemValue = item.progression;
		} else if (item instanceof SingleItemState) {
			itemValue = item.collected ? 1 : 0;
			itemUpgrades = item.upgradeCount;
		} else {
			continue;
		}

		persistedState.items![item.item.id] = itemValue;

		if (itemUpgrades > 0) {
			persistedState.itemUpgrades![item.item.id] = itemUpgrades;
		}

		if (item.location !== locations.Unknown) {
			persistedState.itemLocations![item.item.id] = item.location.initial;
		}
	}

	for (const boss of store.bosses) {
		if (boss.defeated || boss.hasDna) {
			const bossValue = (boss.defeated ? 1 : 0) | (boss.hasDna ? (1 << 1) : 0);

			persistedState.bosses![boss.boss.id] = bossValue;
		}
	}

	return JSON.stringify(persistedState);
}

function deserializeState(stateJson: string): TrackerStore | null {
	const persistedState = JSON.parse(stateJson) as PersistedState | null;

	if (!persistedState) {
		return null;
	}

	const {
		settings,
		items = {},
		itemLocations = {},
		itemUpgrades = {},
		bosses = {},
	} = persistedState;
	const store = new TrackerStore(settings);

	runInAction(() => {
		for (const item of store.items) {
			const { id } = item.item;

			if (id in items) {
				if (item instanceof ProgressiveItemState) {
					item.progression = Math.max(0, Math.min(items[id], item.item.icons.length - 1));
				} else if (item instanceof SingleItemState) {
					item.collected = items[id] > 0;
				}
			}

			if (id in itemLocations) {
				item.setLocationFromShortcut(itemLocations[id]);
			}

			if (id in itemUpgrades && item instanceof SingleItemState) {
				item.upgradeCount = itemUpgrades[id];
			}
		}

		for (const boss of store.bosses) {
			const { id } = boss.boss;

			if (id in bosses) {
				boss.defeated = (bosses[id] & 1) > 0;
				boss.hasDna = (bosses[id] & (1 << 1)) > 0;
			}
		}
	});

	return store;
}