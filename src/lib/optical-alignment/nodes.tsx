import React from "react"
import { OpticalAlignmentNodesProps } from "../../types"
import { Node } from "./node"


export function OpticalAlignmentNodes ({
	fixedText,
	debug,
	opticalAlignmentRules,
}: OpticalAlignmentNodesProps): JSX.Element {
	const split: string[] = fixedText.split(" ")
	const transformed = split.map((part, index) => {
		const isLast = index === split.length - 1

		for (let ruleIndex = 0; ruleIndex < opticalAlignmentRules.length; ruleIndex++) {
			const rule = opticalAlignmentRules[ruleIndex]
			const { test, id } = rule

			// break on first occurence to preserve
			// overwriting rules
			if (test.test(part)) {
				return (
					<Node
						key={ `${ index }-${ part }-${ id }` }
						text={ part }
						isLastWord={ isLast }
						rule={ rule }
						debug={ debug }
					/>
				)
			}
		}

		const suffix = isLast ? "" : " "

		return (
			part + suffix
		)
	})

	return (
		<>
			{ transformed }
		</>
	)
}