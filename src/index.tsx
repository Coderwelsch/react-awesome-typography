import React, { Children, FC, ReactNode } from "react"

import { transformChild } from "./lib"
import Rules from "./lib/grammar/rules"
import { GrammarRules } from "./types"


export interface AwesomeTypographyProps {
	enabled?: boolean,
	children?: ReactNode,
	rules?: GrammarRules,
	opticalAlignment?: boolean,
	className?: string
}

const ReactAwesomeTypography: FC<AwesomeTypographyProps> = ({
	enabled = true,
	children,
	rules = Rules,
	opticalAlignment = true,
	...props
}) => {
	const childrenArray = Children.toArray(children)

	const transformedChildren = React.useMemo(() => {
		return childrenArray.map((child, index) =>
			transformChild({
				child,
				index,
				grammarRules: rules,
				opticalAlignment,
			}),
		)
	}, [ children ])

	if (!opticalAlignment) {
		return (
			<>{ transformedChildren }</>
		)
	}

	return (
		<div
			{ ...props }
		>
			{ transformedChildren }
		</div>
	)
}

export default ReactAwesomeTypography