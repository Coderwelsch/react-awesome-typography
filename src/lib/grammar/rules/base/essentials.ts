const essentials = [
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

export default essentials