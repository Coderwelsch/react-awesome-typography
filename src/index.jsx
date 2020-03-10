import React, { Component } from "react";
import PropTypes from "prop-types";


export default class OpticalAlignment extends Component {
	static propTypes = {
		children: PropTypes.element.isRequired,
		rules: PropTypes.arrayOf(PropTypes.shape({
			test: PropTypes.instanceOf(RegExp).isRequired,
			styleClass: PropTypes.string,
			offset: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number
			])
		})).isRequired,
		affectedTags: PropTypes.arrayOf(PropTypes.oneOf([
			"h1", "h2", "h3", "h4", "h5", "h6", "p", "em"
		])),

		debug: PropTypes.bool,
		debugAlignedWordBackground: PropTypes.string,
		debugIdleWordBackground: PropTypes.string,
	};
	
	static defaultProps = {
		affectedTags: [ "h1", "h2", "h3", "h4", "h5", "h6", "p", "em" ],
		debugAlignedWordBackground: "#ff9169",
		debugIdleWordBackground: "#d0f4ff",
	};

	static NODE_DATA_ALIGNMENT_RULE_KEY = "data-oa-rule";
	static NODE_CHECK_ALIGNMENT_CLASS = "oa-elem";
	static NODE_BR_CLASS = "oa-break";
	static NODE_LAST_ELEMENT_WIDTH_KEY = "data-oa-width";
	
	static INSTANCES = [];
	
	containerRef = React.createRef();
	nativeElements = null;
	
	componentDidMount () {
		if (this.containerRef.current) {
			OpticalAlignment.INSTANCES.push(this);

			this.nativeElements = this.containerRef.current.querySelectorAll(
				this.props.affectedTags.join(",")
			);

			this.prepareTexts();
			this.checkAlignments();
		}
	}

	shouldComponentUpdate (nextProps, nextState, nextContext) {
		return false;
	}

	componentWillUnmount () {
		const { INSTANCES: i } = OpticalAlignment;
		i.splice(i.indexOf(this), 1);
	}

	handleResize () {
		this.removeHardBreaks();
		this.checkAlignments();
	}

	prepareTexts () {
		for (const elem of this.nativeElements)  {
			elem.innerHTML = elem.innerHTML
				.split(" ")
				.map(word => this.wrapWord(word))
				.join(" ");
		}
	}

	wrapWord (word) {
		const {
			NODE_CHECK_ALIGNMENT_CLASS: CA_CLASS,
			NODE_DATA_ALIGNMENT_RULE_KEY: A_KEY
		} = OpticalAlignment;

		let debugStyles = "";

		if (this.props.debug) {
			debugStyles = `background-color: ${ this.props.debugIdleWordBackground }`;
		}

		const { rules } = this.props;

		for (let i = 0; i < rules.length; i++) {
			const { test: regex } = rules[i];

			if (regex.test(word)) {
				return (`<span class="${ CA_CLASS }" ${ A_KEY }="${ i }" style="${ debugStyles }">${ word }</span>`);
			}
		}

		return word;
	}

	removeHardBreaks () {
		for (const elem of this.nativeElements) {
			const brs = elem.querySelectorAll(`br.${ OpticalAlignment.NODE_BR_CLASS }`);
			brs && brs.forEach(br => br.remove());
		}
	}

	checkAlignments () {
		const { rules } = this.props;

		const {
			NODE_LAST_ELEMENT_WIDTH_KEY,
			NODE_CHECK_ALIGNMENT_CLASS,
			NODE_DATA_ALIGNMENT_RULE_KEY
		} = OpticalAlignment;

		for (const node of this.nativeElements) {
			const { 
				left: startX,
				width
			} = node.getBoundingClientRect();

			// when size hasn’t changed yet, we can break
			// up here for better performance …
			const lastWidth = node.getAttribute(NODE_LAST_ELEMENT_WIDTH_KEY);
			if (lastWidth && Math.round(width) === Number.parseInt(lastWidth)) {
				continue;
			}

			// saves the current node width to the node
			node.setAttribute(NODE_LAST_ELEMENT_WIDTH_KEY, width);

			// find each oa-elem and check it
			node.querySelectorAll(`.${ NODE_CHECK_ALIGNMENT_CLASS }`).forEach(elem => {
				// get the rule index from the elem
				const ruleIndex = Number.parseInt(
					elem.getAttribute(NODE_DATA_ALIGNMENT_RULE_KEY)
				);

				// reset the word styling so we can check
				// if the word position has changed
				this.resetWordStyles(elem, rules[ruleIndex]);

				// checks if the word’s x position is
				// equal to the container’s one
				if (Math.round(elem.getBoundingClientRect().left) <= Math.round(startX)) {
					this.adjustWord(elem, node, startX);
				}
			});
		}
	}

	adjustWord (span, parent, parentLeftPos) {
		const { 
			rules, 
			debug
		} = this.props;

		const i = Number.parseInt(span.getAttribute(OpticalAlignment.NODE_DATA_ALIGNMENT_RULE_KEY));
		const {
			name,
			styleClass,
			offset
		} = rules[i];

		// check if offset or styleClass is defined
		if (offset !== undefined) {
			span.style.marginLeft = `${ offset }ch`;
		} else if (styleClass) {
			span.setAttribute("class", `${ OpticalAlignment.NODE_CHECK_ALIGNMENT_CLASS } ${ styleClass }`);
		} else {
			throw new Error(`No offset or styleClass set for rule[${ i }] (${ name })`);
		}

		if (debug) {
			span.style.backgroundColor = `${ this.props.debugAlignedWordBackground }`;
		}

		if (span.getBoundingClientRect().left > parentLeftPos) {
			const br = document.createElement("br");
			br.classList.add(OpticalAlignment.NODE_BR_CLASS);
			parent.insertBefore(br, span);
		}
	}

	render () {
		return (
			<div ref={ this.containerRef }>
				{ this.props.children }
			</div>
		);
	}

	resetWordStyles (elem, { styleClass }) {
		if (styleClass) {
			elem.classList.remove(styleClass);
		} else {
			elem.style.marginLeft = "";
		}

		if (this.props.debug) {
			elem.style.backgroundColor = this.props.debugIdleWordBackground;
		}
	}
}


let WINDOW_RESIZE_HANDLER;

if (typeof window !== "undefined" && !WINDOW_RESIZE_HANDLER) {
	WINDOW_RESIZE_HANDLER = window.addEventListener("resize", () => {
		for (const instance of OpticalAlignment.INSTANCES) {
			if (instance) {
				instance.handleResize();
			}
		}
	});
}