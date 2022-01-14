import { AlignmentRule } from "./"

export interface ReplacementRule {
	test: RegExp,
	replace: string | ((...args: string[]) => string),
	description?: string
}

const replacementRules: ReplacementRule[] = [
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


// Georgia example
const alignRules: AlignmentRule[] = [
	{
		id: "quotes",
		test: /^([«])/,
		offset: -1
	},
	{
		id: "Ww",
		test: /^[Ww]/,
		offset: -0.15
	},
	{
		id: "j",
		test: /^j/,
		offset: 0.15
	},
	{
		id: "Vv",
		test: /^[Vv]/,
		offset: 0.06
	},
	{
		id: "O",
		test: /^O/,
		offset: -0.05
	},
	{
		id: "o",
		test: /^o/,
		offset: 0.05
	},
	{
		id: "T",
		test: /^T/,
		offset: -0.1
	},
	{
		id: "Yy",
		test: /^[Yy]/,
		offset: -0.1
	}
]

export {
	alignRules,
	replacementRules
}