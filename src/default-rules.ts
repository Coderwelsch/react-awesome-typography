import { AlignmentRule } from "./"

export interface ReplacementRule {
	test: RegExp,
	replace: string | ((...args: string[]) => string),
	description?: string
}

const replacementRules: ReplacementRule[] = [
	{
		test: /(["])([^"]+)(["])/,
		replace: "«$2»",
		description: "replace wrong quotes with french ones"
	},
	{
		test: /[']/,
		replace: "’",
		description: "replace wrong apostrophes with right ones"
	},
	{
		test: /( )?(\.{2,})( )?/,
		replace: function (fullString, startChar, ellipsis, endChar) {
			let replaced = ""

			if (startChar) {
				replaced += "&nbsp;"
			}

			if (ellipsis) {
				replaced += "…"
			}

			if (endChar) {
				replaced += "&nbsp;"
			}

			return replaced
		},
		description: "replace wrong ellipsis",
	}
]


// Georgia example
const alignRules: AlignmentRule[] = [
	{
		id: "quotes-p",
		test: /^([»„“]P)/,
		offset: -0.95
	},
	{
		id: "quotes",
		test: /^([«])/,
		offset: -0.9
	},
	{
		id: "Ww",
		test: /^[Ww]/,
		offset: -0.15,
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