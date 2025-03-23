import { useState, useEffect } from "react";

import { getImagesToPreload } from "../utilities/loadTrackerData";
import { TrackerStore } from "../store/TrackerStore";
import MajorItems from "./MajorItems";
import MajorBosses from "./MajorBosses";

export interface TrackerProps {
	store: TrackerStore;
}

export default function Tracker({ store }: TrackerProps) {
	const [imagesLoaded, setImagesLoaded] = useState(false);

	useEffect(() => {
		const loadImage = (imageUrl: string): Promise<string> => {
			return new Promise((resolve, reject) => {
				const imageToLoad = new Image();
				imageToLoad.onload = () => resolve(imageUrl);
				imageToLoad.onerror = (err) => reject(err);
				imageToLoad.src = imageUrl;
			});
		};

		const items = store.items.map(i => i.item);
		const bosses = store.bosses.map(b => b.boss);
		const allImages = getImagesToPreload(items, bosses);

		Promise.allSettled(allImages.map((imageUrl) => loadImage(imageUrl)))
			.then(() => setImagesLoaded(true))
			.catch((err) => console.log("Failed to load images", err));
	}, [store]);

	return (
		<div className="container w-[420px] max-w-[420px]">
			{imagesLoaded ? (
				<>
					<MajorItems items={store.items} />
					<MajorBosses bosses={store.bosses} />
				</>
			) : (
				<div className="flex v-screen items-center justify-center p-8">
					<span className="text-white">Loading...</span>
				</div>
			)}
		</div>
	);
}
