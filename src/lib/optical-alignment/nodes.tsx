import React, { useContext } from "react"

import AwesomeTypographyContext from "../../context/AwesomeTypographyContext"
import { OpticalAlignmentNodesProps } from "../../types"
import { NON_BREAKING_SPACE } from "../constants"
import { Node } from "./node"


export function OpticalAlignmentNodes ({
	text,
}: OpticalAlignmentNodesProps): JSX.Element {
	const {
		debug,
		opticalAlignmentRules = [],
		enableOrphanPrevention = true,
	} = useContext(AwesomeTypographyContext)

	let shouldSkipLast = false
	const split: string[] = text.split(" ")

	const transformed = split.map((part, index) => {
		const isLast = index === split.length - 1
		const isForelast = index === split.length - 2

		if (isLast && shouldSkipLast) {
			return
		}

		// TODO: move pre/sufix checks to a separate function
		let optimizedPart = part
		let prefix = ""

		let suffix = ""

		if (!isForelast && !isLast) {
			prefix = ""
			suffix = " "
		} else if (isForelast) {
			suffix = enableOrphanPrevention ?
				NON_BREAKING_SPACE :
				" "
		}

		// console.log("Part: '%s', Index: %s / %s", optimizedPart, index, split.length)

		for (let ruleIndex = 0; ruleIndex < opticalAlignmentRules.length; ruleIndex++) {
			const rule = opticalAlignmentRules[ruleIndex]
			const { test, id } = rule

			// will breaks on first found to prevent
			// overwriting rules
			if (test.test(part)) {
				/*
				* =======================================
				* ======= Orphan Prevention Info ========
				* =======================================
				*
				* It isn possible to prevent word breaks
				* for mixed span and text elements, so I had to
				* render the last word within the forelast
				* loop execution.
				*
				* */

				if (enableOrphanPrevention && isForelast) {
					const lastWord = split[split.length - 1]

					suffix = NON_BREAKING_SPACE + lastWord
					shouldSkipLast = true
				}

				return (
					<Node
						key={ `${ index }-${ part }-${ id }` }
						text={ prefix + optimizedPart + suffix }
						rule={ rule }
						appendSpace={ !shouldSkipLast }
						isFirst={ index === 0 }
						isForelast={ isForelast }
						debug={ debug }
					/>
				)
			}
		}

		return (
			prefix + optimizedPart + suffix
		)
	})

	return (
		<>
			{ transformed }
		</>
	)
}