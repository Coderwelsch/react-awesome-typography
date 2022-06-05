import React, { Children, FC } from "react"

import AwesomeTypographyContext from "./context/AwesomeTypographyContext"
import { TransformChild } from "./lib"
import rules from "./lib/grammar/rules"
import alignmentRules from "./lib/optical-alignment/rules"
import { AwesomeTypographyProps } from "./types"


const ReactAwesomeTypography: FC<AwesomeTypographyProps> = (props) => {
	const {
		enabled = true,
		children,
		grammarRules = rules,
		opticalAlignmentRules = alignmentRules,
		debug,
	} = props

	const {
		children: _children,
		...contextProps
	} = props

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
			<TransformChild
				child={ child }
				index={ index }
				key={ index }
			/>,
		)
	}, [ children, debug, opticalAlignmentRules, grammarRules ])

	return (
		<AwesomeTypographyContext.Provider
			value={ contextProps }
		>
			{ transformedChildren }
		</AwesomeTypographyContext.Provider>
	)
}

export default ReactAwesomeTypography