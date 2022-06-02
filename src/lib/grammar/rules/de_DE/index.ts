import { GrammarRules } from "../../../../types"


const rules: GrammarRules = [
	{
		description: "replace wrong quotes with good ol’ french ones",
		test: /(["'])((?:[^\n]|(?!\1))+)(\1)/gi,
		replace: "«$2»",
	},
]

export default rules