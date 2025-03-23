import { ResourceLocation, MajorBoss, MajorItem } from "../data/types";
import { getBossData, getItemData } from "../utilities/loadTrackerData";
import { TrackerSettings } from "../utilities/settings";
import { BaseItemState } from "./BaseItemState";
import { SingleItemState } from "./SingleItemState";
import { ProgressiveItemState } from "./ProgressiveItemState";
import { BossState } from "./BossState";
import locations from "../data/locations";
import { autorun } from "mobx";
import { saveCurrentState } from "./persistence";

export class TrackerStore {
	readonly items: readonly BaseItemState[];
	readonly bosses: readonly BossState[];

	constructor(readonly settings: TrackerSettings) {
		this.items = getItemData(settings).map(i => this.createItemState(i));
		this.bosses = getBossData().map(b => this.createBossState(b));

		autorun(() => {
			saveCurrentState(this);
		});
	}

	private createItemState(item: MajorItem) {
		let startingLocation: ResourceLocation = locations.Unknown;

		if (item.id === "pulseRadar" && this.settings.startWithPulseRadar) {
			startingLocation = locations.Starting;
		}

		if (item.type === "single") {
			return new SingleItemState(item, startingLocation);
		} else if (item.type === "progressive") {
			return new ProgressiveItemState(item, startingLocation);
		} else {
			throw new Error(`Unknown item type: ${(item as MajorItem).type}`);
		}
	}

	private createBossState(boss: MajorBoss) {
		return new BossState(boss, this.settings.allMajorBossesHaveDna);
	}
}