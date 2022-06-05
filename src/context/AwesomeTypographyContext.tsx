import React, { createContext } from "react"

import { AwesomeTypographyProps } from "../types"


export interface AwesomeTypographyContextProps extends Omit<AwesomeTypographyProps, "children"> {
}


const AwesomeTypographyContext = createContext<AwesomeTypographyContextProps>({
	enabled: true,
	debug: true,
	enableOpticalAlignment: true,
	opticalAlignmentRules: [],
	grammarRules: [],
})

export default AwesomeTypographyContext