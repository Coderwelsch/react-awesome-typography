import React from "react"
import "@testing-library/jest-dom"
import { cleanup, render } from "@testing-library/react"

import RAT from "../../index"


afterEach(() => {
	cleanup()
})

describe("replaces wrong ellipses", () => {
	it("... to …", function () {
		const { container } = render(<RAT>...</RAT>)
		expect(container.innerHTML).toBe("…")
	})
})