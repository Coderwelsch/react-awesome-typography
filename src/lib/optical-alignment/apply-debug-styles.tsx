import { CSSProperties } from "react"
import { DebugNodeState, DebugOptions, DEFAULT_DEBUG_STYLES } from "../../types"


export const applyDebugStyles = (element: HTMLSpanElement, debugOptions: undefined | boolean | DebugOptions, state: DebugNodeState) => {
	let style: CSSProperties
	let _debugOptions: DebugOptions = { ...DEFAULT_DEBUG_STYLES }

	if (typeof debugOptions === "object") {
		_debugOptions = { ...debugOptions }
	}

	switch (state) {
		case DebugNodeState.ACTIVE:
			style = _debugOptions.activeStyle
			break

		case DebugNodeState.IDLE:
			style = _debugOptions.idleStyle
			break
		case DebugNodeState.NONE:
			style = {
				backgroundColor: "",
			}
	}

	Object.entries(style).map(([ key, value ]) => {
		// @ts-ignore
		element.style[key] = value
	})
}