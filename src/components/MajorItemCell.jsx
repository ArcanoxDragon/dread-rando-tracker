import { useState } from "react";

const locations = ["?", "A", "B", "C", "D", "E", "F", "G", "H"];

function MajorItemCell({ item }) {
  const [locationState, setLocationState] = useState(0);
  const [upgradeCounter, setUpgradeCounter] = useState(0);
  const [itemObtained, setItemObtained] = useState(false);

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
      className="w-[64px] h-[64px] flex justify-between"
      style={{
        backgroundImage: `url(${item.icon})`,
        backgroundSize: "contain",
        backgroundColor: `rgb(0,0,0,${
          itemObtained || upgradeCounter > 0 ? 0 : 0.5
        })`,
        backgroundBlendMode: "darken",
      }}
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        if (item.maxUpgrades > 0) return;
        setItemObtained(!itemObtained);
      }}
    >
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
        <div className="text-sm">{locations[locationState]}</div>
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
