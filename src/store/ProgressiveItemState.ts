import { action, computed, observable } from "mobx";
import { ResourceLocation, ProgressiveMajorItem } from "../data/types";
import { BaseItemState } from "./BaseItemState";
import locations from "../data/locations";

export class ProgressiveItemState extends BaseItemState {
	@observable accessor progression: number = 0;

	constructor(readonly item: ProgressiveMajorItem, startingLocation: ResourceLocation = locations.Unknown) {
		super(startingLocation);
	}

	@computed get icon(): string { return this.item.icons[this.progression] }

	@action
	incrementProgression() {
		this.progression = (this.progression + 1) % this.item.icons.length;
	}

	@action
	decrementProgression() {
		this.progression = this.progression <= 0 ? (this.item.icons.length - 1) : (this.progression - 1);
	}
}