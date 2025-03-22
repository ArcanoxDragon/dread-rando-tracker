import { useState } from "react";
import { Tooltip } from "react-tooltip";
import locations from "../data/locations";
import { MajorBoss } from "../data/types";

export interface MajorBossCellProps {
	boss: MajorBoss;
	alwaysHasDna: boolean;
}

export default function MajorBossCell({ boss, alwaysHasDna }: MajorBossCellProps) {
	const [isBossDefeated, setIsBossDefeated] = useState(false);
	const [doesBossHaveDna, setDoesBossHaveDna] = useState(alwaysHasDna);

	return (
		<div
			className="w-[64px] h-[64px] flex justify-end items-end"
			data-tooltip-id={boss.id}
			data-tooltip-content={boss.name}
			style={{
				backgroundImage: `url(${boss.icon})`,
				backgroundSize: "contain",
				backgroundClip: "padding-box",
				backgroundColor: `rgb(10,10,10,${isBossDefeated ? 0.75 : 0})`,
				backgroundBlendMode: "darken",
				borderRadius: 8,
				borderColor:
					locations[locations.findIndex((l) => boss.location === l.name)].color,
				borderWidth: isBossDefeated ? 0 : 2,
				padding: !isBossDefeated ? 0 : 2,
			}}
			onClick={(e) => {
				e.preventDefault();
				setIsBossDefeated(!isBossDefeated);
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				if (!alwaysHasDna) {
					setDoesBossHaveDna(!doesBossHaveDna);
				}
			}}
		>
			<Tooltip id={boss.id} style={{ userSelect: "none" }} />
			{doesBossHaveDna && (
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
