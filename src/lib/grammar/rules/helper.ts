import { GrammarRules } from "../../../types"


export function combineRules (...args: GrammarRules[]): GrammarRules {
	return args.reduce((aggregator, nextRuleSet) => {
		return aggregator.concat(nextRuleSet)
	}, [])
}