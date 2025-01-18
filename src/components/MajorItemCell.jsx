import { useState } from "react";
import { Tooltip } from "react-tooltip";
import locations from "../data/locations";
import { useLocationHotkeys } from "../utilities/hotkeys";

function MajorItemCell({ item, startingLocation }) {
  const [locationState, setLocationState] = useState(
    startingLocation === "S" ? 9 : 0
  );
  const [upgradeCounter, setUpgradeCounter] = useState(0);
  const [itemObtained, setItemObtained] = useState(startingLocation === "S");
  const [mouseOver, setMouseOver] = useState(false);
  const hotkeysDisabled = startingLocation === "S";

  useLocationHotkeys(mouseOver, setLocationState, hotkeysDisabled);

  function incrementLocationState(e) {
    if (e.currentTarget === e.target) e.stopPropagation();
    if (locationState >= locations.length - 1) {
      setLocationState(0);
    } else {
      setLocationState(locationState + 1);
    }
  }

  function decrementLocationState(e) {
    if (e.currentTarget === e.target) e.stopPropagation();
    e.preventDefault();
    if (locationState <= 0) {
      setLocationState(locations.length - 1);
    } else {
      setLocationState(locationState - 1);
    }
  }

  function incrementUpgradeCounter(e) {
    if (e.currentTarget === e.target) e.stopPropagation();
    if (upgradeCounter >= item.maxUpgrades) {
      setUpgradeCounter(0);
    } else {
      setUpgradeCounter(upgradeCounter + 1);
    }
  }

  function decrementUpgradeCounter(e) {
    if (e.currentTarget === e.target) e.stopPropagation();
    e.preventDefault();
    if (upgradeCounter <= 0) {
      setUpgradeCounter(item.maxUpgrades);
    } else {
      setUpgradeCounter(upgradeCounter - 1);
    }
  }

  let backgroundAlpha = 0.75;

  if (mouseOver && itemObtained) {
    backgroundAlpha = 0.15;
  } else if (mouseOver) {
    backgroundAlpha = 0.65;
  } else if (itemObtained) {
    backgroundAlpha = 0;
  }

  return (
    <div
      data-tooltip-id={item.id}
      data-tooltip-content={item.name}
      className="w-[64px] h-[64px] flex justify-between"
      style={{
        backgroundImage: `url(${item.icon})`,
        backgroundSize: "contain",
        backgroundColor: `rgb(30,41,59,${backgroundAlpha})`,
        backgroundBlendMode: "darken",
      }}
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        setItemObtained(!itemObtained);
      }}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
    >
      <Tooltip id={item.id} />
      <button
        className="w-[24px] h-[24px]"
        onClick={(e) => incrementLocationState(e)}
        onContextMenu={(e) => decrementLocationState(e)}
        style={{
          backgroundColor: "#ffffff",
          opacity: 1,
          borderColor: "#000000",
          borderWidth: 1,
          borderRadius: "50%",
        }}
      >
        <div className="text-sm">{locations[locationState].initial}</div>
      </button>
      {item.maxUpgrades > 0 && (
        <button
          className="w-[24px] h-[24px] self-end"
          onClick={(e) => incrementUpgradeCounter(e)}
          onContextMenu={(e) => decrementUpgradeCounter(e)}
          style={{
            backgroundColor: "#ffffff",
            opacity: 1,
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: "50%",
          }}
        >
          <div className="text-sm">{upgradeCounter}</div>
        </button>
      )}
    </div>
  );
}

export default MajorItemCell;
