import { useCallback, useState } from "react";
import { Tooltip } from "react-tooltip";
import { ProgressiveMajorItem } from "../data/types";
import locations from "../data/locations";
import { useLocationHotkeys } from "../utilities/hotkeys";

export interface MajorProgressiveItemCellProps {
	item: ProgressiveMajorItem;
}

export default function MajorProgressiveItemCell({ item }: MajorProgressiveItemCellProps) {
	const [locationState, setLocationState] = useState(0);
	const [progressionState, setProgressionState] = useState(0);
	const [mouseOver, setMouseOver] = useState(false);

	useLocationHotkeys(mouseOver, setLocationState);

	const incrementLocationState = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		setLocationState(state => (state + 1) % locations.length);
	}, []);

	const decrementLocationState = useCallback((e: React.MouseEvent) => {
		e.preventDefault();

		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		setLocationState(state => state <= 0 ? (locations.length - 1) : (state - 1));
	}, []);

	const incrementProgressionState = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		setProgressionState(state => (state + 1) % item.icons.length);
	}, [item]);

	const decrementProgressionState = useCallback((e: React.MouseEvent) => {
		e.preventDefault();

		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		setProgressionState(state => state <= 0 ? (locations.length - 1) : (state - 1));
	}, []);

	let backgroundAlpha = 0.75;

	if (mouseOver && progressionState > 0) {
		backgroundAlpha = 0.15;
	} else if (mouseOver) {
		backgroundAlpha = 0.65;
	} else if (progressionState > 0) {
		backgroundAlpha = 0;
	}

	return (
		<div
			data-tooltip-id={item.id}
			data-tooltip-content={item.name}
			className="w-[64px] h-[64px] flex justify-start"
			style={{
				backgroundImage: `url(${item.icons[progressionState]})`,
				backgroundSize: "contain",
				backgroundColor: `rgb(30,41,59,${backgroundAlpha})`,
				backgroundBlendMode: "darken",
			}}
			onClick={incrementProgressionState}
			onContextMenu={decrementProgressionState}
			onMouseEnter={() => setMouseOver(true)}
			onMouseLeave={() => setMouseOver(false)}
		>
			<Tooltip id={item.id} />
			<button
				className="w-[24px] h-[24px]"
				onClick={incrementLocationState}
				onContextMenu={decrementLocationState}
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
