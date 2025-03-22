import { useCallback, useState } from "react";
import { Tooltip } from "react-tooltip";
import locations from "../data/locations";
import { SingleMajorItem } from "../data/types";
import { useLocationHotkeys } from "../utilities/hotkeys";

export interface MajorItemCellProps {
	item: SingleMajorItem;
	startingLocation: string;
}

export default function MajorItemCell({ item, startingLocation }: MajorItemCellProps) {
	const [locationState, setLocationState] = useState(startingLocation === "S" ? 9 : 0);
	const [upgradeCounter, setUpgradeCounter] = useState(0);
	const [itemObtained, setItemObtained] = useState(startingLocation === "S");
	const [mouseOver, setMouseOver] = useState(false);
	const hotkeysDisabled = startingLocation === "S";

	useLocationHotkeys(mouseOver, setLocationState, hotkeysDisabled);

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

	const incrementUpgradeCounter = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		setUpgradeCounter(state => (state + 1) % item.maxUpgrades);
	}, [item]);

	const decrementUpgradeCounter = useCallback((e: React.MouseEvent) => {
		e.preventDefault();

		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		setUpgradeCounter(state => state <= 0 ? (locations.length - 1) : (state - 1));
	}, []);

	let backgroundAlpha = 0.75;

	if (mouseOver && itemObtained) {
		backgroundAlpha = 0.15;
	} else if (mouseOver) {
		backgroundAlpha = 0.65;
	} else if (itemObtained) {
		backgroundAlpha = 0;
	}

	return (
		<div
			data-tooltip-id={item.id}
			data-tooltip-content={item.name}
			className="w-[64px] h-[64px] flex justify-between"
			style={{
				backgroundImage: `url(${item.icon})`,
				backgroundSize: "contain",
				backgroundColor: `rgb(30,41,59,${backgroundAlpha})`,
				backgroundBlendMode: "darken",
			}}
			onClick={(e) => {
				if (e.currentTarget !== e.target) return;
				setItemObtained(!itemObtained);
			}}
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
			{item.maxUpgrades > 0 && (
				<button
					className="w-[24px] h-[24px] self-end"
					onClick={incrementUpgradeCounter}
					onContextMenu={decrementUpgradeCounter}
					style={{
						backgroundColor: "#ffffff",
						opacity: 1,
						borderColor: "#000000",
						borderWidth: 1,
						borderRadius: "50%",
					}}
				>
					<div className="text-sm">{upgradeCounter}</div>
				</button>
			)}
		</div>
	);
}
