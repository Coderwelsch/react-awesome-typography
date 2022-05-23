import React from "react"
import rules from "react-awesome-typography/lib/lib/grammar/rules/GrammarRules"
import alignmentRules from "react-awesome-typography/lib/lib/optical-alignment/rules"
import { AwesomeTypographyProps } from "react-awesome-typography/lib/types"


export interface SettingsContextProps {
	awtProps: AwesomeTypographyProps,
}

export const INITIAL_SETTINGS_CONTEXT: SettingsContextProps = {
	awtProps: {
		enabled: true,
		debug: true,
		enableOpticalAlignment: true,
		opticalAlignmentRules: alignmentRules,
		grammarRules: rules,
	},
}

const SettingsContext = React.createContext<[
	SettingsContextProps,
	(state: SettingsContextProps) => void
]>([
	INITIAL_SETTINGS_CONTEXT,
	() => null,
])

export default SettingsContext