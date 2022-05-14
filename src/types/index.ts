export interface GrammarRule {
	test: RegExp,
	replace: string | ((...args: string[]) => string),
	description?: string
}

export type GrammarRules = GrammarRule[]