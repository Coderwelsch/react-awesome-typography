import React, { Children, FC } from "react"

import { transformChild } from "./lib"
import gRules from "./lib/grammar/rules"
import alignmentRules from "./lib/optical-alignment/rules"
import { AwesomeTypographyProps } from "./types"


const ReactAwesomeTypography: FC<AwesomeTypographyProps> = ({
	enabled = true,
	children,
	grammarRules = gRules,
	enableOpticalAlignment = true,
	opticalAlignmentRules = alignmentRules,
	debug,
}) => {
	if (!enabled) {
		return (
			<>
				{ children }
			</>
		)
	}

	const childrenArray = Children.toArray(children)

	const transformedChildren = React.useMemo(() => {
		return childrenArray.map((child, index) =>
			transformChild({
				child,
				index,
				grammarRules,
				enableOpticalAlignment,
				opticalAlignmentRules,
				debug
			}),
		)
	}, [ children, debug, opticalAlignmentRules, grammarRules ])

	// const transformedChildren = childrenArray.map((child, index) =>
	// 	transformChild({
	// 		child,
	// 		index,
	// 		grammarRules,
	// 		enableOpticalAlignment,
	// 		opticalAlignmentRules,
	// 		debug,
	// 	}),
	// )

	return (
		<>
			{ transformedChildren }
		</>
	)
}

export default ReactAwesomeTypography