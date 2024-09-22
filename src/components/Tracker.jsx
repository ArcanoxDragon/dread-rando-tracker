import MajorItems from "./MajorItems";
import MajorBosses from "./MajorBosses";

function Tracker() {
  return (
    <div className="container">
      <MajorItems
        itemsSettings={{
          speedBoosterHasUpgrades: true,
          flashShiftHasUpgrades: true,
          progressiveCharge: true,
          progressiveSuit: true,
        }}
      />

      <MajorBosses />
    </div>
  );
}

export default Tracker;
