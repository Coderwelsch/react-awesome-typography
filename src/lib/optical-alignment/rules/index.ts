import { AlignmentRule } from "../../../types"

// Georgia example
const alignmentRules: AlignmentRule[] = [
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

export default alignmentRules