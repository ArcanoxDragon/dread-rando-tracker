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
		const index = locations.findIndex(l => l.name === this.location.name);
		const newIndex = (index + 1) % locations.length;

		this.location = locations[newIndex];
	}

	@action
	decrementLocation() {
		const index = locations.findIndex(l => l.name === this.location.name);
		const newIndex = index <= 0 ? (locations.length - 1) : (index - 1);

		this.location = locations[newIndex];
	}

	@action
	setLocationFromShortcut(shortcut: string) {
		this.location = locations.find(l => l.initial.toUpperCase() === shortcut.toUpperCase()) ?? locations.Unknown;
	}
}