export interface GrammarRule {
	test: RegExp,
	replace: string | ((...args: string[]) => string),
	description?: string
}

export type GrammarRules = GrammarRule[]

export interface AlignmentRule {
	id: string,
	test: RegExp,
	className?: string,
	offset?: number
}

