import { useState } from "react";
import { Tooltip } from "react-tooltip";

function MajorBossCell({ boss }) {
  const [bossStatusCounter, setBossStatusCounter] = useState(0);

  function incrementBossStatusCounter(e) {
    if (bossStatusCounter >= 3) {
      setBossStatusCounter(0);
    } else {
      setBossStatusCounter(bossStatusCounter + 1);
    }
  }

  return (
    <div
      className="w-[64px] h-[64px] flex justify-end items-end"
      data-tooltip-id={boss.id}
      data-tooltip-content={boss.name}
      style={{
        backgroundImage: `url(${boss.icon})`,
        backgroundSize: "contain",
        backgroundColor: `rgb(0,0,0,${bossStatusCounter > 1 ? 0 : 0.5})`,
        backgroundBlendMode: "darken",
        borderRadius: 8,
      }}
      onClick={(e) => incrementBossStatusCounter(e)}
    >
      <Tooltip id={boss.id} />
      {bossStatusCounter % 2 === 1 && (
        <button
          className="w-[48px] h-[48px]"
          style={{
            backgroundColor: "#ffffff",
            opacity: 1,
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: "50%",
          }}
        >
          <div className="text-sm">DNA</div>
        </button>
      )}
    </div>
  );
}

export default MajorBossCell;
