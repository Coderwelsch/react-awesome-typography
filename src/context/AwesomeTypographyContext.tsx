import React, { createContext } from "react"
import BaseRuleSet from "../lib/grammar/rules"
import AlignmentRules from "../lib/optical-alignment/rules"

import { AwesomeTypographyProps } from "../types"


export interface AwesomeTypographyContextProps extends Omit<AwesomeTypographyProps, "children"> {
}


const AwesomeTypographyContext = createContext<AwesomeTypographyContextProps>({
	enabled: true,
	debug: true,
	enableOpticalAlignment: true,
	opticalAlignmentRules: AlignmentRules,
	grammarRules: BaseRuleSet,
})

export default AwesomeTypographyContext