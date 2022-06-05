import React, { Children, cloneElement, Fragment, ReactElement, ReactNode, useContext } from "react"

import AwesomeTypographyContext from "../context/AwesomeTypographyContext"
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
	return !!element?.props?.children?.length
}

export const TransformChild = ({
	child,
	index,
}: TransformChildProps): ReactElement => {
	const {
		grammarRules = [],
		enableOpticalAlignment,
		opticalAlignmentRules = [],
		debug,
	} = useContext(AwesomeTypographyContext)

	// filter values: undefined, null, 0, empty strings
	if (!child) {
		return (
			<Fragment key={ `unprocessed-${ index }` }>
				{ child }
			</Fragment>
		)
	}

	if (typeof child === "string") {
		const fixedText = fixGrammar(child, grammarRules)

		if (enableOpticalAlignment) {
			return (
				<OpticalAlignmentNodes
					key={ index }
					fixedText={ fixedText }
				/>
			)
		}

		return (
			<Fragment key={ fixedText }>
				{ fixedText }
			</Fragment>
		)
	}

	const elem = child as ReactElement

	if (hasChildren(elem)) {
		const children = elem?.props?.children

		let modifiedChildren: ReactNode

		if (typeof children === "string") {
			const fixedText: string = fixGrammar(children, grammarRules)

			if (enableOpticalAlignment) {
				modifiedChildren = (
					<OpticalAlignmentNodes
						fixedText={ fixedText }
					/>
				)
			} else {
				modifiedChildren = fixedText
			}
		} else if (children?.length) {
			modifiedChildren = Children.toArray(elem.props.children).map((child, index) =>
				<TransformChild
					child={ child }
					key={ `transformed-${ index }` }
					index={ index }
				/>,
			)
		}

		const {
			children: _children,
			...sanitizedProps
		} = elem.props

		return cloneElement(
			elem,
			{
				...sanitizedProps,
				key: index,
			},
			modifiedChildren,
		)
	} else if (
		typeof elem.type === "function" &&
		!(elem.type instanceof OpticalAlignmentNodes)
	) {
		//TODO: fix that @ts-ignore problem
		// @ts-ignore
		const childInstance = elem.type(elem.props)

		return (
			<TransformChild
				child={ childInstance }
				index={ index }
				key={ `untransformed-${ index }` }
			/>
		)
	}

	return elem
}