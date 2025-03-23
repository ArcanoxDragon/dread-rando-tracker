import MajorItemCell from "./MajorItemCell";
import MajorProgressiveItemCell from "./MajorProgressiveItemCell";
import { BaseItemState } from "../store/BaseItemState";
import { ProgressiveItemState } from "../store/ProgressiveItemState";
import { SingleItemState } from "../store/SingleItemState";

export interface MajorItemsProps {
	items: readonly BaseItemState[];
}

export default function MajorItems({ items }: MajorItemsProps) {
	return (
		<div className="px-3 mb-4">
			<span className="text-white mb-5">Major Items</span>
			<div className="grid grid-cols-6 gap-2">
				{items.map(itemState => {
					if (itemState instanceof ProgressiveItemState) {
						return <MajorProgressiveItemCell key={itemState.item.id} itemState={itemState} />;
					} else if (itemState instanceof SingleItemState) {
						return <MajorItemCell key={itemState.item.id} itemState={itemState} />;
					}
				})}
			</div>
		</div>
	);
}
