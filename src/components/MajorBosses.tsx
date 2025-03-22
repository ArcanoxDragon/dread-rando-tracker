import MajorBossCell from "./MajorBossCell";
import { useEffect, useState } from "react";
import { getBossData } from "../utilities/loadTrackerData";
import { TrackerSettings } from "../utilities/settings";
import { MajorBoss } from "../data/types";

export interface MajorBossesProps {
	settings: TrackerSettings;
}

export default function MajorBosses({ settings }: MajorBossesProps) {
	const [bosses, setBosses] = useState<MajorBoss[]>([]);

	useEffect(() => {
		const bossesList = getBossData();

		// finalize item config

		setBosses(bossesList);
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
							alwaysHasDna={settings.allMajorBossesHaveDna}
						/>
					);
				})}
			</div>
		</div>
	);
}
