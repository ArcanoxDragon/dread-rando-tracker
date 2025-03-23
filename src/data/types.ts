export type LocationKey =
	| "Unknown"
	| "Starting"
	| "Artaria"
	| "Burenia"
	| "Cataris"
	| "Dairon"
	| "Elun"
	| "Ferenia"
	| "Ghavoran"
	| "Hanubia"
	| "Itorash";

export interface ResourceLocation {
	name: LocationKey;
	initial: string;
	color: string;
}

export interface MajorBoss {
	id: string;
	name: string;
	icon: string;
	location: LocationKey;
}

export type MajorItem = SingleMajorItem | ProgressiveMajorItem;

interface BaseMajorItem {
	type: "single" | "progressive";
	id: string;
	name: string;
}

export interface SingleMajorItem extends BaseMajorItem {
	type: "single";
	icon: string;
	maxUpgrades: number;
}

export interface ProgressiveMajorItem extends BaseMajorItem {
	type: "progressive";
	icons: string[];
}