import React, { Children, cloneElement, ReactElement, ReactNode } from "react"

import { TransformChildProps } from "../types"
import { fixGrammar } from "./grammar"
import { OpticalAlignmentNodes } from "./optical-alignment/nodes"


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
	return !!element?.props?.children?.length;
}

export const transformChild = ({
	child,
	index,
	grammarRules,
	opticalAlignment = true,
	debug,
}: TransformChildProps): ReactNode => {
	// filter: undefined, null, 0, empty strings
	if (!child) {
		return child
	}

	if (typeof child === "string") {
		const fixedText = fixGrammar(child, grammarRules)

		if (opticalAlignment) {
			return (
				<OpticalAlignmentNodes
					key={ index }
					fixedText={ fixedText }
					debug={ debug }
				/>
			)
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
				modifiedChildren = (
					<OpticalAlignmentNodes
						fixedText={ fixedText }
						debug={ debug }
					/>
				)
			} else {
				modifiedChildren = fixedText
			}
		} else if (children?.length) {
			modifiedChildren = Children.toArray(elem.props.children).map((child, index) =>
				transformChild({
					child,
					index,
					grammarRules,
					opticalAlignment,
					debug
				}),
			)
		}

		return cloneElement(
			elem,
			elem.props,
			modifiedChildren,
		)
	}

	return child
}