import React, { Children, FC, ReactNode } from "react"

import { transformChild } from "./lib"
import Rules from "./lib/grammar/rules"
import { DebugOptions } from "./lib/optical-alignment"
import { GrammarRules } from "./types"


export interface AwesomeTypographyProps {
	enabled?: boolean,
	children?: ReactNode,
	rules?: GrammarRules,
	opticalAlignment?: boolean,
	debug?: boolean | DebugOptions
	className?: string
}

const ReactAwesomeTypography: FC<AwesomeTypographyProps> = ({
	enabled = true,
	children,
	rules = Rules,
	opticalAlignment = true,
	debug,
	...props
}) => {
	const childrenArray = Children.toArray(children)

	const transformedChildren = React.useMemo(() => {
		console.log("RENDER")

		return childrenArray.map((child, index) =>
			transformChild({
				child,
				index,
				grammarRules: rules,
				opticalAlignment,
				debug
			}),
		)
	}, [ children, debug ])

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