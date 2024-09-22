import MajorBossCell from "./MajorBossCell";
import { useEffect, useState } from "react";
import { getBossData } from "../utilities/loadTrackerData";

function MajorBosses({ settings }) {
  const [bosses, setBosses] = useState([]);

  useEffect(() => {
    const buildBossList = getBossData(settings);

    // finalize item config

    setBosses(buildBossList);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-8">
      <span className="text-white">Major Bosses</span>
      <div className="grid grid-cols-6 gap-x-4 gap-y-1 max-w-96">
        {bosses.map((boss) => {
          return <MajorBossCell key={boss.id} item={boss} />;
        })}
      </div>
    </div>
  );
}

export default MajorBosses;
