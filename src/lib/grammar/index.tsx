import { GrammarRules } from "../../types"


export function fixGrammar (text: string, rules: GrammarRules) {
	let _text: string = text

	if (!_text) {
		return _text
	}

	for (const rule of rules) {
		const {
			test,
			replace,
		} = rule

		try {
			// TODO: improve performance? Do we need the regex flags?
			const globalTest = new RegExp(test, "gmu")

			// TODO: idk, but typescript won’t allow functions as replace param
			// @ts-ignore
			const newText = _text.replaceAll(globalTest, replace)

			if (newText) {
				_text = newText
			} else {
				console.error("Something went wrong!", newText, _text)
			}
		} catch (e) {
			console.error(`Couldn’t parse regular expression «${ test }»`, e)
		}
	}

	return _text
}