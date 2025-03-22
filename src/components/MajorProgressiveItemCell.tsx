import { useCallback, useState } from "react";
import { Tooltip } from "react-tooltip";
import { ProgressiveMajorItem } from "../data/types";
import locations from "../data/locations";

export interface MajorProgressiveItemCellProps {
	item: ProgressiveMajorItem;
}

export default function MajorProgressiveItemCell({ item }: MajorProgressiveItemCellProps) {
	const [locationState, setLocationState] = useState(0);
	const [progressionState, setProgressionState] = useState(0);

	const incrementLocationState = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		setLocationState(state => (state + 1) % locations.length);
	}, []);

	const incrementProgressionState = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		setProgressionState(state => (state + 1) % item.icons.length);
	}, [item]);

	return (
		<div
			data-tooltip-id={item.id}
			data-tooltip-content={item.name}
			className="w-[64px] h-[64px] flex justify-start"
			style={{
				backgroundImage: `url(${item.icons[progressionState]})`,
				backgroundSize: "contain",
				backgroundColor: `rgb(30,41,59,${progressionState === 0 ? 0.75 : 0
					})`,
				backgroundBlendMode: "darken",
			}}
			onClick={incrementProgressionState}
		>
			<Tooltip id={item.id} />
			<button
				className="w-[24px] h-[24px]"
				onClick={incrementLocationState}
				style={{
					backgroundColor: "#ffffff",
					opacity: 1,
					borderColor: "#000000",
					borderWidth: 1,
					borderRadius: "50%",
				}}
			>
				<div className="text-sm">{locations[locationState].initial}</div>
			</button>
		</div>
	);
}
