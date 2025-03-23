import { useEffect, useRef } from "react";

export function useLocationHotkeys(isMouseOver, setLocationState, disabled) {
  const mouseOverRef = useRef(false); // expose state through this to avoid constantly attaching/detaching window listener

  useEffect(() => { mouseOverRef.current = isMouseOver; }, [isMouseOver]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (!mouseOverRef.current || disabled) {
        return;
      }

      const newLocation = getLocationForKey(e.key);

      if (typeof newLocation === "number") {
        setLocationState(newLocation);
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, []);
}

function getLocationForKey(key) {
  if (key === "?" || key === "Backspace" || key === "Delete") {
    // Clear location
    return 0;
  } else if (key.toUpperCase() === "S") {
    // Starting
    return 9;
  } else if (/^[a-h]$/i.test(key)) {
    return 1 + (key.toUpperCase().charCodeAt(0) - "A".charCodeAt(0)); // A = 1, B = 2, etc.
  }

  return null;
}