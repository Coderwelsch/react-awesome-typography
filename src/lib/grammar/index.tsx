import { GrammarRules } from "../../types"


export function fixGrammar (text: string, rules: GrammarRules) {
	let _text: string = text

	for (const rule of rules) {
		const {
			test,
			replace,
		} = rule

		const globalTest = new RegExp(test, "gmu")

		// TODO: idk, but typescript won’t allow functions as replace param
		// @ts-ignore
		_text = _text.replaceAll(globalTest, replace)
	}

	return _text
}