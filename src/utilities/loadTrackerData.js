import progressiveBeam from "../data/progressiveBeam";
import singleBeam from "../data/singleBeam";
import progressiveCharge from "../data/progressiveCharge";
import singleCharge from "../data/singleCharge";
import grappleBeam from "../data/grappleBeam";
import morphBall from "../data/morphBall";
import progressiveBomb from "../data/progressiveBomb";
import singleBomb from "../data/singleBomb";
import powerBomb from "../data/powerBomb";
import progressiveMissile from "../data/progressiveMissile";
import singleMissile from "../data/singleMissile";
import stormMissile from "../data/stormMissile";
import spiderMagnet from "../data/spiderMagnet";
import speedBooster from "../data/speedBooster";
import speedBoosterUpgrades from "../data/speedBoosterUpgrades";
import progressiveJump from "../data/progressiveJump";
import singleJump from "../data/singleJump";
import screwAttack from "../data/screwAttack";
import progressiveSuit from "../data/progressiveSuit";
import singleSuit from "../data/singleSuit";
import phantomCloak from "../data/phantomCloak";
import flashShift from "../data/flashShift";
import flashShiftUpgrades from "../data/flashShiftUpgrades";
import pulseRadar from "../data/pulseRadar";
import majorBosses from "../data/majorBosses";

export function getItemData(itemsSettings) {
  let buildItemList = [];
  if (itemsSettings?.progressiveBeam) {
    buildItemList = buildItemList.concat(progressiveBeam);
  } else {
    buildItemList = buildItemList.concat(singleBeam);
  }

  if (itemsSettings?.progressiveCharge) {
    buildItemList = buildItemList.concat(progressiveCharge);
  } else {
    buildItemList = buildItemList.concat(singleCharge);
  }

  buildItemList = buildItemList.concat(grappleBeam);
  buildItemList = buildItemList.concat(morphBall);

  if (itemsSettings?.progressiveBomb) {
    buildItemList = buildItemList.concat(progressiveBomb);
  } else {
    buildItemList = buildItemList.concat(singleBomb);
  }

  buildItemList = buildItemList.concat(powerBomb);

  if (itemsSettings?.progressiveMissile) {
    buildItemList = buildItemList.concat(progressiveMissile);
  } else {
    buildItemList = buildItemList.concat(singleMissile);
  }

  buildItemList = buildItemList.concat(stormMissile);
  buildItemList = buildItemList.concat(spiderMagnet);

  if (itemsSettings?.speedBoosterHasUpgrades) {
    buildItemList = buildItemList.concat(speedBoosterUpgrades);
  } else {
    buildItemList = buildItemList.concat(speedBooster);
  }

  if (itemsSettings?.progressiveJump) {
    buildItemList = buildItemList.concat(progressiveJump);
  } else {
    buildItemList = buildItemList.concat(singleJump);
  }

  buildItemList = buildItemList.concat(screwAttack);

  if (itemsSettings?.progressiveSuit) {
    buildItemList = buildItemList.concat(progressiveSuit);
  } else {
    buildItemList = buildItemList.concat(singleSuit);
  }

  buildItemList = buildItemList.concat(phantomCloak);

  if (itemsSettings?.flashShiftHasUpgrades) {
    buildItemList = buildItemList.concat(flashShiftUpgrades);
  } else {
    buildItemList = buildItemList.concat(flashShift);
  }

  buildItemList = buildItemList.concat(pulseRadar);

  return buildItemList;
}

export function getBossData() {
  return majorBosses;
}
