import { action, observable } from "mobx";
import { ResourceLocation, SingleMajorItem } from "../data/types";
import { BaseItemState } from "./BaseItemState";
import locations from "../data/locations";

export class SingleItemState extends BaseItemState {
	@observable accessor collected: boolean = false;
	@observable accessor upgradeCount: number = 0;

	constructor(readonly item: SingleMajorItem, startingLocation: ResourceLocation = locations.Unknown) {
		super(startingLocation);

		if (startingLocation === locations.Starting) {
			this.collected = true;
		}
	}

	@action
	toggleCollected() {
		if (this.startingLocation === locations.Starting) {
			return;
		}

		this.collected = !this.collected;
	}

	@action
	incrementUpgradeCount() {
		this.upgradeCount = (this.upgradeCount + 1) % (this.item.maxUpgrades + 1);
	}

	@action
	decrementUpgradeCount() {
		this.upgradeCount = this.upgradeCount <= 0 ? (this.item.maxUpgrades) : (this.upgradeCount - 1);
	}
}