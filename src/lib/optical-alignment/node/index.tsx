import React, { Fragment, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"

import { AlignmentRule, DebugNodeState, DebugOptions, NodeProps } from "../../../types"
import { applyDebugStyles } from "../apply-debug-styles"


function useOALayoutEffect (
	spanRef: React.RefObject<HTMLSpanElement>,
	rule: AlignmentRule,
	applyDebug: (
		spanRef: React.RefObject<HTMLSpanElement>,
		state: DebugNodeState,
	) => void,
	brRef: React.RefObject<HTMLBRElement>,
	containerSize: number,
	text: string,
	debug?: boolean | DebugOptions,
) {
	useLayoutEffect(() => {
		if (spanRef.current?.parentNode) {
			const parent = spanRef.current.parentNode as HTMLElement

			// reset styles
			if (rule.offset !== undefined) {
				spanRef.current.style.marginLeft = ""
			} else if (rule.className === "string") {
				spanRef.current.classList.remove(rule.className)
			}

			applyDebug(spanRef, DebugNodeState.NONE)

			const parentRect = parent.getBoundingClientRect()
			const spanRect = spanRef.current.getBoundingClientRect()
			const isOnLeftTextSide = spanRect.left <= parentRect.left

			if (isOnLeftTextSide) {
				const marginTop = Number.parseFloat(window.getComputedStyle(parent).marginTop)
				let isOnTop = spanRect.top <= parentRect.top

				// TODO: optimize nested ifs
				if (brRef.current) {
					console.log("Text: %s, span top: %s, marginTop: %s, parentRect top: %s", text, spanRect.top, marginTop, parentRect.top, parent, spanRef.current)

					if (isOnTop) {
						// hide
						brRef.current.style.display = "none"
					} else {
						// show
						brRef.current.style.display = ""
					}
				}

				if (rule.offset !== undefined) {
					spanRef.current.style.marginLeft = `${ rule.offset }ch`
				} else if (rule.className === "string") {
					spanRef.current.classList.add(rule.className)
				}

				applyDebug(spanRef, DebugNodeState.ACTIVE)
			} else {
				applyDebug(spanRef, DebugNodeState.IDLE)
			}
		}
	}, [ containerSize, text, debug, ...Object.values(rule) ])
}

export function Node ({
	text,
	rule,
	debug,
	isLastWord,
}: NodeProps) {
	const spanRef = useRef<HTMLSpanElement>(null)
	const brRef = useRef<HTMLBRElement>(null)
	const [ containerSize, setContainerSize ] = useState(0)

	function resetBrStyles () {
		if (spanRef.current?.parentNode) {
			const parent = spanRef.current.parentNode as HTMLElement
			const newWidth = parent.getBoundingClientRect().width

			if (containerSize !== newWidth) {
				if (brRef.current) {
					brRef.current.style.display = "none"
				}
			}

			setContainerSize(newWidth)
		}
	}

	const handleResize = () => {
		resetBrStyles()
	}

	const applyDebug = (spanRef: RefObject<HTMLSpanElement>, state: DebugNodeState) => {
		if (!spanRef.current) {
			return
		}

		if (debug) {
			applyDebugStyles(spanRef.current, debug, state)
		} else {
			applyDebugStyles(spanRef.current, debug, DebugNodeState.NONE)
		}
	}

	useOALayoutEffect(spanRef, rule, applyDebug, brRef, containerSize, text, debug)

	// useEffect(() => {
	// console.log("render word", text)
	// })

	useEffect(() => {
		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [])

	return (
		<Fragment>
			<br
				style={ { display: "none" } }
				ref={ brRef }
			/>

			<span
				ref={ spanRef }
				style={ {
					// necessary for correct height / position calculations
					display: "inline-block",
				} }
			>
				{ text }
			</span>

			{ !isLastWord ? " " : null }
		</Fragment>
	)
}