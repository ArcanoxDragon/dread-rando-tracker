import MajorBossCell from "./MajorBossCell";
import { BossState } from "../store/BossState";

export interface MajorBossesProps {
	bosses: readonly BossState[];
}

export default function MajorBosses({ bosses }: MajorBossesProps) {
	return (
		<div className="px-3">
			<div className="flex justify-between">
				<span className="text-white">Major Bosses</span>
			</div>

			<div className="grid grid-cols-6 gap-2">
				{bosses.map(bossState => {
					return <MajorBossCell key={bossState.boss.id} bossState={bossState} />;
				})}
			</div>
		</div>
	);
}
