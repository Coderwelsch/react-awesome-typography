import React, { Fragment, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import { DebugNodeState, NodeProps, OpticalAlignmentNodesProps } from "../../types"
import { applyDebugStyles } from "./apply-debug-styles"


export function Node ({
	text,
	rule,
	debug,
	isLastWord,
}: NodeProps) {
	const spanRef = useRef<HTMLSpanElement>(null)
	const brRef = useRef<HTMLBRElement>(null)
	const [ containerSize, setContainerSize ] = useState(0)

	const handleResize = () => {
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
				if (brRef.current) {
					brRef.current.style.display = ""
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

			<span ref={ spanRef }>
				{ text }
			</span>

			{ !isLastWord ? " " : null }
		</Fragment>
	)
}

export function OpticalAlignmentNodes ({
	fixedText,
	debug,
	opticalAlignmentRules,
}: OpticalAlignmentNodesProps): JSX.Element {
	const split: string[] = fixedText.split(" ")
	const transformed = split.map((part, index) => {
		const isLast = index === split.length - 1

		for (let ruleIndex = 0; ruleIndex < opticalAlignmentRules.length; ruleIndex++) {
			const rule = opticalAlignmentRules[ruleIndex]
			const { test, id } = rule

			// break on first occurence to preserve
			// overwriting rules
			if (test.test(part)) {
				return (
					<Node
						key={ `${ index }-${ part }-${ id }` }
						text={ part }
						isLastWord={ isLast }
						rule={ rule }
						debug={ debug }
					/>
				)
			}
		}

		return (
			<span
				key={ `${ index }-${ part }` }
				dangerouslySetInnerHTML={ { __html: part + (!isLast ? " " : "") } }
			/>
		)
	})

	return (
		<>
			{ transformed }
		</>
	)
}