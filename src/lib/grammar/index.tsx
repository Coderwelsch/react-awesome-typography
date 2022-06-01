import { GrammarRules } from "../../types"


export function fixGrammar (text: string, rules: GrammarRules) {
	let _text: string = text

	for (const rule of rules) {
		const {
			test,
			replace,
		} = rule

		try	{
			const globalTest = new RegExp(test, "gmu")

			// TODO: idk, but typescript won’t allow functions as replace param
			// @ts-ignore
			_text = _text.replaceAll(globalTest, replace)
		} catch (e) {
			console.error(`Couldn’t parse regular expression «${ test }»`, e)
		}
	}

	return _text
}