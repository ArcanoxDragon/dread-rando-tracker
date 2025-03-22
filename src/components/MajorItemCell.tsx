import { useCallback, useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import locations from "../data/locations";
import { SingleMajorItem } from "../data/types";

export interface MajorItemCellProps {
	item: SingleMajorItem;
	startingLocation: string;
}

export default function MajorItemCell({ item, startingLocation }: MajorItemCellProps) {
	const [locationState, setLocationState] = useState(startingLocation === "S" ? 9 : 0);
	const [upgradeCounter, setUpgradeCounter] = useState(0);
	const [itemObtained, setItemObtained] = useState(startingLocation === "S");
	const [mouseOver, setMouseOver] = useState(false);
	const mouseOverRef = useRef(false); // expose state through this to avoid constantly attaching/detaching window listener

	useEffect(() => { mouseOverRef.current = mouseOver; }, [mouseOver]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!mouseOverRef.current || startingLocation === "S") {
				return;
			}

			if (e.key === "?" || e.key === "Backspace" || e.key === "Delete") {
				// Clear location
				setLocationState(0);
			} else if (e.key.toUpperCase() === "S") {
				// Starting
				setLocationState(9);
			} else if (/^[a-h]$/i.test(e.key)) {
				const locationState = 1 + (e.key.toUpperCase().charCodeAt(0) - "A".charCodeAt(0)); // A = 1, B = 2, etc.

				setLocationState(locationState);
			}
		};

		window.addEventListener("keydown", handleKeyDown, { capture: true });

		return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
	}, [startingLocation]);

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
