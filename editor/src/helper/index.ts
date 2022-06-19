export function cn (...classNames: any[]): string {
	return classNames.filter((c) => typeof c === "string").join(" ")
}

export function sanitizeRegExp (regexp: RegExp | string): string {
	return regexp.toString().replaceAll(/(^\/)|(\/[gim]*$)/g, "")
}

export function unselect () {
	if (window.getSelection) {
		if (window.getSelection()?.empty) {  // Chrome
			window.getSelection()?.empty()
		} else if (window.getSelection()?.removeAllRanges) {  // Firefox
			window.getSelection()?.removeAllRanges()
		}
		// @ts-ignore
	} else if (document.selection) {  // IE?
		// @ts-ignore
		document.selection?.empty()
	}
}