import React, {
	Component,
	CSSProperties,
	RefObject,
} from "react"

import {
	alignRules,
	ReplacementRule, replacementRules,
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
	enabled: boolean,
	debug?: boolean,
	children: any,
	mainDelimiter: string,
	fixWidows: boolean,
	childTypes: null | string[],
	breakInnerWordRegex: RegExp,
	alignmentRules: AlignmentRule[]
	replacementRules: ReplacementRule[]
	debugOptions?: DebugOptions
}


export default class OpticalAlignment extends Component<IOpticalAlignmentProps> {
	static DEFAULT_ALIGN_RULES: AlignmentRule[] = [ ...alignRules ]
	static DEFAULT_REPLACE_RULES: ReplacementRule[] = [ ...replacementRules ]

	static defaultProps: IOpticalAlignmentProps = {
		enabled: true,
		children: "",
		debug: false,
		mainDelimiter: " ",
		childTypes: null,
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
		if (!this.props.enabled) {
			return
		}

		this.applyLayoutEffects()
	}

	componentDidMount () {
		if (!this.props.enabled) {
			return
		}

		this.applyLayoutEffects()

		// add resize event listener to re-layout words
		// needs extra if for testing / server side
		if (typeof window !== "undefined") {
			window.addEventListener("resize", this.handleResize)
		}
	}

	componentWillUnmount () {
		// needs extra if for testing / server side
		if (typeof window !== "undefined") {
			window.removeEventListener("resize", this.handleResize)
		}
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
			this.resetWordStyling(ref, ruleIndex)
		})
	}

	private static getLeftOffset (element: HTMLElement) : number {
		const offsetX = element.getBoundingClientRect().x
		const styles = window.getComputedStyle(element)

		const paddingLeft = Number.parseInt(styles.paddingLeft)
		const borderLeftWidth = Number.parseInt(styles.borderLeftWidth)

		return offsetX + paddingLeft + borderLeftWidth
	}

	/*
	* check if a word can be optical aligned by setting negative
	* margins to words on parent’s x position
	* */
	private alignWords () {
		if (!this.wordRefs.length) {
			return
		}

		for (const wordRef of this.wordRefs) {
			const parent = wordRef?.parentNode

			if (wordRef === null) {
				continue
			} else if (!parent) {
				console.log("Parent isn’t defined")
				continue
			}

			const ruleIndex = Number.parseInt(wordRef.getAttribute("data-ri"))
			const parentOffset = OpticalAlignment.getLeftOffset(parent)
			const wordX = wordRef.getBoundingClientRect().x

			if (parentOffset === wordX) {
				// if word is on left side of the parent’s box
				// apply style by rule’s offset value or className
				if (!Number.isNaN(ruleIndex) && this.props.alignmentRules[ruleIndex]) {
					const {
						offset,
						className,
					} = this.props.alignmentRules[ruleIndex]

					if (offset) {
						// "ch" means percentage of the width of the "0" character (zero)
						wordRef.style.marginLeft = `${ offset }ch`
					}

					wordRef.setAttribute("data-active", "true")

					if (className) {
						wordRef.classList.add(className)
					}

					// set active color when debug is activated
					if (this.props.debug) {
						wordRef.style.backgroundColor = this.props.debugOptions?.activeBgColor
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
		// sanitize child from redundant \n and \t line breaks
		const sanitizedChild = this.fixMisspellings(
			// replace misspellings by given rules in first place
			child.replaceAll(/[\n]/gm, " "),
		)

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
			let subWords: string[] = [ word ]

			// then a space was set at the start, the word will be empty;
			// to reconstruct the text correctly, a white space should be set back:
			if (index === 0 && word.length === 0) {
				OpticalAlignment.pushOrAddToWordQueue(renderQueue, this.props.mainDelimiter)
			}

			// skip empty words
			if (word.length === 0) {
				return
			}

			const subWordsQueue: string[] = []
			const isLastWord = index === wordList.length - 1
			const isSecondLastWord = index === wordList.length - 2

			// split the word, when it contains html encoded chars like &shy;
			// and check substrings also for rules to apply
			if (breakInnerWordRegex.test(word)) {
				// resets join-string to concatenate sub words back to one word
				subWords = word.split(breakInnerWordRegex).filter(word => word.length)
			}

			// check rules for each sub word
			for (let subWordIndex = 0; subWordIndex < subWords.length; subWordIndex++) {
				let subWord: string | JSX.Element = subWords[subWordIndex]
				let found = false

				for (let ruleIndex = 0; ruleIndex < this.props.alignmentRules.length; ruleIndex++) {
					const {
						id,
						test,
					} = this.props.alignmentRules[ruleIndex]
					const ruleExp = new RegExp(test, "m")

					if (ruleExp.test(subWord)) {
						subWord = this.renderSpan({
							key: `${ childIndex }_${ index }-${ id }-${ subWordIndex }`,
							ruleIndex: ruleIndex,
							shouldSaveRef: true,
							word: subWord,
							style,
						})

						found = true
						break
					}
				}

				OpticalAlignment.pushOrAddToWordQueue(subWordsQueue, subWord)
			}

			if (!isLastWord) {
				OpticalAlignment.pushOrAddToWordQueue(subWordsQueue, this.props.mainDelimiter)
			}

			// add all collected subwords and adds them to the renderQueue
			for (const word of subWordsQueue) {
				OpticalAlignment.pushOrAddToWordQueue(renderQueue, word)
			}
		})

		return renderQueue
	}

	private renderSpan ({
		ruleIndex,
		word,
		shouldSaveRef = false,
		...props
	}: {
		key: string,
		id?: string,
		word: string,
		ruleIndex?: number,
		style?: CSSProperties,
		shouldSaveRef?: boolean
	}): JSX.Element {
		return (
			<span
				data-ri={ ruleIndex }
				// @ts-ignore
				ref={ shouldSaveRef ? this.setRef.bind(this) : undefined }
				dangerouslySetInnerHTML={ { __html: word } }
				{ ...props }
			/>
		)
	}

	recursiveDestructure (children: any[]): any {
		return React.Children.map(children, (child, index) => {
			let childProps: any = {}

			if (child.props) {
				// String has no Prop
				childProps.children = this.recursiveDestructure(child.props.children)
				return React.cloneElement(child, childProps)
			}

			return this.destructureStringChild(child, index)
		})
	}

	render () {
		if (!this.props.enabled) {
			return this.props.children
		}

		if (!this.props.children) {
			return null
		}

		// resets references to zero
		this.wordRefs = []

		return this.recursiveDestructure(this.props.children)
	}
}