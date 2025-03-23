import { useCallback, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useLocationHotkeys } from "../utilities/hotkeys";
import { SingleItemState } from "../store/SingleItemState";
import locations from "../data/locations";
import { observer } from "mobx-react-lite";

export interface MajorItemCellProps {
	itemState: SingleItemState;
}

const MajorItemCell = observer(({ itemState }: MajorItemCellProps) => {
	const [mouseOver, setMouseOver] = useState(false);
	const hotkeysDisabled = itemState.startingLocation === locations.Starting;

	useLocationHotkeys(mouseOver, itemState, hotkeysDisabled);

	const toggleCollected = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget !== e.target) {
			return;
		}

		itemState.toggleCollected();
	}, [itemState]);

	const incrementLocationState = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		itemState.incrementLocation();
	}, [itemState]);

	const decrementLocationState = useCallback((e: React.MouseEvent) => {
		e.preventDefault();

		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		itemState.decrementLocation();
	}, [itemState]);

	const incrementUpgradeCounter = useCallback((e: React.MouseEvent) => {
		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		itemState.incrementUpgradeCount();
	}, [itemState]);

	const decrementUpgradeCounter = useCallback((e: React.MouseEvent) => {
		e.preventDefault();

		if (e.currentTarget === e.target) {
			e.stopPropagation();
		}

		itemState.decrementUpgradeCount();
	}, [itemState]);

	let backgroundAlpha = 0.75;

	if (mouseOver && itemState.collected) {
		backgroundAlpha = 0.15;
	} else if (mouseOver) {
		backgroundAlpha = 0.65;
	} else if (itemState.collected) {
		backgroundAlpha = 0;
	}

	return (
		<div
			data-tooltip-id={itemState.item.id}
			data-tooltip-content={itemState.item.name}
			className="w-[64px] h-[64px] flex justify-between"
			style={{
				backgroundImage: `url(${itemState.item.icon})`,
				backgroundSize: "contain",
				backgroundColor: `rgb(30,41,59,${backgroundAlpha})`,
				backgroundBlendMode: "darken",
			}}
			onClick={toggleCollected}
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
			{itemState.item.maxUpgrades > 0 && (
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
					<div className="text-sm">{itemState.upgradeCount}</div>
				</button>
			)}
		</div>
	);
});

export default MajorItemCell;
