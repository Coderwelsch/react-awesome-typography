export function cn (...classNames: any[]): string {
	return classNames.filter((c) => typeof c === "string").join(" ")
}

export function sanitizeRegExp (regexp: RegExp | string): string {
	return regexp.toString().replaceAll(/(^\/)|(\/[gim]*$)/g, "")
}