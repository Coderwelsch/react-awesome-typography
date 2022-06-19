import { CSSProperties } from "react"

import { DebugNodeState, DebugOptions, DEFAULT_DEBUG_STYLES } from "../../types"


export interface ApplyDebugStylesProps {
	element: HTMLSpanElement,
	debugOptions: boolean | DebugOptions | undefined,
	state: DebugNodeState
}


export const applyDebugStyles = ({
	element,
	debugOptions,
	state,
}: ApplyDebugStylesProps) => {
	let style: CSSProperties
	let _debugOptions: DebugOptions = { ...DEFAULT_DEBUG_STYLES }

	if (typeof debugOptions === "object") {
		_debugOptions = { ...debugOptions }
	}

	switch (state) {
		case DebugNodeState.ACTIVE:
			style = _debugOptions.activeStyle
			element.setAttribute("data-oa-rule-active", "true")
			break

		default:
			style = _debugOptions.idleStyle
			break
	}

	Object.entries(style).map(([ key, value ]) => {
		// @ts-ignore
		element.style[key] = value
	})
}