import React, {
	Component,
	CSSProperties,
	ReactNode,
	RefObject
} from "react"

import {
	ReplacementRule,
	replacementRules,
	alignRules,
} from "./default-rules"


export interface DebugOptions {
	idleBgColor: string
	activeBgColor: string
}


export interface AlignmentRule {
	id: string,
	test: RegExp,
	className?: string,
	offset?: number
}


export interface IOpticalAlignmentProps {
	debug?: boolean
	children: any,
	mainDelimiter: string,
	fixWidows: boolean,
	breakInnerWordRegex: RegExp,
	alignmentRules: AlignmentRule[]
	replacementRules: ReplacementRule[]
	debugOptions?: DebugOptions
}


export default class OpticalAlignment extends Component<IOpticalAlignmentProps> {
	static DEFAULT_ALIGN_RULES: AlignmentRule[] = [ ...alignRules ]
	static DEFAULT_REPLACE_RULES: ReplacementRule[] = [ ...replacementRules ]

	static defaultProps: IOpticalAlignmentProps = {
		children: "",
		debug: false,
		mainDelimiter: " ",
		fixWidows: true,
		breakInnerWordRegex: /(&[^;]+;|\u00AD)/g,
		alignmentRules: OpticalAlignment.DEFAULT_ALIGN_RULES,
		replacementRules: OpticalAlignment.DEFAULT_REPLACE_RULES,
		debugOptions: {
			idleBgColor: "rgba(0,200,255,0.14)",
			activeBgColor: "rgba(255,99,43,0.2)",
		},
	}

	private wordRefs: any[] = []

	constructor (props: IOpticalAlignmentProps) {
		super(props)

		this.handleResize = this.handleResize.bind(this)
	}

	componentDidUpdate (
		prevProps: Readonly<IOpticalAlignmentProps>,
		prevState: Readonly<{}>,
		snapshot?: any,
	) {
		this.applyLayoutEffects()
	}

	componentDidMount () {
		this.applyLayoutEffects()

		// add resize event listener to re-layout words
		window.addEventListener("resize", this.handleResize)
	}

	componentWillUnmount () {
		window.removeEventListener("resize", this.handleResize)
	}

	handleResize () {
		this.applyLayoutEffects()
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
	* Handles / delegtes all layout effects
	* */
	private applyLayoutEffects () {
		this.resetLayoutEffects()
		this.alignWords()
	}

	private resetLayoutEffects () {
		this.wordRefs.forEach(ref => {
			const ruleIndex = Number(ref.getAttribute("data-ri"))
			const ruleIsActive = ref.getAttribute("data-active") === "true"

			this.resetWordStyling(ref, ruleIndex)
		})
	}

	/*
	* check if a word can be optical aligned by setting negative
	* margins to words on parent’s x position
	* */
	private alignWords () {
		if (!this.wordRefs.length) {
			return
		}

		for (const ref of this.wordRefs) {
			let parent = ref?.parentNode
			let parentRect

			if (ref === null) {
				continue
			} else if (!parent) {
				console.log("Parent isn’t defined")
				continue
			}

			if (parent) {
				parentRect = ref.parentNode.getBoundingClientRect()
			}

			const ruleIndex = Number.parseInt(ref.getAttribute("data-ri"))
			const rect = ref.getBoundingClientRect()

			if (parentRect.x === rect.x) {
				// if word is on left side of the parent’s box
				// apply style by rule’s offset value or className
				if (ruleIndex && !Number.isNaN(ruleIndex) && this.props.alignmentRules[ruleIndex]) {
					const {
						offset,
						className,
					} = this.props.alignmentRules[ruleIndex]

					if (offset) {
						// "ch" means percentage of the width of the "0" character (zero)
						ref.style.marginLeft = `${ offset }ch`
					}

					ref.setAttribute("data-active", "true")

					if (className) {
						ref.classList.add(className)
					}

					// set active color when debug is activated
					if (this.props.debug) {
						ref.style.backgroundColor = this.props.debugOptions?.activeBgColor
					}
				}
			}
		}
	}

	resetWordStyling (element: HTMLElement, ruleIndex: number) {
		const {
			offset,
			className,
		} = this.props.alignmentRules[ruleIndex]

		if (className) {
			element.classList.remove(className)
		}

		if (offset) {
			element.style.marginLeft = ""
		}

		element.setAttribute("data-active", "false")

		if (this.props.debug && this.props.debugOptions) {
			element.style.backgroundColor = this.props.debugOptions.idleBgColor!
		} else {
			element.style.backgroundColor = ""
		}
	}

	/*
	* Adds a new string to the render queue or concatenates the new string
	* to the last element in queue
	* */
	private static pushOrAddToWordQueue (queue: (string | JSX.Element)[], word: string | JSX.Element) {
		const lastElem = queue[queue.length - 1]

		if (
			typeof lastElem === "string" &&
			typeof word === "string"
		) {
			queue[queue.length - 1] += word
		} else {
			queue.push(word)
		}
	}

	private fixMisspellings (text: string): string {
		// replace misspellings by given rules in first place
		let fixedMisspellings = text

		// checks
		for (let i = 0; i < this.props.replacementRules.length; i++) {
			const rule = this.props.replacementRules[i]

			const {
				test,
				replace,
			} = rule

			const globalTest = new RegExp(test, "gmu")

			// @ts-ignore
			fixedMisspellings = fixedMisspellings.replaceAll(globalTest, replace)
		}

		return fixedMisspellings
	}

	/*
	* Destructures a string into separate react components
	* */
	destructureStringChild (
		child: string,
		childIndex: number,
	): string | (JSX.Element | string)[] {
		let sanitizedChild = child

		// sanitize child from redundant \n and \t line breaks
		sanitizedChild = sanitizedChild.replaceAll(/[\n\t]/gm, "")

		// replace misspellings by given rules in first place
		sanitizedChild = this.fixMisspellings(sanitizedChild)

		// split child (string) into single words, splitted by the prop’s `mainDelimiter`
		const splitExpression = new RegExp(this.props.mainDelimiter, "g")
		const wordList = sanitizedChild.split(splitExpression)

		if (!wordList) {
			return child
		}

		const renderQueue: (string | JSX.Element)[] = []
		const { breakInnerWordRegex } = this.props

		// default styles (debug):
		const style = this.props.debug ? {
			backgroundColor: this.props.debugOptions?.idleBgColor,
		} : undefined

		wordList.forEach((word, index) => {
			const isLastWord = index === wordList.length - 1
			const isSecondLastWord = index === wordList.length - 2

			let subWords: string[] = [ word ]
			let joinString = this.props.mainDelimiter

			// split the word, when it contains html encoded chars like &shy;
			// and check substrings also for rules to apply
			if (breakInnerWordRegex.test(word)) {
				// resets join-string to concatenate sub words back to one word
				joinString = ""

				subWords = word.split(breakInnerWordRegex)
			}

			// saves if at least one rule was found;
			// when not, the current word will just been added
			// as a normal string without any modifications
			let foundAtLeastOneRule = false

			// check rules for each sub word
			subWords.forEach((subWord, index_) => {
				for (let i = 0; i < this.props.alignmentRules.length; i++) {
					const {
						id,
						test,
					} = this.props.alignmentRules[i]

					const ruleExp = new RegExp(test, "m")

					if (ruleExp.test(subWord)) {
						// yep, found one:
						foundAtLeastOneRule = true

						OpticalAlignment.pushOrAddToWordQueue(renderQueue,
							this.renderSpan({
								key: `${ childIndex }_${ index }-${ id }-${ index_ }`,
								ruleIndex: i,
								shouldSaveRef: true,
								word: subWord,
								style,
							}),
						)

						if (!isLastWord) {
							OpticalAlignment.pushOrAddToWordQueue(renderQueue, joinString)
						}

						break
					}
				}

				// when no rule was found for the word, do:
				if (!foundAtLeastOneRule) {
					// when a word contains special symbols like "&shy;" soft breaks
					if (breakInnerWordRegex.test(subWord)) {
						OpticalAlignment.pushOrAddToWordQueue(renderQueue,
							this.renderSpan({
								key: `encoded-${ childIndex }_${ index }-${ index_ }`,
								word: subWord,
							}),
						)
					} else {
						OpticalAlignment.pushOrAddToWordQueue(renderQueue, subWord)
					}
				}

			})

			// https://www.fonts.com/content/learning/fontology/level-2/text-typography/rags-widows-orphans
			// if current word is the second last word
			// use the non-breaking space to disable single word breaks (widows)
			if (isSecondLastWord) {
				OpticalAlignment.pushOrAddToWordQueue(renderQueue, "\xa0") // … = &nbsp;
			} else if (!isLastWord) {
				// when the current sub word isn’t the last,
				// add the `mainDelimeter` back:
				OpticalAlignment.pushOrAddToWordQueue(renderQueue, this.props.mainDelimiter)
			}
		})

		return renderQueue
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

		// resets references to zero
		this.wordRefs = []

		const elemsToRender: (string | ReactNode)[] = []
		let childIndex = 0

		React.Children.forEach(this.props.children, (child, index) => {

			// Checks for string children to wrap for optiocal aligning
			if (
				typeof child === "string" ||
				typeof child === "number"
			) {
				elemsToRender.push(
					this.destructureStringChild(
						String(child),
						childIndex,
					),
				)
			} else {
				// otherwise just add the child to the render queue:
				elemsToRender.push(child)
			}

			childIndex++
		})

		return elemsToRender
	}
}