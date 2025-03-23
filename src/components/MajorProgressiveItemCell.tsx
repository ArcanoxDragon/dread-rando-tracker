import { useCallback, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useLocationHotkeys } from "../utilities/hotkeys";
import { ProgressiveItemState } from "../store/ProgressiveItemState";
import { observer } from "mobx-react-lite";
import locations from "../data/locations";

export interface MajorProgressiveItemCellProps {
	itemState: ProgressiveItemState;
}

const MajorProgressiveItemCell = observer(({ itemState }: MajorProgressiveItemCellProps) => {
	const [mouseOver, setMouseOver] = useState(false);
	const hotkeysDisabled = itemState.startingLocation === locations.Starting;

	useLocationHotkeys(mouseOver, itemState, hotkeysDisabled);

	const incrementLocationState = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget !== e.target) {
			return;
		}

		itemState.incrementLocation();
	}, [itemState]);

	const decrementLocationState = useCallback((e: React.MouseEvent) => {
		e.preventDefault();

		if (e.currentTarget !== e.target) {
			return;
		}

		itemState.decrementLocation();
	}, [itemState]);

	const incrementProgressionState = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget !== e.target) {
			return;
		}

		itemState.incrementProgression();
	}, [itemState]);

	const decrementProgressionState = useCallback((e: React.MouseEvent) => {
		e.preventDefault();

		if (e.currentTarget !== e.target) {
			return;
		}

		itemState.decrementProgression();
	}, [itemState]);

	let backgroundAlpha = 0.75;

	if (mouseOver && itemState.progression > 0) {
		backgroundAlpha = 0.15;
	} else if (mouseOver) {
		backgroundAlpha = 0.65;
	} else if (itemState.progression > 0) {
		backgroundAlpha = 0;
	}

	return (
		<div
			data-tooltip-id={itemState.item.id}
			data-tooltip-content={itemState.item.name}
			className="w-[64px] h-[64px] flex justify-start"
			style={{
				backgroundImage: `url(${itemState.icon})`,
				backgroundSize: "contain",
				backgroundColor: `rgb(30,41,59,${backgroundAlpha})`,
				backgroundBlendMode: "darken",
			}}
			onClick={incrementProgressionState}
			onContextMenu={decrementProgressionState}
			onDoubleClick={e => e.preventDefault()}
			onMouseEnter={() => setMouseOver(true)}
			onMouseLeave={() => setMouseOver(false)}
		>
			<Tooltip id={itemState.item.id} />
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
				<div className="text-sm">{itemState.location.initial}</div>
			</button>
		</div>
	);
});

export default MajorProgressiveItemCell;