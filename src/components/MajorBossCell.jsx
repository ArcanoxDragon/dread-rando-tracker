import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

function MajorBossCell({ boss, hasDna }) {
  const [bossStatusCounter, setBossStatusCounter] = useState(0);

  function incrementBossStatusCounter(e) {
    if (bossStatusCounter >= 3) {
      setBossStatusCounter(0);
    } else {
      setBossStatusCounter(bossStatusCounter + 1);
    }
  }

  useEffect(() => {
    if (hasDna) {
      setBossStatusCounter(1);
    }
  }, []);

  return (
    <div
      className="w-[64px] h-[64px] flex justify-end items-end"
      data-tooltip-id={boss.id}
      data-tooltip-content={boss.name}
      style={{
        backgroundImage: `url(${boss.icon})`,
        backgroundSize: "contain",
        backgroundColor: `rgb(10,10,10,${bossStatusCounter > 1 ? 0.75 : 0})`,
        backgroundBlendMode: "darken",
        borderRadius: 8,
      }}
      onClick={(e) => incrementBossStatusCounter(e)}
    >
      <Tooltip id={boss.id} />
      {bossStatusCounter % 2 === 1 && (
        <button
          className="w-[32px] h-[32px]"
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: `url("./assets/item-icons/dna.png")`,
            backgroundSize: "cover",
            opacity: 1,
            borderColor: "#000000",
            borderWidth: 1,
            borderRadius: "50%",
          }}
        ></button>
      )}
    </div>
  );
}

export default MajorBossCell;
