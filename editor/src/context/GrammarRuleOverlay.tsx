import React from "react"


export interface GrammarRulesOverlayContextProps {
	opened: boolean,
	text?: null | string
}


export const INITIAL_SETTINGS_CONTEXT: GrammarRulesOverlayContextProps = {
	opened: false,
	text: null,
}

console.log("INITIAL_SETTINGS_CONTEXT", "GrammarRules", INITIAL_SETTINGS_CONTEXT)

const GrammarRulesOverlayContext = React.createContext<[
	GrammarRulesOverlayContextProps,
	(state: GrammarRulesOverlayContextProps) => void
]>([
	INITIAL_SETTINGS_CONTEXT,
	() => null,
])

export default GrammarRulesOverlayContext