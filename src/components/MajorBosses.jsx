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
    <div className="px-3">
      <div className="flex justify-between">
        <span className="text-white">Major Bosses</span>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {bosses.map((boss) => {
          return (
            <MajorBossCell
              key={boss.id}
              boss={boss}
              hasDna={settings.allMajorBossesHaveDna}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MajorBosses;
