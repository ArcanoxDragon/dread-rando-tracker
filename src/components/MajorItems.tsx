import MajorItemCell from "./MajorItemCell";
import MajorProgressiveItemCell from "./MajorProgressiveItemCell";
import { useEffect, useState } from "react";
import { getItemData } from "../utilities/loadTrackerData";
import { MajorItem } from "../data/types";
import { TrackerSettings } from "../utilities/settings";

export interface MajorItemsProps {
	settings: TrackerSettings;
}

export default function MajorItems({ settings }: MajorItemsProps) {
	const [items, setItems] = useState<MajorItem[]>([]);

	useEffect(() => {
		const trackerItems = getItemData(settings);

		// finalize item config

		setItems(trackerItems);
	}, [settings]);

	return (
		<div className="px-3 mb-4">
			<span className="text-white mb-5">Major Items</span>
			<div className="grid grid-cols-6 gap-2">
				{items.map((item) => {
					if (item.type === "progressive") {
						return <MajorProgressiveItemCell key={item.id} item={item} />;
					} else if (item.type === "single") {
						return (
							<MajorItemCell
								key={item.id}
								item={item}
								startingLocation={
									settings.startWithPulseRadar && item.name == "Pulse Radar"
										? "S"
										: "?"
								}
							/>
						);
					}
				})}
			</div>
		</div>
	);
}
