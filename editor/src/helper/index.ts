export function cn (...classNames: any[]): string {
	return classNames.filter((c) => typeof c === "string").join(" ")
}