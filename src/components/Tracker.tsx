import { useState, useEffect } from "react";

import { getImagesToPreload } from "../utilities/loadTrackerData";
import { TrackerSettings } from "../utilities/settings";
import MajorItems from "./MajorItems";
import MajorBosses from "./MajorBosses";

export interface TrackerProps {
	settings: TrackerSettings;
}

export default function Tracker({ settings }: TrackerProps) {
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

		const allImages = getImagesToPreload(settings);

		Promise.allSettled(allImages.map((imageUrl) => loadImage(imageUrl)))
			.then(() => setImagesLoaded(true))
			.catch((err) => console.log("Failed to load images", err));
	}, [settings]);

	return (
		<div className="container w-[420px] max-w-[420px]">
			{imagesLoaded ? (
				<>
					<MajorItems settings={settings} />
					<MajorBosses settings={settings} />
				</>
			) : (
				<div className="flex v-screen items-center justify-center p-8">
					<span className="text-white">Loading...</span>
				</div>
			)}
		</div>
	);
}
