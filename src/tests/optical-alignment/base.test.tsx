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
			<RAT>
				You are ... beauti...... to meeeee!
			</RAT>
		)

		expect(container.innerHTML).toBe(`<div><span data-oa="0">You</span> are … beauti… to meeeee!</div>`)
	})
})