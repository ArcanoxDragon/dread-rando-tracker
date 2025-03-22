import { SetStateAction, useEffect, useRef } from "react";
import { BaseItemState } from "../store/BaseItemState";

export type SetLocationState = (state: SetStateAction<number>) => void;

export function useLocationHotkeys(isMouseOver: boolean, itemState: BaseItemState, disabled?: boolean) {
	const mouseOverRef = useRef(false); // expose state through this to avoid constantly attaching/detaching window listener

	useEffect(() => {
		mouseOverRef.current = isMouseOver;
	}, [isMouseOver]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!mouseOverRef.current || disabled) {
				return;
			}

			const newLocationShortcut = getLocationShortcutForKey(e.key);

			if (newLocationShortcut) {
				itemState.setLocationFromShortcut(newLocationShortcut);
			}
		};

		window.addEventListener("keydown", handleKeyDown, { capture: true });

		return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
	}, [disabled, itemState]);
}

function getLocationShortcutForKey(key: string): string | null {
	if (key === "Backspace" || key === "Delete") {
		// Clear location
		return "?";
	} else if (/^[a-hs?]$/i.test(key)) {
		return key.toUpperCase();
	}

	return null;
}