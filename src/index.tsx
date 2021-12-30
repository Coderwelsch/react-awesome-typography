import React, { Component, CSSProperties, ReactNode, RefObject } from "react"

import {
	ReplacementRule,
	replacementRules,
	alignRules,
} from "./default-rules"


interface DebugOptions {
	idleBgColor: string
	activeBgColor: string
}


export interface AlignmentRule {
	id: string,
	test: RegExp,
	//className?: string,
	offset?: number
}


export interface IOpticalAlignmentProps {
	debug?: boolean
	children: any,
	alignRules: AlignmentRule[]
	replacementRules: ReplacementRule[]
	debugOptions?: DebugOptions
}


export const REGEX_HTML_ENCODED_CHARS: RegExp = /(&[^;]+;)|(\u00AD)/
export const REGEX_SEPARATE_WORD: RegExp = /(&\w+;|\u00AD)|(\p{Letter}+|\p{Mark})/gu

//export const REGEX_FIND_CHARS_TO_BREAK: RegExp = /[^\w&;,.\p{Letter}\p{Mark}]/u
export const REGEX_BREAK_CHARS: RegExp = / /

export default class OpticalAlignment extends Component<IOpticalAlignmentProps> {

	static DEFAULT_ALIGN_RULES: AlignmentRule[] = [ ...alignRules ]
	static DEFAULT_REPLACE_RULES: ReplacementRule[] = [ ...replacementRules ]

	static defaultProps: IOpticalAlignmentProps = {
		children: "",
		debug: false,
		alignRules: OpticalAlignment.DEFAULT_ALIGN_RULES,
		replacementRules: OpticalAlignment.DEFAULT_REPLACE_RULES,
		debugOptions: {
			idleBgColor: "rgba(0,200,255,0.34)",
			activeBgColor: "rgba(255,99,43,0.27)",
		},
	}

	private wordRefs: any = []

	constructor (props: IOpticalAlignmentProps) {
		super(props)

		this.handleResize = this.handleResize.bind(this)
	}

	componentDidUpdate (
		prevProps: Readonly<IOpticalAlignmentProps>,
		prevState: Readonly<{}>,
		snapshot?: any,
	) {
		this.applySideEffects()
	}

	componentDidMount () {
		this.applySideEffects()

		// add resize event listener to re-layout words
		window.addEventListener("resize", this.handleResize)
	}

	componentWillUnmount () {
		window.removeEventListener("resize", this.handleResize)
	}

	handleResize () {
		this.applySideEffects()
	}

	/*
	* Saves word references to internal wordRefs array
	* */
	setRef (reference: RefObject<HTMLSpanElement>) {
		if (
			reference !== null &&
			this.wordRefs.indexOf(reference) < 0
		) {
			this.wordRefs.push(reference)
		}
	}

	/*
	* Handles / compute all layout effects
	* */
	private applySideEffects () {
		this.alignWords()
	}

	/*
	* check if a word can be optical aligned by setting negative
	* margins to words on parent’s x position
	* */
	private alignWords () {
		if (!this.wordRefs.length) {
			return
		}

		let parentRect

		for (const ref of this.wordRefs) {
			if (ref === null) {
				continue
			}

			if (!parentRect && ref?.parentNode) {
				parentRect = ref.parentNode.getBoundingClientRect()
			}

			const rect = ref.getBoundingClientRect()

			// if word is on left side of the parent’s box
			// apply style by rule’s offset value or className
			console.log(ref.innerText, ref, parentRect.x, rect.x)

			if (parentRect.x === rect.x) {
				const ruleIndex = Number.parseInt(ref.getAttribute("data-ri"))

				if (ruleIndex && !Number.isNaN(ruleIndex) && this.props.alignRules[ruleIndex]) {
					const {
						offset,
						// className
					} = this.props.alignRules[ruleIndex]

					if (offset) {
						// "ch" means percentage of the width of the "0" character (zero)
						ref.style.marginLeft = `${ offset }ch`
					}

					// if (className) {
					// 	// "ch" means percentage of the width of the "0" character (zero)
					// 	ref.classList.add(className)
					// }

					// set active color when debug is activated
					if (this.props.debug) {
						ref.style.backgroundColor = this.props.debugOptions?.activeBgColor
					}
				}
			} else if (rect.x > parentRect.x) {
				// reset the style if it’s not at the left side
				this.resetWordStyling(ref)
			}
		}
	}

	resetWordStyling (element: HTMLElement) {
		element.style.marginLeft = ""

		if (this.props.debug && this.props.debugOptions) {
			element.style.backgroundColor = this.props.debugOptions.idleBgColor!
		} else {
			element.style.backgroundColor = ""
		}
	}

	/*
	* Destructures a string into separate react components
	* */
	destructureChildren (
		child: string | number,
		childIndex: number,
	): ReactNode | ReactNode[] {
		// resets references to zero
		this.wordRefs = []

		// split child (string) into single words by splitting " "
		const words = String(child).split(REGEX_BREAK_CHARS)

		console.log("WORDS", encodeURI(words[0]))

		const wordQueue = []

		let wordCount = 0

		for (const word_ of words) {
			let word = word_

			// replace words
			for (let k = 0; k < this.props.replacementRules.length; k++) {
				const rule = this.props.replacementRules[k]

				const {
					test,
					replace,
				} = rule

				if (test.test(word)) {
					word = word.replace(test, replace)
				}
			}

			let foundAtLeastOneRule = false

			// checks for each word every possible value;
			// will breaks at first found rule and bakes it
			// into the span’s data attribute
			for (let i = 0; i < this.props.alignRules.length; i++) {
				const rule = this.props.alignRules[i]

				const {
					id,
					test: regExp,
				} = rule

				if (regExp.test(word)) {
					// yep, found one:
					foundAtLeastOneRule = true

					// set styles according to debug mode options:
					const style = this.props.debug ? {
						backgroundColor: this.props.debugOptions?.idleBgColor,
					} : undefined

					// split the word, when it contains html encoded chars like &shy;
					// if (REGEX_HTML_ENCODED_CHARS.test(word)) {
					// 	let splitted = word.match(REGEX_SEPARATE_WORD)
					//
					// 	console.log("RESULT", splitted);
					//
					// } else {
					// 	console.log("DAMN")
					// }

					wordQueue.push(
						this.renderSpan({
							key: `${ childIndex }_${ wordCount }-${ id } `,
							ruleIndex: i,
							shouldSaveRef: true,
							word,
							style
						})
					)

					wordQueue.push(" ")

					break
				}
			}

			// when no rule was found for the word, do:
			if (!foundAtLeastOneRule) {
				// when a word contains special symbols like "&shy;" soft breaks
				if (REGEX_HTML_ENCODED_CHARS.test(word)) {
					wordQueue.push(
						this.renderSpan({
							key: `encoded-${ childIndex }_${ wordCount }`,
							word,
						}),
					)

					wordQueue.push(" ")
				} else {
					// checks if the last element of the render queue
					// is a string and concatenate the new word to the last element:
					const lastElemId = wordQueue.length - 1

					if (typeof wordQueue[lastElemId] === "string") {
						wordQueue[lastElemId] += word + " "
					} else {
						wordQueue.push(word + " ")
					}
				}
			}

			wordCount++
		}

		return wordQueue
	}

	private renderSpan ({
		key,
		ruleIndex,
		style,
		word,
		shouldSaveRef = false,
	}: {
		key: string,
		word: string,
		ruleIndex?: number,
		style?: CSSProperties,
		shouldSaveRef?: boolean
	}) {
		return (
			<span
				key={ key }
				id={ key }
				data-ri={ ruleIndex }
				// @ts-ignore
				ref={ shouldSaveRef ? this.setRef.bind(this) : undefined }
				style={ style }
				dangerouslySetInnerHTML={ { __html: word } }
			/>
		)
	}

	render () {
		if (!this.props.children) {
			return null
		}

		const elemsToRender: (string | ReactNode)[] = []

		let childIndex = 0

		React.Children.forEach(this.props.children, (child, index) => {
			// Checks for string children to wrap for optiocal aligning
			if (
				typeof child === "string" ||
				typeof child === "number"
			) {
				elemsToRender.push(this.destructureChildren(child, childIndex))
			} else {
				// otherwise just add the child to the render queue:
				elemsToRender.push(child)
			}

			childIndex++
		})

		return elemsToRender
	}
}