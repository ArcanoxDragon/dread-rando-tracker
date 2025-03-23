import { useState } from "react";
import { Tooltip } from "react-tooltip";
import locations from "../data/locations";
import { useLocationHotkeys } from "../utilities/hotkeys";

function MajorProgressiveItemCell({ item }) {
  const [locationState, setLocationState] = useState(0);
  const [currentProgressiveItemState, setCurrentProgressiveItemState] =
    useState(0);
  const [mouseOver, setMouseOver] = useState(false);

  useLocationHotkeys(mouseOver, setLocationState);

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

  function incrementProgressiveItemState(e) {
    if (e.currentTarget !== e.target) return;
    if (currentProgressiveItemState >= item.icons.length - 1) {
      setCurrentProgressiveItemState(0);
    } else {
      setCurrentProgressiveItemState(currentProgressiveItemState + 1);
    }
  }

  function decrementProgressiveItemState(e) {
    if (e.currentTarget !== e.target) return;
    e.preventDefault();
    if (currentProgressiveItemState <= 0) {
      setCurrentProgressiveItemState(item.icons.length - 1);
    } else {
      setCurrentProgressiveItemState(currentProgressiveItemState - 1);
    }
  }

  let backgroundAlpha = 0.75;

  if (mouseOver && currentProgressiveItemState > 0) {
    backgroundAlpha = 0.15;
  } else if (mouseOver) {
    backgroundAlpha = 0.65;
  } else if (currentProgressiveItemState > 0) {
    backgroundAlpha = 0;
  }

  return (
    <div
      data-tooltip-id={item.id}
      data-tooltip-content={item.name}
      className="w-[64px] h-[64px] flex justify-start"
      style={{
        backgroundImage: `url(${item.icons[currentProgressiveItemState]})`,
        backgroundSize: "contain",
        backgroundColor: `rgb(30,41,59,${backgroundAlpha})`,
        backgroundBlendMode: "darken",
      }}
      onClick={(e) => incrementProgressiveItemState(e)}
      onContextMenu={(e) => decrementProgressiveItemState(e)}
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
    </div>
  );
}

export default MajorProgressiveItemCell;
