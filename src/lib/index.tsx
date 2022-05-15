import React, { Children, cloneElement, Fragment, ReactElement, ReactNode } from "react"

import { GrammarRules } from "../types"
import { fixGrammar } from "./grammar"
import { generateOpticalAlignmentNodes } from "./optical-alignment"


const hasChildren = (
	element: ReactNode,
): boolean => {
	const type = typeof element

	if (!element) {
		return false
	}

	if (type === "string" || type === "number") {
		return false
	}

	// @ts-ignore
	if (element?.props?.children?.length) {
		return true
	}

	return false
}

export interface TransformChildProps {
	child: React.ReactNode,
	index: number,
	grammarRules: GrammarRules,
	opticalAlignment: boolean
}

export const transformChild = ({
	child,
	index,
	grammarRules,
	opticalAlignment = true
}: TransformChildProps): ReactNode => {
	// filter: undefined, null, 0, empty strings
	if (!child) {
		return child
	}

	if (typeof child === "string") {
		const fixedText = fixGrammar(child, grammarRules)

		if (opticalAlignment) {
			return generateOpticalAlignmentNodes(fixedText)
		}

		return fixedText
	}

	if (hasChildren(child)) {
		const elem = child as ReactElement
		const children = elem?.props?.children

		let modifiedChildren: ReactNode

		if (typeof children === "string") {
			const fixedText: string = fixGrammar(children, grammarRules)

			if (opticalAlignment) {
				modifiedChildren = generateOpticalAlignmentNodes(fixedText)
			} else {
				modifiedChildren = fixedText
			}
		} else if (children?.length) {
			modifiedChildren = Children.toArray(elem.props.children).map((child, index) =>
				transformChild({
					child,
					index,
					grammarRules,
					opticalAlignment
				}),
			)
		}

		return cloneElement(
			elem,
			elem.props,
			modifiedChildren,
		)
	} else {
		// console.log("No children nor content found for", child)
	}

	return child
}