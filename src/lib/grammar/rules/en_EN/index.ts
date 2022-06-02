import { GrammarRules } from "../../../../types"


const rules: GrammarRules = [
	{
		description: "replace starting quotes",
		// test: /(["'])((?:[^\n]|(?!\1))+)(\1)/gi,
		test: /"(\w)/,
		replace: "«$1",
	},
	{
		description: "replace ending quotes",
		test: /"$/,
		replace: "»",
	},
]

export default rules