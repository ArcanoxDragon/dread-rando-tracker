import { ResourceLocation, LocationKey } from "./types";

const locationsArray: ResourceLocation[] = [
	{ name: "Unknown", initial: "?", color: "#ffffff" },
	{ name: "Artaria", initial: "A", color: "#B8A853" },
	{ name: "Burenia", initial: "B", color: "#4787AF" },
	{ name: "Cataris", initial: "C", color: "#DF0000" },
	{ name: "Dairon", initial: "D", color: "#EA5CB5" },
	{ name: "Elun", initial: "E", color: "#9800EA" },
	{ name: "Ferenia", initial: "F", color: "#2D2DE3" },
	{ name: "Ghavoran", initial: "G", color: "#49D239" },
	{ name: "Hanubia", initial: "H", color: "#D68845" },
	{ name: "Starting", initial: "S", color: "#ffffff" },
];

export type Locations = ResourceLocation[] & { [Key in LocationKey]: ResourceLocation };

const locations: Locations = [...locationsArray] as Locations;

for (const location of locations) {
	locations[location.name] = location;
}

export default locations;
