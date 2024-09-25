import { useState } from "react";
import { Tooltip } from "react-tooltip";
import locations from "../data/locations";

function MajorItemCell({ item, startingLocation }) {
  const [locationState, setLocationState] = useState(
    startingLocation === "S" ? 9 : 0
  );
  const [upgradeCounter, setUpgradeCounter] = useState(0);
  const [itemObtained, setItemObtained] = useState(startingLocation === "S");

  function incrementLocationState(e) {
    if (e.currentTarget === e.target) e.stopPropagation();
    if (locationState >= locations.length - 1) {
      setLocationState(0);
    } else {
      setLocationState(locationState + 1);
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

  return (
    <div
      data-tooltip-id={item.id}
      data-tooltip-content={item.name}
      className="w-[64px] h-[64px] flex justify-between"
      style={{
        backgroundImage: `url(${item.icon})`,
        backgroundSize: "contain",
        backgroundColor: `rgb(30,41,59,${itemObtained ? 0 : 0.75})`,
        backgroundBlendMode: "darken",
      }}
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        setItemObtained(!itemObtained);
      }}
    >
      <Tooltip id={item.id} />
      <button
        className="w-[24px] h-[24px]"
        onClick={(e) => incrementLocationState(e)}
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
