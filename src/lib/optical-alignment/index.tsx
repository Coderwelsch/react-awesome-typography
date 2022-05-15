import React, { Fragment, ReactNode } from "react"

import alignmentRules from "./rules"


export function generateOpticalAlignmentNodes (fixedText: string) : ReactNode {
	const splitted: string[] = fixedText.split(" ")

	return splitted.map((part, index) => {
		const isLast = index === splitted.length - 1

		for (const { test, className, offset, id } of alignmentRules) {
			// break on first occurence to preserve
			// overwriting rules
			if (test.test(part)) {
				return (
					<Fragment key={ `${ index }-${ part }-${ id }` }>
						<span
							data-oa={ index }
						>
							{ part }
						</span>
						{ !isLast ? " " : null }
					</Fragment>
				)
			}
		}

		return part + (!isLast ? " " : "")
	})
}