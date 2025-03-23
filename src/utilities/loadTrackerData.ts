import { TrackerSettings } from "./settings";
import {
	progressiveBeam,
	singleBeam,
	progressiveCharge,
	singleCharge,
	grappleBeam,
	morphBall,
	progressiveBomb,
	singleBomb,
	powerBomb,
	progressiveMissile,
	singleMissile,
	stormMissile,
	spiderMagnet,
	speedBooster,
	speedBoosterUpgrades,
	progressiveSpin,
	singleJump,
	screwAttack,
	progressiveSuit,
	singleSuit,
	phantomCloak,
	flashShift,
	flashShiftUpgrades,
	pulseRadar,
	majorBosses,
} from "../data";
import { MajorBoss, MajorItem } from "../data/types";

export function getItemData(itemsSettings: TrackerSettings) {
	const itemsList: MajorItem[] = [];

	if (itemsSettings?.progressiveBeam) {
		itemsList.push(...progressiveBeam);
	} else {
		itemsList.push(...singleBeam);
	}

	if (itemsSettings?.progressiveCharge) {
		itemsList.push(...progressiveCharge);
	} else {
		itemsList.push(...singleCharge);
	}

	itemsList.push(...grappleBeam);
	itemsList.push(...morphBall);

	if (itemsSettings?.progressiveBomb) {
		itemsList.push(...progressiveBomb);
	} else {
		itemsList.push(...singleBomb);
	}

	itemsList.push(...powerBomb);

	if (itemsSettings?.progressiveMissile) {
		itemsList.push(...progressiveMissile);
	} else {
		itemsList.push(...singleMissile);
	}

	itemsList.push(...stormMissile);
	itemsList.push(...spiderMagnet);

	if (itemsSettings?.speedBoosterHasUpgrades) {
		itemsList.push(...speedBoosterUpgrades);
	} else {
		itemsList.push(...speedBooster);
	}

	if (itemsSettings?.progressiveSpin) {
		itemsList.push(...progressiveSpin);
	} else {
		itemsList.push(...singleJump);
	}

	itemsList.push(...screwAttack);

	if (itemsSettings?.progressiveSuit) {
		itemsList.push(...progressiveSuit);
	} else {
		itemsList.push(...singleSuit);
	}

	itemsList.push(...phantomCloak);

	if (itemsSettings?.flashShiftHasUpgrades) {
		itemsList.push(...flashShiftUpgrades);
	} else {
		itemsList.push(...flashShift);
	}

	itemsList.push(...pulseRadar);

	return itemsList;
}

export function getBossData() {
	return majorBosses;
}

export function getImagesToPreload(items: MajorItem[], bosses: MajorBoss[]) {
	const itemImages = items.flatMap(item => item.type === "progressive" ? item.icons : [item.icon]);
	const bossImages = bosses.map(boss => boss.icon);

	return itemImages.concat(bossImages, [
		"./assets/go.png",
		"./assets/item-icons/dna.png",
	]);
}
