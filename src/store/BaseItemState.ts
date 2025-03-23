import { action, observable } from "mobx";
import { ResourceLocation, MajorItem } from "../data/types";
import locations from "../data/locations";

export abstract class BaseItemState {
	abstract readonly item: MajorItem;

	@observable accessor location: ResourceLocation;

	constructor(readonly startingLocation: ResourceLocation) {
		this.location = startingLocation;
	}

	@action
	incrementLocation() {
		if (this.startingLocation === locations.Starting) {
			// Can't change location of starting items
			return;
		}

		const index = locations.findIndex(l => l.name === this.location.name);
		const newIndex = (index + 1) % locations.length;

		this.location = locations[newIndex];
	}

	@action
	decrementLocation() {
		if (this.startingLocation === locations.Starting) {
			// Can't change location of starting items
			return;
		}

		const index = locations.findIndex(l => l.name === this.location.name);
		const newIndex = index <= 0 ? (locations.length - 1) : (index - 1);

		this.location = locations[newIndex];
	}

	@action
	setLocationFromShortcut(shortcut: string) {
		if (this.startingLocation === locations.Starting) {
			// Can't change location of starting items
			return;
		}

		this.location = locations.find(l => l.initial.toUpperCase() === shortcut.toUpperCase()) ?? locations.Unknown;
	}
}