import { useState, useEffect } from "react";

import MajorItems from "./MajorItems";
import MajorBosses from "./MajorBosses";
import { getImagesToPreload } from "../utilities/loadTrackerData";

function Tracker({ settings }) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (imageUrl) => {
      return new Promise((resolve, reject) => {
        const imageToLoad = new Image();
        imageToLoad.src = imageUrl;
        imageToLoad.onload = () => resolve(imageUrl);
        imageToLoad.onerror = (err) => reject(err);
      });
    };

    const allImages = getImagesToPreload();

    Promise.allSettled(allImages.map((imageUrl) => loadImage(imageUrl)))
      .then(() => setImagesLoaded(true))
      .catch((err) => console.log("Failed to load images", err));
  }, []);

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

export default Tracker;
