import React, {
	Children,
	cloneElement,
	FC,
	Fragment,
	ReactElement,
	ReactNode,
} from "react"

import grammar from "./rules/grammar"
import { GrammarRules } from "./types"


export interface AwesomeTypographyProps {
	enabled?: boolean,
	children?: ReactNode,
	grammarRules?: GrammarRules
}


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

function fixGrammar (text: string, rules: GrammarRules) {
	let _text = text

	for (const rule of rules) {
		const {
			test,
			replace,
		} = rule

		const globalTest = new RegExp(test, "gmu")

		// @ts-ignore
		_text = _text.replaceAll(globalTest, replace)
	}

	return _text
}

function generateNodesFromText (
	text: string,
	key: string | number,
	grammarRules: GrammarRules,
): ReactNode {
	const text_ = fixGrammar(text, grammarRules)

	return (
		<Fragment key={ key }>
			{ text_ }
		</Fragment>
	)
}

const transformChild = (
	child: ReactNode,
	index: number,
	grammarRules: GrammarRules,
): ReactNode => {
	try {
		// @ts-ignore
		console.log("child", child?.props)
	} catch (err) {
		console.log("child", child)
	}

	if (!child) {
		return child
	}

	if (typeof child === "string") {
		return generateNodesFromText(child, index, grammarRules)
	}

	if (hasChildren(child)) {
		const castedElem = child as ReactElement
		const children = castedElem?.props?.children
		let modifiedChildren: ReactNode

		if (typeof children === "string") {
			modifiedChildren = generateNodesFromText(children, index, grammarRules)
		} else if (children?.length) {
			modifiedChildren = Children.toArray(castedElem.props.children).map((child, index) =>
				transformChild(child, index, grammarRules),
			)
		}

		console.log("modified", modifiedChildren)

		// returns new element
		return cloneElement(
			castedElem,
			castedElem.props,
			modifiedChildren,
		)
	} else {
		console.log("No children nor content found for", child)
	}

	return child
}

const ReactAwesomeTypography: FC<AwesomeTypographyProps> = ({
	enabled = true,
	children,
	grammarRules = grammar,
}) => {
	const childrenArray = Children.toArray(children)

	const transformedChildren = childrenArray.map((child, index) =>
		transformChild(child, index, grammarRules),
	)

	return (
		<>
			{ transformedChildren }
		</>
	)
}

export default ReactAwesomeTypography