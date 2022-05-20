import React, { Fragment, RefObject, useEffect, useLayoutEffect, useRef, useState } from "react"
import { DebugNodeState, NodeProps, OpticalAlignmentNodesProps } from "../../types"
import { applyDebugStyles } from "./apply-debug-styles"
import alignmentRules from "./rules"


export function Node ({
	text,
	rule,
	debug,
	isLastWord,
}: NodeProps) {
	const spanRef = useRef<HTMLSpanElement>(null)
	const [ containerSize, setContainerSize ] = useState(0)

	const handleResize = () => {
		if (spanRef.current?.parentNode) {
			const parent = spanRef.current.parentNode as HTMLElement
			setContainerSize(parent.getBoundingClientRect().width)
		}
	}

	const applyDebug = (spanRef: RefObject<HTMLSpanElement>) => {
		if (!spanRef.current) {
			return
		}

		if (debug) {
			applyDebugStyles(spanRef.current, debug, DebugNodeState.ACTIVE)
		} else {
			applyDebugStyles(spanRef.current, debug, DebugNodeState.NONE)
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
			}

			applyDebug(spanRef)
		}
	}, [ containerSize, text, debug ])

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

export function OpticalAlignmentNodes ({
	fixedText,
	debug,
}: OpticalAlignmentNodesProps): JSX.Element {
	const split: string[] = fixedText.split(" ")
	const transformed = split.map((part, index) => {
		const isLast = index === split.length - 1

		for (let ruleIndex = 0; ruleIndex < alignmentRules.length; ruleIndex++) {
			const rule = alignmentRules[ruleIndex]
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

		return part + (!isLast ? " " : "")
	})

	return (
		<>
			{ transformed }
		</>
	)
}