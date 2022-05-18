import React, { CSSProperties, Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { AlignmentRule } from "../../types"

import alignmentRules from "./rules"


export interface DebugOptions {
	idleStyle: CSSProperties;
	activeStyle: CSSProperties;
}

export interface OpticalAlignmentNodesProps {
	fixedText: string,
}

export interface NodeProps {
	text: string,
	rule: AlignmentRule,
	debug?: boolean | DebugOptions
	isLastWord: boolean
}

export const NodeMemoized = React.memo(Node, (prev, next) => {
	return (prev.text === next.text)
})

export enum DebugNodeState {
	IDLE = "idle",
	ACTIVE = "active",
}

const DEFAULT_DEBUG_STYLES: DebugOptions = {
	activeStyle: {
		backgroundColor: `rgba(255, 100, 100, 0.2)`
	},
	idleStyle: {
		backgroundColor: `rgba(100, 100, 255, 0.2)`
	}
}

export const applyDebugStyles = (element: HTMLSpanElement, debugOptions: true | DebugOptions, state: DebugNodeState) => {
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
	}

	console.log(element, state, style)

	Object.entries(style).map(([key, value]) => {
		// @ts-ignore
		element.style[key] = value
	})
}

export function Node ({
	text,
	rule,
	debug,
	isLastWord
}: NodeProps) {
	const spanRef = useRef<HTMLSpanElement>(null)
	const [containerSize, setContainerSize] = useState(0)

	const handleResize = () => {
		if (spanRef.current?.parentNode) {
			const parent = spanRef.current.parentNode as HTMLElement
			setContainerSize(parent.getBoundingClientRect().width)
		}
	}

	useLayoutEffect(() => {
		if (spanRef.current?.parentNode) {
			const parent = spanRef.current.parentNode as HTMLElement

			const parentRect = parent.getBoundingClientRect()
			const spanRect = spanRef.current.getBoundingClientRect()

			if (spanRect.left <= parentRect.left) {
				if (rule.offset !== undefined) {
					spanRef.current.style.marginLeft = `${ rule.offset }ch`
				} else if (rule.className === "string") {
					spanRef.current.classList.add(rule.className)
				}

				if (debug) {
					applyDebugStyles(spanRef.current, debug, DebugNodeState.ACTIVE)
				}
			} else {
				if (debug) {
					applyDebugStyles(spanRef.current, debug, DebugNodeState.IDLE)
				}
			}
		}
	}, [containerSize])

	useEffect(() => {
		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<Fragment>
			<span ref={ spanRef }>
				{ text }
			</span>

			{ !isLastWord ? " " : null }
		</Fragment>
	)
}

export function OpticalAlignmentNodes ({ fixedText }: OpticalAlignmentNodesProps) : JSX.Element {
	const split: string[] = fixedText.split(" ")
	const transformed = split.map((part, index) => {
		const isLast = index === split.length - 1

		for (let ruleIndex = 0; ruleIndex < alignmentRules.length; ruleIndex++){
			const rule = alignmentRules[ruleIndex]
			const { test, id } = rule

			// break on first occurence to preserve
			// overwriting rules
			if (test.test(part)) {
				return (
					<Node
						debug={ true }
						key={ `${ index }-${ part }-${ id }` }
						text={ part }
						isLastWord={ isLast }
						rule={ rule }
					/>
				)
			}
		}

		return part + (!isLast ? " " : "")
	})

	return (
		<>
			{ transformed }
		</>
	)
}