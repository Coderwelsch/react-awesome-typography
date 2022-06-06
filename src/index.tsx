import React, { Children, FC } from "react"

import AwesomeTypographyContext from "./context/AwesomeTypographyContext"
import { TransformChild } from "./lib"
import BaseRuleSet from "./lib/grammar/rules"
import AlignmentRules from "./lib/optical-alignment/rules"
import { AwesomeTypographyProps } from "./types"


const ReactAwesomeTypography: FC<AwesomeTypographyProps> = (props) => {
	const {
		children,
		enabled = true,
		debug = false,

		// rules
		grammarRules = BaseRuleSet,
		opticalAlignmentRules = AlignmentRules,
		kerningRules = [],

		// features
		enableOpticalAlignment = true,
		enableKerning = true,
		enableOrphanPrevention = true,
	} = props

	const contextProps = {
		enabled,
		debug,

		opticalAlignmentRules,
		grammarRules,
		kerningRules,

		enableOrphanPrevention,
		enableOpticalAlignment,
		enableKerning,
	}

	if (!enabled) {
		return (
			<>{ children }</>
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
			value={ {
				...contextProps,
			} }
		>
			{ transformedChildren }
		</AwesomeTypographyContext.Provider>
	)
}

export default ReactAwesomeTypography