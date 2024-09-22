import { useState } from "react";
import { Tooltip } from "react-tooltip";

const locations = ["?", "A", "B", "C", "D", "E", "F", "G", "H"];

function MajorProgressiveItemCell({ item }) {
  const [locationState, setLocationState] = useState(0);
  const [currentProgressiveItemState, setCurrentProgressiveItemState] =
    useState(0);

  function incrementLocationState(e) {
    if (e.currentTarget === e.target) e.stopPropagation();
    if (locationState >= locations.length - 1) {
      setLocationState(0);
    } else {
      setLocationState(locationState + 1);
    }
  }

  function incrementProgressiveItemState(e) {
    if (e.currentTarget !== e.target) return;
    if (currentProgressiveItemState >= item.icons.length - 1) {
      setCurrentProgressiveItemState(0);
    } else {
      setCurrentProgressiveItemState(currentProgressiveItemState + 1);
    }
  }

  return (
    <div
      data-tooltip-id={item.id}
      data-tooltip-content={item.name}
      className="w-[64px] h-[64px] flex justify-start"
      style={{
        backgroundImage: `url(${item.icons[currentProgressiveItemState]})`,
        backgroundSize: "contain",
        backgroundColor: `rgb(0,0,0,${
          currentProgressiveItemState === 0 ? 0.5 : 0
        })`,
        backgroundBlendMode: "darken",
      }}
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;
        incrementProgressiveItemState(e);
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
        <div className="text-sm">{locations[locationState]}</div>
      </button>
    </div>
  );
}

export default MajorProgressiveItemCell;
