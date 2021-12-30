import { AlignmentRule } from "./"

// Georgia example
const alignRules: AlignmentRule[] = [
	{
		id: "quotes-p",
		test: /^([»„“]P)/,
		offset: -0.95
	},
	{
		id: "quotes",
		test: /^([»„“])/,
		offset: -0.9
	},
	{
		id: "W",
		test: /^W/,
		offset: -0.15,
	},
	{
		id: "w",
		test: /^w/,
		offset: -0.15,
	},
	{
		id: "j",
		test: /^j/,
		offset: 0.15
	},
	{
		id: "Vv",
		test: /^Vv/,
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
	}
]

export interface ReplacementRule {
	test: RegExp,
	replace: string // ((word: string) => string) |
	description?: string
}

const replacementRules: ReplacementRule[] = [
	{
		test: /\.{2,}/,
		replace: "…",
		description: "replace wrong ellipsis",
	}
]

export {
	alignRules,
	replacementRules
}