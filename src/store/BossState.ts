import { action, observable } from "mobx";
import { ResourceLocation, MajorBoss } from "../data/types";
import locations from "../data/locations";

export class BossState {
	readonly location: ResourceLocation;

	@observable accessor defeated: boolean = false;
	@observable accessor hasDna: boolean;

	constructor(readonly boss: MajorBoss, readonly initialHasDna: boolean = false) {
		this.hasDna = initialHasDna;
		this.location = locations[boss.location];

		if (!this.location) {
			throw new Error(`Unknown location for boss \"${boss.id}\": ${boss.location}`);
		}
	}

	@action
	toggleDefeated() {
		this.defeated = !this.defeated;
	}

	@action
	toggleHasDna() {
		this.hasDna = !this.hasDna;
	}
}