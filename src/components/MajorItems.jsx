import MajorItemCell from "./MajorItemCell";
import MajorProgressiveItemCell from "./MajorProgressiveItemCell";
import { useEffect, useState } from "react";
import { getItemData } from "../utilities/loadTrackerData";

function MajorItems({ settings }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const buildItemList = getItemData(settings);

    // finalize item config

    setItems(buildItemList);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-8">
      <span className="text-white">Major Items</span>
      <div className="grid grid-cols-6 gap-x-4 gap-y-1 max-w-96">
        {items.map((item) => {
          if (item.type === "progressive") {
            return <MajorProgressiveItemCell key={item.id} item={item} />;
          } else if (item.type === "single") {
            return (
              <MajorItemCell key={item.id} item={item} hasUpgrades={false} />
            );
          }
        })}
      </div>
    </div>
  );
}

export default MajorItems;
