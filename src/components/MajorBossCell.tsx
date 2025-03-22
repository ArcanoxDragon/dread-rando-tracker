import { useCallback } from "react";
import { Tooltip } from "react-tooltip";
import { BossState } from "../store/BossState";
import { observer } from "mobx-react-lite";

export interface MajorBossCellProps {
	bossState: BossState;
}

const MajorBossCell = observer(({ bossState }: MajorBossCellProps) => {
	const toggleDefeated = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget !== e.target) {
			return;
		}

		bossState.toggleDefeated();
	}, [bossState]);

	const toggleHasDna = useCallback((e: React.MouseEvent) => {
		e.preventDefault();

		if (e.currentTarget !== e.target || bossState.initialHasDna) {
			return;
		}

		bossState.toggleHasDna();
	}, [bossState]);

	return (
		<div
			className="w-[64px] h-[64px] flex justify-end items-end"
			data-tooltip-id={bossState.boss.id}
			data-tooltip-content={bossState.boss.name}
			style={{
				backgroundImage: `url(${bossState.boss.icon})`,
				backgroundSize: "contain",
				backgroundClip: "padding-box",
				backgroundColor: `rgb(10,10,10,${bossState.defeated ? 0.75 : 0})`,
				backgroundBlendMode: "darken",
				borderRadius: 8,
				borderColor: bossState.location.color,
				borderWidth: bossState.defeated ? 0 : 2,
				padding: !bossState.defeated ? 0 : 2,
			}}
			onClick={toggleDefeated}
			onContextMenu={toggleHasDna}
			onDoubleClick={e => e.preventDefault()}
		>
			<Tooltip id={bossState.boss.id} style={{ userSelect: "none" }} />
			{bossState.hasDna && (
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
});

export default MajorBossCell;
