import "@testing-library/jest-dom"
import { cleanup, render } from "@testing-library/react"
import React from "react"

import RAT from "../../index"


afterEach(() => {
	cleanup()
})

describe("Optical Alignment", () => {
	it("wraps matching substrings into spans", function () {
		const { container } = render(
			<RAT enableOrphanPrevention={ false }>
				Why are you ............ mad?
			</RAT>,
		)

		expect(container.innerHTML).toBe("<br style=\"display: none;\"><span style=\"display: inline-block; margin-left: -0.15ch;\">Why </span> are<br style=\"display: none;\"> <span style=\"display: inline-block; margin-left: -0.1ch;\">you </span>… mad?")
	})
})