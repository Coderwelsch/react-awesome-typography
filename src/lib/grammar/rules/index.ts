import { GrammarRules } from "../../../types"


const rules: GrammarRules = [
	{
		description: "replace wrong quotes with good ol’ french ones",
		test: /(["'`’])((?:[^\n]|(?!\1))+)(\1)/gi,
		replace: "«$2»",
	},
	{
		description: "replace wrong apostrophes with right ones",
		test: /(\w)[']/g,
		replace: "’",
	},
	{
		description: "replace wrong ellipsis",
		test: /( )?(\.{2,})( )?/g,
		replace: "$1…$3",
	},
	{
		description: "adds hairspaces between punctuation characters (?!.)",
		test: /([?!.]+)/g,
		replace: "$1",
	},
]

export default rules